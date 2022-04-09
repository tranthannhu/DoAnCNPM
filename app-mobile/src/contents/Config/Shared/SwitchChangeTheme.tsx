import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { switchTheme, changeLanguage } from '@contents/Config/redux/slice';
import { themeSelector } from '@contents/Config/redux/selector';
import { withTheme } from 'react-native-elements';
import { compose } from 'recompose';
import { Switch } from 'react-native';
import { ThemeEnum } from '@contents/Config/redux/constant';

interface Props{
  t: any;
  reduxTheme: any;
  handleSwitchTheme: () => any;
}

interface State{
}

class SwitchChangeTheme extends PureComponent<Props, State> {
  render() {
    const { reduxTheme, handleSwitchTheme } = this.props;
    const isEnabled = reduxTheme === ThemeEnum.DARK;

    return (
      <Switch
        // trackColor={{ false: '#767577', true: '#81b0ff' }}
        // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={handleSwitchTheme}
        value={isEnabled}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
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
)(SwitchChangeTheme as any);
