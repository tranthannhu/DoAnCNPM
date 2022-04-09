import React, { Component } from 'react';
import { Platform } from 'react-native';
import RNDateTimePicker, { IOSNativeProps, AndroidNativeProps } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { themeSelector, languageSelector } from '@contents/Config/redux/selector';
import { ThemeEnum, LanguageEnum } from '@contents/Config/redux/constant';
import { getThemeByName } from '@utils/appHelper';
import Button, { ButtonProps } from '../Button/DefaultButton';
import QuickView from '../View/QuickView';

type Mode = 'date' | 'time' | 'datetime';
type Display = 'default' | 'spinner';

export interface DateTimePickerProps extends
  Omit<IOSNativeProps, 'mode'|'display'|'onChange'|'value'>,
  Omit<AndroidNativeProps, 'mode'|'display'|'value'>,
  Omit<ButtonProps, 'accessibilityActions'|'accessibilityComponentType'|'accessibilityElementsHidden'|'accessibilityHint'|'accessibilityIgnoresInvertColors'|'accessibilityLabel'|'accessibilityLiveRegion'|'accessibilityRole'|'accessibilityState'|'accessibilityTraits'|'accessibilityValue'|'accessibilityViewIsModal'|'accessible'|'hasTVPreferredFocus'|'hitSlop'|'importantForAccessibility'|'onAccessibilityAction'|'onAccessibilityEscape'|'onAccessibilityTap'|'onLayout'|'onMagicTap'|'style'|'testID'|'tvParallaxProperties' >{
  mode?: Mode;
  display?: Display;
  momentFormat?: string;
  themeName?: ThemeEnum;
  language?: LanguageEnum;
  value?: Date;
  placeholder?: string;
  placeholderTextColor?: string;
}
interface State {
  date: Date;
  hidePlaceholder: boolean;
  show: boolean;
}

class DateTimePicker extends Component<DateTimePickerProps, State> {
  static defaultProps = {
    mode: 'date',
  };

  momentFormat = 'DD/MM/YYYY hh:mm A';

  minWidth = 250;

  constructor(props: DateTimePickerProps) {
    super(props);
    const { mode, value } = this.props;
    switch (mode) {
      case 'date':
        this.minWidth = 250;
        this.momentFormat = 'DD/MM/YYYY';
        break;
      case 'time':
        this.minWidth = 150;
        this.momentFormat = 'hh:mm A';
        break;
      case 'datetime':
        this.minWidth = 320;
        this.momentFormat = 'DD/MM/YYYY hh:mm A';
        break;
      default:
        this.minWidth = 250;
        this.momentFormat = 'DD/MM/YYYY hh:mm A';
    }
    this.state = {
      date: value || new Date(),
      show: false,
      hidePlaceholder: false,
    };
  }

  addTimeAndroid = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const { onChange } = this.props;
    const currentDate = selectedDate || date;

    const dateString = moment(date).format('YYYY-MM-DD');
    const timeString = moment(currentDate).format('hh:mm');
    const newDateString = `${dateString} ${timeString}`;
    const newDate = moment(newDateString, 'YYYY-MM-DD hh:mm').toDate();
    this.setState({
      date: newDate,
    });
    if (onChange) onChange(event, selectedDate);
  };

  customOnChange = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const { onChange } = this.props;
    const currentDate = selectedDate || date;
    this.setState({
      date: currentDate,
      show: Platform.OS === 'ios',
      hidePlaceholder: true,
    });
    if (onChange) onChange(event, selectedDate);
  };

  renderDateTime = () => {
    const { date } = this.state;
    /**
     * IOS
     */
    const {
      textColor: textColorProp,
      mode: modeProp,
      themeName,
      ...otherProps
    } = this.props;
    const theme = getThemeByName(themeName);
    if (Platform.OS === 'ios') {
      const textColor = textColorProp || theme.colors.textColor;
      return (
        <QuickView style={{ minWidth: this.minWidth }}>
          <RNDateTimePicker
            value={date}
            textColor={textColor}
            mode={modeProp}
            onChange={this.customOnChange}
            {...otherProps}
          />
        </QuickView>
      );
    }

    /**
     * Android
     */
    if (modeProp === 'datetime') {
      return (
        <>
          <RNDateTimePicker
            value={date}
            mode="time"
            onChange={this.addTimeAndroid}
            {...otherProps}
          />
          <RNDateTimePicker
            value={date}
            mode="date"
            onChange={this.customOnChange}
            {...otherProps}
          />
        </>
      );
    }
    return (
      <RNDateTimePicker
        value={date}
        mode={modeProp}
        onChange={this.customOnChange}
        {...otherProps}
      />
    );
  };

  getDate = () => {
    const { date } = this.state;
    return date;
  };

  getText = () => {
    const { date } = this.state;
    const { momentFormat: momentFormatProp } = this.props;
    const momentFormat = momentFormatProp || this.momentFormat;
    return moment(date).format(momentFormat);
  };

  render() {
    const { show, date, hidePlaceholder } = this.state;
    const {
      mode,
      display,
      momentFormat: momentFormatProp,
      themeName,
      language,
      value,
      locale,
      minuteInterval,
      timeZoneOffsetInMinutes,
      textColor,
      onChange,
      neutralButtonLabel,
      placeholder: placeholderProp,
      titleColor: titleColorProp,
      placeholderTextColor,
      ...otherProps
    } = this.props;

    /**
     * Language Handle
     */
    const doneText = language === LanguageEnum.EN ? 'Done' : 'Hoàn tất';
    let placeholder = '';
    if (!value) {
      if (placeholderProp) {
        placeholder = placeholderProp;
      } else {
        let enModeString = '';
        let viModeString = '';
        if (mode === 'date') {
          enModeString = 'date';
          viModeString = 'ngày';
        } else if (mode === 'time') {
          enModeString = 'time';
          viModeString = 'thời gian';
        } else if (mode === 'datetime') {
          enModeString = 'date & time';
          viModeString = 'ngày và giờ';
        }
        placeholder = language === LanguageEnum.EN ? `Pick ${enModeString}` : `Chọn ${viModeString}`;
      }
    }

    /**
     * Color Handle
     */
    const theme = getThemeByName(themeName);
    let titleColor = titleColorProp;
    if (!hidePlaceholder && !value) {
      titleColor = placeholderTextColor || theme.colors.textColorSecondary;
    }

    /**
     * Time Handle
     */
    const momentFormat = momentFormatProp || this.momentFormat;
    const dateString = (hidePlaceholder || value) ? moment(date).format(momentFormat) : placeholder;

    return (
      <QuickView>
        <Button
          {...otherProps}
          titlePaddingHorizontal={15}
          onPress={() => {
            this.setState({ show: !show, hidePlaceholder: Platform.OS === 'ios' });
          }}
          title={(show && Platform.OS === 'ios') ? doneText : dateString}
          titleColor={titleColor}
          titleCenter={show && Platform.OS === 'ios'}
        />
        {show && this.renderDateTime()}
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});

const Result: any = connect(mapStateToProps, null, null,
  { forwardRef: true })(DateTimePicker as any);

export default Result as React.ComponentClass<DateTimePickerProps, any>;
