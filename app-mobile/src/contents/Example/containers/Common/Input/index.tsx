/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, Input, Text, Button,
} from '@components';
import {
  withTheme, ThemeProps,
} from 'react-native-elements';
import { Color } from '@themes/Theme';

class InputExample extends PureComponent {
  input1: any;

  input2: any;

  inputPicker: any;

  inputDateTimePicker: any;

  render() {
    return (
      <Container>
        <Header backIcon title="Input" shadow switchTheme />
        <Body scroll>
          <QuickView style={{ marginBottom: 15, marginTop: 10 }}>
            <Text type="header" marginBottom={10}>Basic Input</Text>
            <Input tLabel="auth:input_first_name" marginVertical={5} />
            <Input tPlaceholder="auth:input_first_name" marginVertical={5} />
            <Input tPlaceholder="auth:input_email_address" tErrorMessage="validator:email" validationField="email" marginVertical={5} />
            <Input
              ref={(ref: any) => {
                this.input1 = ref;
              }}
              label="width = 300, height = 100"
              width={300}
              height={100}
              center
              textCenter
              marginVertical={5}
            />
            <Button title="Log Value" marginBottom={20} center onPress={() => { console.log(this.input1.getText()); }} />
            <Input
              ref={(ref: any) => { this.input2 = ref; }}
              label="Input with default value"
              value="Default Value"
              center
              textCenter
              marginVertical={5}
            />
            <Button title="Log Value" marginBottom={20} center onPress={() => { console.log(this.input2.getText()); }} />
            <Input
              ref={(ref: any) => { this.inputPicker = ref; }}
              pickerProps={{
                labels: ['Java', 'Javascript'],
                values: ['java', 'js'],
              }}
              textCenter
            />
            <Button title="Log Selected Label" marginBottom={5} center onPress={() => { console.log(this.inputPicker.getText()); }} />
            <Button title="Log Selected Index" marginBottom={5} center onPress={() => { console.log(this.inputPicker.getSelectedIndex()); }} />
            <Button title="Log Selected Value" marginBottom={20} center onPress={() => { console.log(this.inputPicker.getSelectedValue()); }} />
            <Input
              ref={(ref: any) => { this.inputDateTimePicker = ref; }}
              dateTimePickerProps
            />
            <Button title="Log Date String" marginBottom={5} center onPress={() => { console.log(this.inputPicker.getText()); }} />
            <Button title="Log Date" marginBottom={5} center onPress={() => { console.log(this.inputPicker.getDate()); }} />
            <Input label="Sharp" validationField="name" type="sharp" marginVertical={5} />
            <Input label="Rounded" validationField="email" marginVertical={5} />
            <Input label="Underline" validationField="name" type="underline" marginVertical={5} />
            <Input label="Shadow" shadow validationField="name" marginVertical={5} />
            <Input label="Custom Background" validationField="name" marginVertical={5} backgroundColor="rgba(0, 220, 255, 0.3)" />
            <Input placeholder=" " label="No Placeholder" validationField="name" marginVertical={5} placeholderTextColor={Color.orange} />
            <Input placeholder="Custom Placeholder" validationField="name" marginVertical={5} placeholderTextColor={Color.orange} />
            <Input placeholder="Custom Error Message" validationField="name" marginVertical={5} errorMessage="Custom Error Message" />
            <Input label="Center Label" validationField="email" textCenter marginVertical={5} />
            <Input
              leftIcon={{ name: 'arrow-left' }}
              label="Left Icon"
              validationField="email"
              marginVertical={5}
            />
            <Input
              rightIcon={{ name: 'arrow-right' }}
              label="Right Icon"
              validationField="email"
              marginVertical={5}
            />
            <Input
              rightIcon={{ name: 'arrow-right' }}
              leftIcon={{ name: 'arrow-left' }}
              label="Center Label"
              textCenter
              validationField="email"
              marginVertical={5}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withTheme(InputExample as unknown as React.ComponentType<null & ThemeProps<any>>);
