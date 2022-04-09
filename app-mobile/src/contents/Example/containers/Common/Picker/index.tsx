/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, Picker, Button,
} from '@components';
import { withTheme, ThemeProps } from 'react-native-elements';

class PickerExample extends PureComponent {
  private pickerRef: any;

  render() {
    return (
      <Container>
        <Header backIcon title="Picker" shadow switchTheme />
        <Body scroll>
          <QuickView center style={{ marginBottom: 15, marginTop: 10 }}>
            <Picker
              labels={['Java', 'Javascript']}
              values={['java', 'js']}
              width={150}
              height={40}
              shadow
              // placeholder="Choose Language"
              // selectedValue={1}
              ref={(ref) => { this.pickerRef = ref; }}
              onValueChange={(value) => {
                console.log('onValueChange: ', value);
              }}
            />
            <Button
              title="Log Value"
              width={150}
              onPress={() => {
                console.log('pickerRef: ', this.pickerRef);
                console.log('SelectedIndex: ', this.pickerRef.getSelectedIndex());
                console.log('SelectedValue: ', this.pickerRef.getSelectedValue());
                console.log('getText: ', this.pickerRef.getText());
              }}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withTheme(PickerExample as unknown as React.ComponentType<null & ThemeProps<any>>);
