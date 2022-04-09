import React from "react"
import { Image, View } from "react-native"
import { Colors, IconButton } from "react-native-paper"
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";

interface AvatarProps {
  onChangeImage: (newValue: any) => void;
  initialImage?: string;
};
export default function AvatarContainer(props: AvatarProps) {

  const pickImage = async () => {
    try {
      const uploadFile = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.images
        ],
      });
      const image: any = {
        uri: uploadFile.uri,
        type: uploadFile.type,
        name: uploadFile.name,
      };
      const file = new FormData();
      file.append('file', image);
      const result: any = await axios.post(
        'https://vietdanh.bike/api/v1/apply/upload',
        file,
        {
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        },
      );

      if (result.data.data.url) {
        props.onChangeImage(result.data.data.url)
      }
    } catch (err) {
      console.log('err', err);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  return (
    <View style={{ position: "relative", maxHeight: 200 }}>
      <Image
        style={{ resizeMode: "cover", width: '100%', height: '100%' }}
        source={{ uri: props.initialImage || 'https://www.advancy.com/wp-content/uploads/2017/11/avatar.jpg' }}
      />
      <IconButton onPress={() => pickImage()} style={{ position: "absolute", right: 0, bottom: 0 }} icon='camera-plus' color={Colors.red500} size={30} />
    </View>
  )
}