import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-elements';
import { lightTheme, darkTheme } from '@themes';
import {
  themeSelector,
  requireLoginSelector,
} from '@contents/Config/redux/selector';
import { INITIAL_STATE, ThemeEnum } from '@contents/Config/redux/constant';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from '@contents/index.navigator';
import NavigationService from '@utils/navigation';
import { resetRequireLogin } from '@contents/Config/redux/slice';
import { logout } from '@contents/Auth/containers/Index/Login/redux/slice';

interface Props {
  theme: any;
  themeRedux: any;
  updateTheme: (theme: any) => any;
  requireLogin: boolean;
  reduxResetRequireLogin: () => any;
  reduxLogout: () => any;
  loginSelector?: any;
}

interface State {
  barStyle?: any;
  isVisibleBackdrop: boolean;
}

class AppNavigator extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { requireLogin, reduxResetRequireLogin } = this.props;
    if (requireLogin !== INITIAL_STATE.requireLogin) reduxResetRequireLogin();
    this.state = {
      isVisibleBackdrop: false,
    };
  }

  toggleModal = () => {
    const { isVisibleBackdrop } = this.state;
    this.setState({
      isVisibleBackdrop: !isVisibleBackdrop,
    });
  };

  render() {
    const { themeRedux, theme, updateTheme } = this.props;
    /**
     * Handle Switch Theme
     */
    if (themeRedux !== theme.key) {
      const newTheme = lightTheme.key === themeRedux ? lightTheme : darkTheme;
      updateTheme(newTheme);
    }
    const barStyle = themeRedux === ThemeEnum.DARK ? 'dark-content' : 'light-content';
    StatusBar.setBarStyle(barStyle, true);

    return (
      <NavigationContainer ref={NavigationService.navigationRef}>
        <RootStack />
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeRedux: themeSelector(state),
  requireLogin: requireLoginSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxResetRequireLogin: () => dispatch(resetRequireLogin()),
  reduxLogout: () => dispatch(logout()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(AppNavigator as any));
