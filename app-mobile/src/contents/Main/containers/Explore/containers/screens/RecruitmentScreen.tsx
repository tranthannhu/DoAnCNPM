import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container, FlatList, QuickView, Text,
} from '@components';
import { get } from '@utils/api';
import { RootState } from '@src/redux/reducers';
import { renderListJob } from '@contents/Main/containers/MyJobs/containers/screens/ViewScreen';
import { Divider } from 'react-native-paper';
import { RefreshControl } from 'react-native';

export default function RecruitmentScreen() {
  const [data, setdata] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const companyId: string = useSelector((state: RootState) => state.jobDetail.data?.user?.id);

  const getData = async () => {
    setRefreshing(true);
    console.log(companyId);
    if (companyId) {
      const response = await get('/jobs', { filter: `user.id||$eq||${companyId}` })
      setdata(response.data);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    getData();
  }, [companyId])

  return (
    <Container>
      <QuickView
        row
        justifyContent="space-between"
        paddingHorizontal={15}
        paddingVertical={10}
      >
        <Text color="#000" fontSize={20} bold>
          Opening Jobs
        </Text>
        <Text color="#000">
          {data.length}
          {' '}
          Jobs
        </Text>
      </QuickView>
      <Divider />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getData}
          />
        }
        data={data}
        renderItem={renderListJob}
      />
    </Container>
  );
}