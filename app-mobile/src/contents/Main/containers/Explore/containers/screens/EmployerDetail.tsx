/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView, Text, Container, Header, Body, ParallaxScrollView, Image,
} from '@components';

class EmployerScreens extends PureComponent {
  render() {
    return (
      <Container>
        <ParallaxScrollView>
          <Body>
            <Image
              source={{
                uri: 'http://picsum.photos/1000/1000',
                cache: 'web',
              }}
              containerStyle={{ marginTop: 20 }}
            />
          </Body>
        </ParallaxScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EmployerScreens as any);
