import React, { Component } from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 210,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  containerVideo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

interface Props {
  url?: string,
  containerStyleProps?: any,
}
interface State {
  stopVideo: boolean,
}
export class VideoComponent extends Component<Props, State> {
  private player: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      stopVideo: true,
    };
  }

  render() {
    const { url, containerStyleProps } = this.props;
    const containerStyle = StyleSheet.flatten([
      styles.containerVideo,
      containerStyleProps,
    ]);
    const { stopVideo } = this.state;
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => {
          this.setState({
            stopVideo: !stopVideo,
          });
        }}
      >
        <Video
          source={{ uri: 'https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4' || url }}
          ref={(ref: any) => {
            this.player = ref;
          }}
          onEnd={() => {
            this.player.seek(0);
          }}
          paused={stopVideo}
          style={styles.backgroundVideo}
          resizeMode="cover"
          controls
        />
      </TouchableOpacity>
    );
  }
}

export default VideoComponent;
