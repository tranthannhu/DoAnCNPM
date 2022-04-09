import React, { PureComponent } from 'react';
import {
  Text, Container, QuickView, Header, Body,
} from '@components';
import { withTheme, ThemeProps } from 'react-native-elements';
import { Color } from '@themes/Theme';

class TextExample extends PureComponent {
  render() {
    return (
      <Container>
        <Header backIcon title="Text" shadow switchTheme />
        <Body scroll>
          <QuickView style={{ marginBottom: 15, marginTop: 10 }}>
            <Text t="auth:login" />
            <Text margin={10}>Text Component with margin=10</Text>
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Text primary>Primary Text</Text>
            <Text secondary>Secondary Text</Text>
            <Text success>Success Text</Text>
            <Text warning>Warning Text</Text>
            <Text error>Error Text</Text>
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Text bold>Bold Text</Text>
            <Text italic>Italic Text</Text>
            <Text underline>Underline Text</Text>
            <Text fontWeight="heavy">Text with custom fontWeight</Text>
            <Text fontSize="large">Text with custom fontSize</Text>
            <Text fontFamily="RobotoThin">Text with custom fontFamily</Text>
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Text type="header">Header</Text>
            <Text type="xTitle">XTitle</Text>
            <Text type="title">Title</Text>
            <Text type="paragraph">Paragraph</Text>
            <Text type="subtitle">Subtitle</Text>
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Text icon={{ name: 'account' }}>Text with Icon</Text>
            <Text icon={{ name: 'account' }} iconRight>Text with Icon on the right side</Text>
            <Text icon={{ name: 'account', color: Color.orange, size: 20 }}>Text with Custom Icon</Text>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withTheme(TextExample as React.ComponentType<null & ThemeProps<any>>);
