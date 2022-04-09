/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import {
  Text, Container, QuickView, Header, Body, Button, ButtonGroup,
} from '@components';
import { withTheme, ThemeProps } from 'react-native-elements';
import { Color } from '@themes/Theme';

class ButtonExample extends PureComponent {
  buttonGroup: any;

  onItemPress = (index: number) => {
    console.log('index: ', index);
  };

  render() {
    const titleList = [
      'Button1',
      'Button2',
      'Button3',
      'Button4',
      'Button5',
    ];
    return (
      <Container>
        <Header backIcon title="Button" shadow switchTheme />
        <Body scroll>
          <QuickView style={{ marginBottom: 15, marginTop: 10 }}>
            <Text type="header">Default Button</Text>
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Button t="auth:login" />
            <Button width={200} title="Button with width = 200" />
            <Button height={70} title="Button with height = 70" />
            <Button width={250} center title="Button with center = true" />
            <Button marginVertical={10} title="Button with marginVertical = 10" />
            <Button paddingVertical={10} title="Button with paddingVertical = 10" />
          </QuickView>
          <QuickView style={{ marginBottom: 20 }}>
            <Button title="Nulled Button" />
            <Button title="Shadow Button" shadow />
            <Button primary title="Primary Button" />
            <Button secondary title="Secondary Button" />
            <Button success title="Success Button" />
            <Button warning title="Warning Button" />
            <Button error title="Error Button" />
          </QuickView>
          <QuickView style={{ marginBottom: 20 }}>
            <Button outline title="Nulled Outline Button" />
            <Button primary outline title="Primary Outline Button" />
            <Button secondary outline title="Secondary Outline Button" />
            <Button success outline title="Success Outline Button" />
            <Button warning outline title="Warning Outline Button" />
            <Button error outline title="Error Outline Button" />
          </QuickView>
          <QuickView style={{ marginBottom: 20 }}>
            <Button clear title="Nulled Clear Button" />
            <Button primary clear title="Primary Clear Button" />
            <Button secondary clear title="Secondary Clear Button" />
            <Button success clear title="Success Clear Button" />
            <Button warning clear title="Warning Clear Button" />
            <Button error clear title="Error Clear Button" />
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Button backgroundColor={Color.orange} title="Button with backgroundColor = Color.orange" />
            <Button titleColor={Color.orange} title="Button with titleColor = Color.orange" />
            <Button borderColor={Color.orange} borderWidth={3} title="Button with borderColor = Color.orange" />
            <Button icon={{ name: 'arrow-left', style: { marginTop: 3 } }} center title="Icon button" />
            <Button icon={{ name: 'arrow-right', style: { marginTop: 3 } }} iconRight center title="Button with right Icon" />
            <Button icon={{ name: 'arrow-right', style: { marginTop: 3 } }} center circle />
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Button sharp title="Sharp Button" />
            <Button rounded title="Rounded Button" />
            <Button width={100} circle center title="Ok" />
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Button title="Button with Bold Title" bold />
            <Button title="Active Button" active />
            <Button title="Active Custom Button" active activeBackgroundColor={Color.teal} activeTitleColor={Color.purple} />
          </QuickView>
          <QuickView style={{ marginBottom: 15, marginTop: 10 }}>
            <Text type="header">Button Group</Text>
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <ButtonGroup
              ref={(ref: any) => { this.buttonGroup = ref; }}
              titleList={titleList}
              onItemPress={this.onItemPress}
              defaultActiveIndex={2}
              propsChange={false}
              // activeBackgroundColor="transparent"
              // activeBorderColor={Color.orange}
              // activeTitleColor={Color.orange}
            />
            <Button title="Log ButtonGroup Index" onPress={() => console.log('ButtonGroup Index: ', this.buttonGroup.getIndex())} />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withTheme(ButtonExample as unknown as React.ComponentType<null & ThemeProps<any>>);
