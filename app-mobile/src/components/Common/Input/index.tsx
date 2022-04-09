import React from 'react';
import {
  StyleSheet, NativeSyntheticEvent, TextInputFocusEventData, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Input as ElementInput,
  InputProps as EInputProps,
} from 'react-native-elements';
import _ from 'lodash';
import { darkInput } from '@themes/ThemeComponent/Input';
import { connect } from 'react-redux';
import { languageSelector, themeSelector } from '@contents/Config/redux/selector';
import { LanguageEnum, ThemeEnum } from '@contents/Config/redux/constant';
import { getThemeByName, getLanguageByName } from '@utils/appHelper';
import {
  NameValidator,
  EmailValidator,
  PasswordValidator,
  PhoneNumberValidator,
  IDValidator,
  VerifiedEmailCodeValidator,
} from '../../../core/validators';
import Button from '../Button/DefaultButton';
import Text, { TextProps } from '../Text';
import QuickView from '../View/QuickView';
import Picker, { PickerProps } from '../Picker';
import DateTimePicker, { DateTimePickerProps } from '../DateTimePicker';

enum EnumValidationField {
  name,
  email,
  password,
  rePassword,
  phone,
  affiliateCode,
  verifiedEmailCode,
  id,
  none,
}

export interface InputProps extends Omit<EInputProps, 'labelProps' | 'labelStyle'> {
  value?: string;
  validationField?: keyof typeof EnumValidationField;
  comparedValue?: string;
  nextFocus?: any;
  textCenter?: boolean;
  center?: boolean;
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  borderColor?: string;
  borderBottomColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  color?: string;
  rightIconColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  type?: keyof typeof darkInput;
  shadow?: boolean;
  language?: LanguageEnum;
  themeName?: ThemeEnum;
  ref?: any;
  tLabel?: string;
  labelProps?: TextProps;
  showLabel?: boolean;
  showPlaceholder?: boolean;
  tPlaceholder?: string;
  tErrorMessage?: string;
  pickerProps?: PickerProps;
  dateTimePickerProps?: DateTimePickerProps | boolean;
}

interface State {
  value: string;
  isSecure: boolean;
  isValidated: boolean;
  triggerError: boolean;
  borderColor?: string;
  borderBottomColor?: string;
  marginBottom?: number;
}

const validateField = (
  enumValidationField: keyof typeof EnumValidationField,
  input: string, comparedInput: string,
) => {
  switch (enumValidationField) {
    case 'name':
      return NameValidator(input);
    case 'email':
      return EmailValidator(input);
    case 'password':
      return PasswordValidator(input);
    case 'rePassword':
      return input === comparedInput;
    case 'phone':
      return PhoneNumberValidator(input);
    case 'id':
      return IDValidator(input);
    case 'verifiedEmailCode':
      return VerifiedEmailCodeValidator(input);
    default:
      return true;
  }
};

class Input extends React.Component<InputProps, State> {
  static defaultProps = {
    type: 'rounded',
    width: '100%',
    height: 40,
    autoCorrect: false,
    autoCapitalize: 'none',
    validationField: 'none',
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 0,
    showLabel: false,
    showPlaceholder: true,
  };

  private input: any;

  constructor(props: InputProps) {
    super(props);
    const {
      borderColor,
      marginBottom,
      borderBottomColor,
    } = this.props;
    this.state = {
      value: props.value || '',
      isSecure: props.secureTextEntry || false,
      isValidated: true,
      triggerError: false,
      borderColor,
      borderBottomColor,
      marginBottom,
    };
  }

  getText = () => {
    const { pickerProps, dateTimePickerProps } = this.props;
    if (pickerProps || dateTimePickerProps) {
      return this.input.getText();
    }
    const { isValidated } = this.state;
    return isValidated ? this.input.props.value : null;
  };

  getDate = () => {
    const { dateTimePickerProps } = this.props;
    if (dateTimePickerProps) {
      return this.input.getDate();
    }
    return undefined;
  };

  getSelectedValue = () => {
    const { pickerProps } = this.props;
    if (pickerProps) {
      return this.input.getSelectedValue();
    }
    return undefined;
  };

