// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var rs_pb = require('./rs_pb.js');

function serialize_Recommendation_Check(arg) {
  if (!(arg instanceof rs_pb.Check)) {
    throw new Error('Expected argument of type Recommendation.Check');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Recommendation_Check(buffer_arg) {
  return rs_pb.Check.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Recommendation_ItemResponse(arg) {
  if (!(arg instanceof rs_pb.ItemResponse)) {
    throw new Error('Expected argument of type Recommendation.ItemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Recommendation_ItemResponse(buffer_arg) {
  return rs_pb.ItemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Recommendation_UserRequest(arg) {
  if (!(arg instanceof rs_pb.UserRequest)) {
    throw new Error('Expected argument of type Recommendation.UserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Recommendation_UserRequest(buffer_arg) {
  return rs_pb.UserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var RecommendationService = exports.RecommendationService = {
  getItemRecommended: {
    path: '/Recommendation.Recommendation/GetItemRecommended',
    requestStream: false,
    responseStream: false,
    requestType: rs_pb.UserRequest,
    responseType: rs_pb.ItemResponse,
    requestSerialize: serialize_Recommendation_UserRequest,
    requestDeserialize: deserialize_Recommendation_UserRequest,
    responseSerialize: serialize_Recommendation_ItemResponse,
    responseDeserialize: deserialize_Recommendation_ItemResponse,
  },
  trackChange: {
    path: '/Recommendation.Recommendation/TrackChange',
    requestStream: false,
    responseStream: false,
    requestType: rs_pb.Check,
    responseType: rs_pb.Check,
    requestSerialize: serialize_Recommendation_Check,
    requestDeserialize: deserialize_Recommendation_Check,
    responseSerialize: serialize_Recommendation_Check,
    responseDeserialize: deserialize_Recommendation_Check,
  },
};

exports.RecommendationClient = grpc.makeGenericClientConstructor(RecommendationService);
