# Copyright 2015 gRPC authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""The Python implementation of the gRPC route guide server."""
from cgitb import text
import asyncio
from sqlalchemy import create_engine
import logging
import numpy as np
from sqlalchemy import text
import pandas as pd
import grpc
from content_base import ContentBase
import rs_pb2
import rs_pb2_grpc


class RecommendationServicer(rs_pb2_grpc.RecommendationServicer):
    """Provides methods that implement functionality of route guide server."""
    def __init__(self):
        yhat, users, data = InitDb()
        self.yhat = yhat
        self.users = users
        self.data = data

    def TrackChange(self, request, context):
        print('track change');
        try:
          yhat, users, data = InitDb()
          self.yhat = yhat
          self.users = users
          self.data = data
          return rs_pb2.Check(message='success')
        except:
          return rs_pb2.Check(message='failed')

    def GetItemRecommended(self, request, context):
        indexUserId = self.get_Index_user(request.id)
        itemIdsRated = self.yhat[:, indexUserId]
        output = np.asarray([idx for idx, element in enumerate(itemIdsRated) if (element > 0)])
        print('output 1', output)

        if output.size == 0:
            # Get Most popular
            itemIds = self.GetMostPularItem()
            return rs_pb2.ItemResponse(itemIds=itemIds)
        else:
            # get rated item
            itemIds = self.data[output, 0]
            print('itemIdsRated', itemIdsRated)
            print('output', output)
            #return index of a sorted list
            indexItemSortedIds = sorted(range(len(itemIds)), key=lambda k: itemIds[k], reverse=True)
            print('item sorted', indexItemSortedIds)
            return rs_pb2.ItemResponse(itemIds=self.data[:,0][indexItemSortedIds]) #return sorted List ids of item by uuid

    def GetMostPularItem(self):
        sumArr = np.asarray(list(map((lambda  x: sum(x)), self.yhat)))
        # return index of a sorted list
        indexItemSortedIds = sorted(range(len(sumArr)), key=lambda k : sumArr[k], reverse=True)
        return self.data[:,0][indexItemSortedIds] #return sorted List ids of item by uuid

    def get_Index_user(self, userId):
        ids = np.where(self.users == userId)[0][0]
        return ids
def mapData(item, l_tags):
      i_map = list(map((lambda x:  0 if x['name'] not in item[1] else 1), l_tags))
      i_map.insert(0, item[0])
      return np.asarray(i_map)

def InitDb():
    engine = create_engine("mssql+pyodbc://danh:123456789@itnetwork.viewdns.net:1433/itnetwork?driver=ODBC+Driver+17+for+SQL+Server")
    with engine.connect() as connection:
        result = connection.execute(text("SELECT jobs.id, tags.name  FROM dbo.jobs inner join job_tag on jobs.id = job_tag.jobId inner join tags on tags.id = job_tag.tagId"))
        test = [{column: value for column, value in rowproxy.items()} for rowproxy in result] #Return List of Dict
        res = {}
        for item in test:
          res.setdefault(item['id'], []).append(item['name'])
    with engine.connect() as connection:
      tag = connection.execute(text("SELECT id, name from tags"));
      l_tag = [{column: value for column, value in rowproxy.items()} for rowproxy in tag]
      data = list(res.items())
      a = np.asarray(list(map((lambda x: mapData(x, l_tag)), data)))
      numberOfItem = len(l_tag)
      X_train_counts = a[:, -(numberOfItem - 1):]

    with engine.connect() as connection:
      users = connection.execute(text("SELECT Id from users"))
      users = pd.DataFrame(users)

    # tfidf
    tfidf = ContentBase.getTfidf(X_train_counts)
    rate_train = getUserRatingMatrix(engine)

    d = tfidf.shape[1]  # data dimension
    n_users = users.shape[0]
    W = np.zeros((d, n_users))
    b = np.zeros((1, n_users))
    W, b = ContentBase.GetRidgeRegression(self=ContentBase, n_users=np.asarray(users), rate_train=rate_train,
                                          tfidf=tfidf, W=W, b=b, index_arr=a[:, 0])
    Yhat = tfidf.dot(W) + b
    return Yhat, users, a
def getUserRatingMatrix(engine):
    with engine.connect() as connection:
        result = connection.execute(text("select userId, jobId, rating from [dbo].[user_rating]"))
        test = [{column: value for column, value in rowproxy.items()} for rowproxy in result]
        df = pd.DataFrame(test)
        return df.values

async def serve() -> None:
  server = grpc.aio.server()
  rs_pb2_grpc.add_RecommendationServicer_to_server(
    RecommendationServicer(), server)
  server.add_insecure_port('[::]:50051')
  await server.start()
  await server.wait_for_termination()


if __name__ == '__main__':
  logging.basicConfig(level=logging.INFO)
  asyncio.get_event_loop().run_until_complete(serve())