  getSelectedIndex = () => {
    const { pickerProps } = this.props;
    if (pickerProps) {
      return this.input.getSelectedIndex();
    }
    return undefined;
  };

  focus = () => this.input.focus();

  blur = () => this.input.blur();

  private validateInput = () => {
    const { validationField, comparedValue } = this.props;
    const isValidated = validateField(
      validationField || 'none',
      this.input.props.value || '',
      comparedValue || '',
    );
    if (!isValidated) {
      this.setState({ triggerError: true });
    }
    this.setState({ isValidated });
    return isValidated;
  };

  onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { themeName } = this.props;
    const theme = getThemeByName(themeName);
    let colors: any;
    if (Platform.OS === 'ios') {
      colors = theme.colors.platform.ios;
    } else {
      colors = theme.colors.platform.android;
    }
    const isValidated = this.validateInput();
    const { validationField, onBlur: onBlurProp } = this.props;
    if (validationField !== 'none') {
      if (!isValidated) {
        this.input.shake();
        const { marginBottom } = this.state;
        const { marginBottom: marginBottomProp } = this.props;
        this.setState({ borderColor: colors.error, borderBottomColor: colors.error });
        if (marginBottomProp === marginBottom) {
          const newMarginBottom = (marginBottom || 0) + 25;
          this.setState({ marginBottom: newMarginBottom });
        }
      } else {
        const { marginBottom } = this.state;
        const { marginBottom: marginBottomProp } = this.props;
        this.setState({ borderColor: colors.success, borderBottomColor: colors.success });
        if (marginBottomProp !== marginBottom) {
          const newMarginBottom = (marginBottom || 0) - 25;
          this.setState({ marginBottom: newMarginBottom });
        }
      }
    }
    if (onBlurProp) onBlurProp(e);
  };

  onChangeText = (value: string) => {
    const { themeName } = this.props;
    const theme = getThemeByName(themeName);
    let colors: any;
    if (Platform.OS === 'ios') {
      colors = theme.colors.platform.ios;
    } else {
      colors = theme.colors.platform.android;
    }
    const { onChangeText: onChangeTextProp, validationField } = this.props;
    const { triggerError } = this.state;
    this.setState({ value });
    if (validationField !== 'none') {
      if (triggerError) {
        const { comparedValue } = this.props;
        const isValidated = validateField(
        this.props?.validationField || 'none',
        value,
        comparedValue || '',
        );
        if (!isValidated) {
          const { marginBottom } = this.state;
          const { marginBottom: marginBottomProp } = this.props;
          this.setState({ borderColor: colors.error, borderBottomColor: colors.error });
          if (marginBottomProp === marginBottom) {
            const newMarginBottom = (marginBottom || 0) + 25;
            this.setState({ marginBottom: newMarginBottom });
          }
        } else {
          const { marginBottom } = this.state;
          const { marginBottom: marginBottomProp } = this.props;
          this.setState({ borderColor: colors.success, borderBottomColor: colors.success });
          if (marginBottomProp !== marginBottom) {
            const newMarginBottom = (marginBottom || 0) - 25;
            this.setState({ marginBottom: newMarginBottom });
          }
        }
        this.setState({ isValidated });
      }
      if (onChangeTextProp) onChangeTextProp(value);
    }
  };

  private onChangeSecureState = () => {
    this.setState((previousState) => ({
      isSecure: !previousState.isSecure,
    }));
  };

  private renderInput = () => {
    const {
      isSecure, isValidated, value, marginBottom, borderColor, borderBottomColor,
    } = this.state;
    const {
      margin,
      marginTop,
      marginLeft,
      marginRight,
      marginBottom: marginBottomProp,
      marginHorizontal,
      marginVertical,
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingHorizontal,
      paddingVertical,
      height,
      width,
      borderWidth,
      borderRadius,
      backgroundColor,
      containerStyle: containerStyleProp,
      inputContainerStyle: inputContainerStyleProp,
      inputStyle: inputStyleProp,
      errorStyle: errorStyleProp,
      leftIcon: leftIconProp,
      rightIcon: rightIconProp,
      rightIconContainerStyle: rightIconContainerStyleProp,
      leftIconContainerStyle: leftIconContainerStyleProp,
      color,
      fontSize,
      textCenter,
      center,
      placeholder: placeholderProp,
      label: labelProp,
      labelProps,
      showLabel,
      showPlaceholder,
      secureTextEntry,
      rightIconColor: rightIconColorProp,
      errorMessage: errorMessageProp,
      type,
      onBlur: onBlurProp,
      placeholderTextColor: placeholderTextColorProp,
      shadow,
      language,
      themeName,
      tLabel,
      tPlaceholder,
      tErrorMessage,
      pickerProps,
      dateTimePickerProps,
      ...otherProps
    } = this.props;
    const theme = getThemeByName(themeName);
    const { shadowView } = theme;

    /**
     * Language Handle
     */
    let label: any = labelProp;
    let placeholder: any = placeholderProp;

    const inputText = language === LanguageEnum.VI ? 'Nhập' : 'Input';
    const inputInfoText = language === LanguageEnum.VI ? 'Nhập thông tin' : 'Input Field';
    const langSource = getLanguageByName(language);
    if (tLabel) {
      const keys = _.split(tLabel, ':');
      label = langSource;
      keys.forEach((key) => {
        label = label[key];
      });
    }
    if (tPlaceholder) {
      const keys = _.split(tPlaceholder, ':');
      placeholder = langSource;
      keys.forEach((key) => {
        placeholder = placeholder[key];
      });
    }
    let errorMessage: any = errorMessageProp || `${language === LanguageEnum.EN ? 'Invalid' : ''} ${_.replace((label || placeholder)?.toString() || '', inputText, '')} ${language === LanguageEnum.VI ? 'không hợp lệ' : ''}`;
    errorMessage = _.capitalize(_.trim(errorMessage));

    if (tErrorMessage) {
      const keys = _.split(tErrorMessage, ':');
      errorMessage = langSource;
      keys.forEach((key) => {
        errorMessage = errorMessage[key];
      });
    }
    if (!showPlaceholder) placeholder = ' ';

    /**
     * containerStyle
     */
    const containerStyle: any = StyleSheet.flatten([
      marginBottom && { marginBottom },
      width && { width },
      height && { height },
      borderWidth && { borderWidth },
      borderColor && { borderColor },
      type && theme.Input[type].containerStyle,
      margin && { margin },
      marginTop && { marginTop },
      marginLeft && { marginLeft },
      marginRight && { marginRight },
      marginHorizontal && { marginHorizontal },
      marginVertical && { marginVertical },
      padding && { padding },
      paddingTop && { paddingTop },
      paddingBottom && { paddingBottom },
      paddingLeft && { paddingLeft },
      paddingRight && { paddingRight },
      paddingHorizontal && { paddingHorizontal },
      paddingVertical && { paddingVertical },
      borderRadius && { borderRadius },
      backgroundColor && { backgroundColor },
      center && { alignSelf: 'center' },
      shadow && { paddingBottom: 3 },
      shadow && shadowView,
      containerStyleProp,
    ]);

    /**
     * inputContainerStyle, placeholderColor
     */
    const inputContainerStyle: any = StyleSheet.flatten([
      type && theme.Input[type].inputContainerStyle,
      {
        height,
      },
      borderBottomColor && { borderBottomColor },
      inputContainerStyleProp,
    ]);
    const placeholderTextColor = placeholderTextColorProp || theme.colors.textColorSecondary;

    /**
     * leftIcon
     */
    const defaultLeftIcon = {
      size: type && theme.Input[type].inputStyle.fontSize + 5,
      color: placeholderTextColor,
      type: 'material-community',
    };
    const leftIcon = leftIconProp ? _.merge(defaultLeftIcon, leftIconProp) : undefined;

    /**
     * leftIconContainerStyle
     */
    const leftIconContainerStyle: any = StyleSheet.flatten([
      { position: 'absolute', left: 0 },
      type && theme.Input[type].leftIconContainerStyle,
      leftIconContainerStyleProp,
    ]);

    /**
     * rightIcon
     */
    const rightIconColor = rightIconColorProp || placeholderTextColor;
    const defaultRightIcon = {
      size: type && theme.Input[type].inputStyle.fontSize + 5,
      color: rightIconColor,
      type: 'material-community',
    };
    const rightIcon = rightIconProp ? _.merge(defaultRightIcon, rightIconProp) : undefined;
    /**
     * rightIconContainerStyle
     */
    const rightIconContainerStyle: any = StyleSheet.flatten([
      { position: 'absolute', right: 0 },
      type && theme.Input[type].rightIconContainerStyle,
      rightIconContainerStyleProp,
    ]);

    /**
     * inputStyle
     */
    const inputStyle: any = StyleSheet.flatten([
      type && theme.Input[type].inputStyle,
      color && { color },
      fontSize && { fontSize },
      textCenter
        ? {
          paddingHorizontal:
              leftIconProp || rightIconProp ? defaultLeftIcon.size + 10 : 10,
        }
        : { paddingLeft: leftIconProp ? defaultLeftIcon.size + 10 : 10 },
      textCenter && { textAlign: 'center' },
      inputStyleProp,
    ]);

    /**
     * errorStyle
     */
    const errorStyle: any = StyleSheet.flatten([
      { textAlign: 'right' },
      type && theme.Input[type].errorStyle,
      errorStyleProp,
    ]);

    /**
     * Picker
     */
    if (pickerProps) {
      const PickerComponent: any = Picker;
      return (
        <PickerComponent
          {...pickerProps}
          ref={(ref: any) => { this.input = ref; }}
          width={width}
          height={height}
          backgroundColor={type && theme.Input[type].containerStyle.backgroundColor}
          titleColor={type && theme.Input[type].inputStyle.color}
          iconColor={placeholderTextColor}
          titleCenter={textCenter || false}
        />
      );
    }

    if (dateTimePickerProps) {
      const DateTimePickerComponent: any = DateTimePicker;
      return (
        <DateTimePickerComponent
          {...dateTimePickerProps}
          ref={(ref: any) => { this.input = ref; }}
          width={width}
          height={height}
          backgroundColor={type && theme.Input[type].containerStyle.backgroundColor}
          titleColor={type && theme.Input[type].inputStyle.color}
          iconColor={placeholderTextColor}
          titleCenter={textCenter || false}
        />
      );
    }

    return (
      <ElementInput
        {...otherProps}
        containerStyle={containerStyle}
        inputContainerStyle={inputContainerStyle}
        inputStyle={inputStyle}
        ref={(ref) => { this.input = ref; }}
        placeholder={
          !isValidated
            ? ''
            : placeholder
              || (label ? `${inputText} ${label}` : inputInfoText)
        }
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={isSecure}
        value={value}
        errorMessage={
          !isValidated
            ? errorMessage
            : undefined
        }
        errorStyle={errorStyle}
        onChangeText={(text: string) => this.onChangeText(text)}
        onBlur={this.onBlur}
        leftIcon={leftIcon}
        rightIcon={
          secureTextEntry ? (
            <Button
              clear
              onPress={this.onChangeSecureState}
              icon={(
                <Icon
                  name={isSecure ? 'ios-eye' : 'ios-eye-off'}
                  size={(fontSize || 0) + 5}
                  color={rightIconColor}
                />
              )}
              marginTop={0}
              marginRight={-10}
            />
          ) : (
            rightIcon
          )
        }
        rightIconContainerStyle={rightIconContainerStyle}
        leftIconContainerStyle={leftIconContainerStyle}
      />
    );
  };

  render() {
    const { showLabel, label, labelProps } = this.props;
    if (showLabel) {
      return (
        <QuickView>
          <Text marginBottom={5} {...labelProps}>
            {label}
          </Text>
          {this.renderInput()}
        </QuickView>
      );
    } return this.renderInput();
  }
}

const mapStateToProps = (state: any) => ({
  themeName: themeSelector(state),
  language: languageSelector(state),
});

// const withReduce = connect(mapStateToProps, null, null,
//   {
//     forwardRef: true,
//   });

// export default compose(
//   withTheme,
//   withReduce,
// )(Input as React.ComponentType<InputProps & ThemeProps<any>>);

export default connect(mapStateToProps, null, null,
  { forwardRef: true })(Input as React.ComponentType<InputProps>);
