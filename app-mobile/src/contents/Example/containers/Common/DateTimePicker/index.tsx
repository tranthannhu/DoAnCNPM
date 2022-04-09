/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, DateTimePicker, Button,
} from '@components';
import { withTheme, ThemeProps } from 'react-native-elements';

class DateTimePickerExample extends PureComponent {
  private dateTimePickerRef: any;

  render() {
    return (
      <Container>
        <Header backIcon title="DateTimePicker" shadow switchTheme />
        <Body scroll>
          <QuickView center style={{ marginBottom: 15, marginTop: 10 }}>
            <DateTimePicker
              ref={(ref) => { this.dateTimePickerRef = ref; }}
              value={new Date('2019-01-01')}
              minimumDate={new Date('2020-08-12')}
              maximumDate={new Date('2020-08-20')}
              placeholder="Pick a date"
              shadow
            />
            <DateTimePicker
              mode="time"
              shadow
              ref={(ref) => { this.dateTimePickerRef = ref; }}
            />
            <DateTimePicker
              mode="datetime"
              shadow
              ref={(ref) => { this.dateTimePickerRef = ref; }}
            />
            <Button
              title="Log getText"
              titlePaddingHorizontal={25}
              shadow
              onPress={() => console.log(this.dateTimePickerRef.getText())}
            />
            <Button
              title="Log getDate"
              titlePaddingHorizontal={25}
              shadow
              onPress={() => console.log(this.dateTimePickerRef.getDate())}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withTheme(
  DateTimePickerExample as unknown as React.ComponentType<null & ThemeProps<any>>,
);
