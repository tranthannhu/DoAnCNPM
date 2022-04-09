import {
  Body, Container, Header, QuickView, Text,
} from '@components';
import NavigationService from '@utils/navigation';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import profileStack from '../../routes';

class SkillScreen extends PureComponent {
  // centerComponent =() => (

  // )
  render() {
    return (
      <Container>
        <Header
          backgroundColor="#1f4780"
          backIcon
          // height={100}
          centerComponent={<Text t="profile:skill" bold color="#fff" />}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        />
        <Body>
          <QuickView flex={1} position="relative">
            <TouchableOpacity
              style={{
                position: 'absolute',
                width: 60,
                height: 60,
                backgroundColor: '#1f4780',
                borderRadius: 999,
                bottom: 20,
                right: 0,
                justifyContent: 'center',
              }}
              onPress={() => {
                NavigationService.navigate(profileStack.DetailSkillScreen);
              }}
            >
              <Icon type="entypo" name="plus" color="#fff" />
            </TouchableOpacity>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SkillScreen as any);
