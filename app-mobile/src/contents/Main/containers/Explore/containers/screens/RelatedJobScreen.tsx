/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, QuickView, Text } from '@components';

class RelatedJobScreen extends PureComponent {
  render() {
    return (
      <Container>
        <QuickView marginTop={20}>
          <Text>Information Screen</Text>
        </QuickView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RelatedJobScreen);
