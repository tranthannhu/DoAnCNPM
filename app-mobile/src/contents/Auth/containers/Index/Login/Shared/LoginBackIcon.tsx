import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import { Icon } from 'react-native-elements';
import NavigationService from '@utils/navigation';
import { QuickView } from '@components';
import { Color } from '@themes/Theme';

interface LoginBackIconProps {
  color?: string;
  zIndex?: number;
  requireLogin?: boolean;
}
class LoginBackIcon extends PureComponent<LoginBackIconProps> {
  static defaultProps = {
    color: Color.white,
  };

  render() {
    const { requireLogin, color, zIndex } = this.props;
    if (!requireLogin) {
      return (
        <Icon
          style={{ zIndex }}
          name="arrowleft"
          type="antdesign"
          color={color}
          size={30}
          onPress={() => NavigationService.goBack()}
          containerStyle={{ position: 'absolute', top: 50, left: 20 }}
        />
      );
    }
    return <QuickView />;
  }
}

const mapStateToProps = (state: any) => ({
  requireLogin: requireLoginSelector(state),
});

export default connect(mapStateToProps, null)(LoginBackIcon);
