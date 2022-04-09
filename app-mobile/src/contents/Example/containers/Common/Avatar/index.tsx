import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, Avatar,
} from '@components';
import { Color } from '@themes/Theme';

class AvatarExample extends PureComponent {
  render() {
    return (
      <Container>
        <Header backIcon title="Avatar" shadow switchTheme />
        <Body scroll>
          <QuickView style={{ marginBottom: 15, marginTop: 10 }}>
            <Avatar
              source={{
                uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              marginBottom={10}
              title="A1"
            />
            <Avatar
              size="small"
              rounded
              source={{
                uri:
      'https://www.easy-profile.com/support.html?controller=attachment&task=download&tmpl=component&id=2883',
              }}
              title="S"
              marginBottom={10}
            />
            <Avatar
              size="medium"
              rounded
              source={{
                uri:
      'https://www.easy-profile.com/support.html?controller=attachment&task=download&tmpl=component&id=2883',
              }}
              title="M"
              marginBottom={10}
            />
            <Avatar
              size="large"
              rounded
              source={{
                uri:
      'https://www.easy-profile.com/support.html?controller=attachment&task=download&tmpl=component&id=2883',
              }}
              title="L"
              marginBottom={10}
            />
            <Avatar
              size="xlarge"
              rounded
              source={{
                uri:
      'https://www.easy-profile.com/support.html?controller=attachment&task=download&tmpl=component&id=2883',
              }}
              title="XL"
              marginBottom={10}
            />
          </QuickView>
          <QuickView>
            <Avatar
              icon={{ name: 'user', type: 'font-awesome', color: Color.blue }}
              backgroundColor={Color.grey3}
              marginBottom={10}
            />
            <Avatar
              rounded
              icon={{ name: 'user', type: 'font-awesome', color: Color.blue }}
              backgroundColor={Color.grey3}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default AvatarExample;
