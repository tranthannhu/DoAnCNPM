import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import Input, { InputProps } from '../../Common/Input';

export interface AuthInputProps extends InputProps{
  leftIconName?: string;
}

class PrimaryInput extends PureComponent<AuthInputProps> {
  static defaultProps = {
    backgroundColor: '#E6E9F0',
    height: 50,
    center: true,
    textCenter: true,
    // shadow: true,
    fontSize: 18,
    showLabel: true,
    showPlaceholder: false,
    labelProps: { bold: true },
  };

  input: any;

  getText = () => this.input.getText();

  focus = () => this.input.focus();

  render() {
    const { leftIconName, theme, ...otherProps } = this.props;
    const leftIcon = leftIconName ? {
      name: leftIconName, size: 22,
    } : undefined;
    return (
      <Input
        ref={(ref: any) => { this.input = ref; }}
        {...otherProps}
        leftIcon={leftIcon}
      />
    );
  }
}
export default withTheme(
  PrimaryInput as unknown as React.ComponentType<AuthInputProps & ThemeProps<any>>,
);
