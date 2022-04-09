import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Body, Button, Container, Header, QuickView, Text,
} from '@components';
import DocumentPicker from 'react-native-document-picker';
import { StatusBar, Alert } from 'react-native';
import NavigationService from '@utils/navigation';
import { Picker } from '@react-native-picker/picker';
import { RootState } from '@src/redux/reducers';
import { applyCV, fetchCV, hideError, setpickerValue, uploadCV } from '@src/redux/apply/applySlice';
import { ActivityIndicator, Banner } from 'react-native-paper'
import { fetchJobDetail, fetchJobDetailNoUpdate } from '@src/redux/jobDetail/jobDetailSlice';

export default function ApplyScreen({ route }) {
  const dispatch = useDispatch();
  // const profile = useSelector((state) => parseObjectSelector(applyObjectSelector(profileSelector, state)));
  const pickItem = useSelector((state: RootState) => state.apply.pickItem);
  const error = useSelector((state: RootState) => state.apply.error);
  const pickerValue = useSelector((state: RootState) => state.apply.pickerValue);
  const isLoading = useSelector((state: RootState) => (state.apply.isFetchingCV || state.apply.isUploadingCV || state.apply.isApplyingCV));

  useEffect(() => {
    console.log('goi fetch')
    dispatch(fetchCV())
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor="transparent" />
      <Header
        backIcon
        leftColor="#fff"
        backgroundColor="#5760eb"
        // height={100}
        centerComponent={
          <Text color="#fff" fontSize={20} fontWeight="bold">
            Apply Job
          </Text>
        }
      />
      <ActivityIndicator animating={isLoading} size='large' />
      <Banner
        visible={!!error}
        actions={[
          {
            label: 'Dismiss',
            onPress: () => dispatch(hideError())
          }
        ]}
      >
        {JSON.stringify(error?.message)}
      </Banner>
      <Body backgroundColor="#fff">
        <Text fontSize={18} center marginTop={40} color="#000">
          Following profile will be sent to the recruiter
        </Text>
        <QuickView
          marginTop={40}
          paddingHorizontal={20}
          paddingVertical={30}
          backgroundColor="#fff"
          style={{ flex: 10, borderRadius: 6 }}
        >
          <Text color="#000" bold fontSize={16} marginBottom={10}>
            Attached CV:
          </Text>
          <QuickView style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }} backgroundColor="#f0f2f5" marginBottom={10}>
            <Picker
              style={{
                width: '100%',
                // height: 40,
                color: '#000',
                // fontSize: 14,
                // fontFamily: 'Roboto-Regular',
              }}
              selectedValue={pickerValue}
              onValueChange={(itemValue) => dispatch(setpickerValue(itemValue))}
            >
              {pickItem.map((item: { name: string, id: string }) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />))
              }
            </Picker>
          </QuickView>
        </QuickView>
        <QuickView
          center
          row
          paddingHorizontal={20}
          paddingVertical={30}
          marginTop={20}
          style={{ flex: 5 }}
        >
          <Button
            width={100}
            backgroundColor="#5760eb"
            title="Upload"
            marginBottom={30}
            onPress={async () => {
              try {
                const uploadFile = await DocumentPicker.pickSingle({
                  type: [
                    DocumentPicker.types.pdf,
                    DocumentPicker.types.docx,
                    DocumentPicker.types.doc,
                    DocumentPicker.types.images
                  ],
                });
                const image: any = {
                  uri: uploadFile.uri,
                  type: uploadFile.type,
                  name: uploadFile.name,
                };
                await dispatch(uploadCV(image))
                if (!error) {
                  Alert.alert('Upload successful', 'Your resume is updated');
                }
              } catch (err) {
                // eslint-disable-next-line no-console
                console.log('err', err);
                if (DocumentPicker.isCancel(err)) {
                  // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                  throw err;
                }
              }
            }}
          />
          <Button
            backgroundColor="#5760eb"
            title="Submit"
            marginBottom={30}
            paddingLeft={20}
            width={100}
            onPress={async () => {
              if (pickerValue !== '') {
                await dispatch(applyCV(route.params.jobId));
                if (!!!error) {
                  dispatch(fetchJobDetailNoUpdate(route.params.jobId));
                  NavigationService.goBack();
                  Alert.alert('Sent resume', 'Thank you for submitting your resume');
                }
              } else {
                Alert.alert('No attached CV?', 'Please upload your CV');
              }
            }}
          />
        </QuickView>
      </Body>
    </Container>

  );
}

