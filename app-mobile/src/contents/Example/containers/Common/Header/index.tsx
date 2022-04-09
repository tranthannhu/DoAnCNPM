import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header,
} from '@components';
import { withTheme, ThemeProps } from 'react-native-elements';
import { Color } from '@themes/Theme';

class HeaderExample extends PureComponent {
  render() {
    return (
      <>
        <Container scroll>
          <Header backIcon title="Header 1" />
          <QuickView height={10} />
          <Header closeIcon title="Header 2" placement="left" />
          <QuickView height={10} />
          <Header backIcon logo />
          <QuickView height={10} />
          <Header backIcon shadow title="Header 4" switchTheme />
          <QuickView height={5} />
          <Header backIcon title="Header 5" color={Color.orange} transparent />
          <QuickView height={10} />
          <Header backIcon title="Header 6" leftColor={Color.purple} centerColor={Color.white} rightColor={Color.blue} backgroundColor={Color.green} switchTheme />
          <QuickView height={10} />
        </Container>
        <Header backIcon title="Header 7" bottom={30} position="absolute" switchTheme />
      </>
    );
  }
}

export default withTheme(HeaderExample as React.ComponentType<null & ThemeProps<any>>);
