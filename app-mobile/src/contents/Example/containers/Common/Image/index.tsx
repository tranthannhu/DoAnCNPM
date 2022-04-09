import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, Image, Text,
} from '@components';
import { Color } from '@themes/Theme';

class ImageExample extends PureComponent {
  render() {
    return (
      <Container>
        <Header backIcon title="Image" shadow switchTheme />
        <Body scroll>
          <QuickView style={{ marginBottom: 15, marginTop: 10 }}>
            <Text type="header">Basic Image</Text>
            <Text type="title" center marginVertical={5}>Remote Image (auto width, height)</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1000',
                cache: 'web',
              }}
              loadingColor={Color.violet}
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Remote Image (auto height)</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1100',
                cache: 'web',
              }}
              width={100}
              center
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Remote Rounded Image (static width, height)</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1200',
                cache: 'web',
              }}
              width={100}
              height={100}
              rounded
              center
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Sharp</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1200',
                cache: 'web',
              }}
              width={100}
              height={100}
              sharp
              center
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Circle</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1200',
                cache: 'web',
              }}
              width={100}
              circle
              center
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Remote Image (viewEnable)</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/2000/2000',
                cache: 'web',
              }}
              width={100}
              height={100}
              center
              viewEnable
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Error Image</Text>
            <Image
              source={{
                uri: 'https://picsum.photoss/2000/2100',
                cache: 'web',
              }}
              width={100}
              height={100}
              center
              viewEnable
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Local Image</Text>
            <Image
              source={require('@assets/images/loginBackground.png')}
              width={200}
              center
              viewEnable
            />
          </QuickView>
          <QuickView style={{ marginBottom: 15, marginTop: 10 }}>
            <Text type="header">Image with Circle Loading</Text>
            <Text type="title" center marginVertical={5}>{'loadingColor="green" & showLoadingText={false} & loadingSize={60}'}</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/2000/2200',
                cache: 'web',
              }}
              width={200}
              height={200}
              center
              showLoadingText={false}
              loadingColor={Color.green}
              loadingSize={60}
              viewEnable
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Default Loading</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/2000/2300',
                cache: 'web',
              }}
              width={200}
              height={200}
              center
              loadingType="default"
              viewEnable
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Bar Loading</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/2000/2400',
                cache: 'web',
              }}
              width={200}
              height={200}
              center
              loadingType="bar"
              viewEnable
            />
            <Text type="title" center marginBottom={5} marginTop={25}>Pie Loading</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/2000/2500',
                cache: 'web',
              }}
              width={200}
              height={200}
              center
              loadingType="pie"
              viewEnable
            />
            <Text type="title" center marginBottom={5} marginTop={25}>CircleSnail Loading</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/2000/2600',
                cache: 'web',
              }}
              width={200}
              height={200}
              center
              loadingType="circleSnail"
              viewEnable
            />
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Text type="header" marginTop={10} marginBottom={10}>Image with Multiple Resources</Text>
            <Image
              source={{
                uri: 'https://picsum.photos/600/600',
                cache: 'web',
              }}
              multipleSources={[{ uri: 'https://picsum.photos/500/500' }, { uri: 'https://picsum.photos/600/600' }, { uri: 'https://picsum.photos/400/400' }, { uri: 'https://picsum.photos/500/500' }]}
              width={200}
              height={200}
              center
              showLoadingText={false}
              loadingColor={Color.green}
              loadingSize={60}
              viewEnable
            />
          </QuickView>
          <QuickView style={{ marginBottom: 15 }}>
            <Text type="header" marginTop={10} marginBottom={10}>Gif Image</Text>
            <Image
              source={{
                uri: 'https://i.chzbgr.com/full/8370322944/hADACEF88/im-gonna-kiss-you-then-bite-you',
              }}
              width={300}
              height={300}
              center
              showLoadingText={false}
              loadingColor={Color.green}
              loadingSize={60}
              viewEnable
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default ImageExample;
