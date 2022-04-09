/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import NavigationService from '@utils/navigation';
import { Color } from '@themes/Theme';
import QuickView from '../../Common/View/QuickView';

class BackIcon extends PureComponent<any> {
  render() {
    return (
      <QuickView
        position="absolute"
        top={18}
        left={0}
        padding={18}
        style={{ zIndex: 1 }}
        onPress={() => NavigationService.goBack()}
        hitSlop={{
          top: 20, left: 20, bottom: 20, right: 20,
        }}
      >
        <Icon
          name="arrowleft"
          type="antdesign"
          color={Color.white}
          size={25}
          onPress={() => NavigationService.goBack()}
        />
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BackIcon);
