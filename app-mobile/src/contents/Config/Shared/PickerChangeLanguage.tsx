import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { changeLanguage } from '@contents/Config/redux/slice';
import { languageSelector } from '@contents/Config/redux/selector';
import { compose } from 'recompose';
import { LanguageEnum } from '@contents/Config/redux/constant';
import { withTranslation } from 'react-i18next';
import { enumToArray } from '@utils/functions';
import Picker from '../../../components/Common/Picker';

interface Props{
  language: string;
  t: any;
  handleChangeLanguage: (language: string) => any;
}

interface State{
}

class PickerChangeLanguage extends PureComponent<Props, State> {
  render() {
    const { language, handleChangeLanguage } = this.props;
    return (
      <Picker
        labels={['English', 'Tiếng Việt']}
        values={enumToArray(LanguageEnum)}
        selectedValue={language}
        width={150}
        onValueChange={(itemValue) => handleChangeLanguage(itemValue)}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  handleChangeLanguage: (data: string) => dispatch(changeLanguage(data)),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReduce,
  withTranslation(),
)(PickerChangeLanguage as any);
