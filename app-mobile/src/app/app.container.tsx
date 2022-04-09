import React from 'react';
import { ThemeProvider, withTheme } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { compose } from 'recompose';
import { lightTheme, darkTheme } from '@themes/Theme';
import {
  languageSelector,
  themeSelector,
} from '@contents/Config/redux/selector';
import { ThemeEnum } from '@contents/Config/redux/constant';
import { Global } from '@utils/appHelper';
import { applyObjectSelector } from '@utils/selector';
import { loginSelector } from '@contents/Auth/containers/Index/Login/redux/selector';
import { TObjectRedux } from '@utils/redux';
import i18n from '../core/config/i18n';
import AppNavigator from './app.navigator';
import { tokenContext } from '../../hooks/tokenContext';

interface Props {
  language: string;
  t: any;
  colors: any;
  themeRedux: any;
  loginSelectorData: TObjectRedux;
}

interface State {
  isInternetCheck: boolean;
  isConnected: boolean;
}


class AppContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isInternetCheck: false,
      isConnected: true,
    };
    const { loginSelectorData } = this.props;
    Global.token = loginSelectorData.data.get('token');
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      const { isInternetCheck } = this.state;
      const { isConnected } = state;
      if (!isConnected) {
        this.setState({
          isConnected: false,
        });
      }
      if (isInternetCheck && isConnected) {
        this.setState({
          isConnected: true,
          isInternetCheck: false,
        });
      }
    });
  }

  checkInternet = () => {
    this.setState({
      isInternetCheck: true,
    });
  };

  showNotConnectedMessage = () => {
    showMessage({
      message: 'No internet',
      type: 'danger',
      onPress: () => this.checkInternet(),
    });
  };

  render() {
    const { language, themeRedux } = this.props;

    const { isConnected } = this.state;

    /**
     * Change language
     */
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    /**
     * Theme
     */
    const themeColor: any = themeRedux === ThemeEnum.LIGHT ? lightTheme : darkTheme;

    /**
     * Check Internet
     */
    if (!isConnected) this.showNotConnectedMessage();

    return (
      <ThemeProvider theme={themeColor}>
        <tokenContext.Provider value={Global.token}>
          <AppNavigator />
        </tokenContext.Provider>
        <FlashMessage position="top" />
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
  themeRedux: themeSelector(state),
  loginSelectorData: applyObjectSelector(loginSelector, state),
});

export default compose(
  withTheme,
  withTranslation(),
  connect(mapStateToProps, null),
)(AppContainer as any);
