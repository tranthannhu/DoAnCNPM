import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import { LanguageEnum } from '@contents/Config/redux/constant';
import { connect } from 'react-redux';
import { switchTheme, changeLanguage } from '@contents/Config/redux/slice';
import { languageSelector, themeSelector } from '@contents/Config/redux/selector';
import { Button, withTheme } from 'react-native-elements';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';

interface Props{
  t: any;
  handleSwitchTheme: () => any;
  handleChangeLanguage: (data: string) => any;
}

interface State{
}

class DefaultModal extends PureComponent<Props, State> {
  render() {
    const { t, handleSwitchTheme, handleChangeLanguage } = this.props;
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>  </Text>
        <Text>  </Text>
        <Text> DefaultModal </Text>
        <Text>
          {t ? t('text_signin_mobile') : ''}
        </Text>
        <Button title="Vietnamese" onPress={() => handleChangeLanguage(LanguageEnum.VI)} />
        <View style={{ height: 10 }} />
        <Button title="English" onPress={() => handleChangeLanguage(LanguageEnum.EN)} />
        <View style={{ height: 10 }} />
        <Button title="Change Theme" style={{ marginVertical: 30 }} onPress={() => handleSwitchTheme()} />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
  reduxTheme: themeSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  handleChangeLanguage: (data: string) => dispatch(changeLanguage(data)),
  handleSwitchTheme: () => dispatch(switchTheme()),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withTheme,
  withReduce,
  withTranslation(),
)(DefaultModal as any);
