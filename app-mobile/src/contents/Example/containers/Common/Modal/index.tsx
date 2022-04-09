import React, { Component } from 'react';
import {
  Container, Header, AppModal, Button, Text,
} from '@components';
import { View } from 'react-native';

interface State {
  isVisible: boolean,
  isVisibleBackdrop: boolean,
  isVisibleCustomBack: boolean,
  isVisibleFancy: boolean,
  isVisibleSlide: boolean,
  isVisibleSwipeable: boolean,
  isVisibleDefault: boolean,
}
interface Props {
}

class ModalExample extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isVisible: false,
      isVisibleBackdrop: false,
      isVisibleCustomBack: false,
      isVisibleFancy: false,
      isVisibleSlide: false,
      isVisibleSwipeable: false,
      isVisibleDefault: false,
    };
  }

  toggleModal = () => {
    this.setState({
      isVisible: false,
      isVisibleBackdrop: false,
      isVisibleCustomBack: false,
      isVisibleFancy: false,
      isVisibleSlide: false,
      isVisibleSwipeable: false,
      isVisibleDefault: false,
    });
  };

  render() {
    const {
      isVisible,
      isVisibleBackdrop,
      isVisibleCustomBack,
      isVisibleDefault,
      isVisibleFancy,
      isVisibleSlide,
      isVisibleSwipeable,
    } = this.state;
    return (
      <Container scroll>
        <Header backIcon title="Modal" shadow switchTheme />
        <Button title="bottomhalf" onPress={() => { this.setState({ isVisible: true }); }} />
        <AppModal
          type="bottomhalf"
          isVisibleProps={isVisible}
          title="hello"
          content="hi hi hi"
          onClick={this.toggleModal}
        />
        <Button title="backdrop" onPress={() => { this.setState({ isVisibleBackdrop: true }); }} />
        <AppModal
          type="backdrop"
          isVisibleProps={isVisibleBackdrop}
          title="hello"
          content="hi hi hi"
          onClick={this.toggleModal}
        />
        <Button title="customback" onPress={() => { this.setState({ isVisibleCustomBack: true }); }} />
        <AppModal
          type="customback"
          isVisibleProps={isVisibleCustomBack}
          viewComponent={(
            <View>
              <Text>
                Thông báo
              </Text>
              <Text>Hello</Text>
              <Button
                testID="close-button"
                onPress={this.toggleModal}
                title="Close"
              />
            </View>
        )}
          title="hello"
          content="hi hi hi"
          onClick={this.toggleModal}
        />
        <Button title="fancy" onPress={() => { this.setState({ isVisibleFancy: true }); }} />
        <AppModal
          type="fancy"
          isVisibleProps={isVisibleFancy}
          title="hello"
          content="hi hi hi"
          onClick={this.toggleModal}
        />
        <Button title="slide" onPress={() => { this.setState({ isVisibleSlide: true }); }} />
        <AppModal
          type="slide"
          isVisibleProps={isVisibleSlide}
          title="hello"
          content="hi hi hi"
          onClick={this.toggleModal}
        />
        <Button title="swipeable" onPress={() => { this.setState({ isVisibleSwipeable: true }); }} />
        <AppModal
          type="swipeable"
          isVisibleProps={isVisibleSwipeable}
          title="hello"
          content="hi hi hi"
          onClick={this.toggleModal}
        />
        <Button title="default" onPress={() => { this.setState({ isVisibleDefault: true }); }} />
        <AppModal
          type="default"
          isVisibleProps={isVisibleDefault}
          title="hello"
          content="hi hi hi"
          onClick={this.toggleModal}
        />
      </Container>
    );
  }
}

export default ModalExample;
