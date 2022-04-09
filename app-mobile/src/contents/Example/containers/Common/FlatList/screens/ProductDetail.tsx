import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import { getIdFromParams } from '@utils/appHelper';
import {
  Container,
  Body,
  Text,
  ParallaxScrollView,
  QuickView,
  Image,
  Header,
} from '@components';
import { parallaxHeaderHeight } from '@themes/ThemeComponent/ParallaxScrollView';
import { withTheme } from 'react-native-elements';
import { productDetailSelector } from '../redux/selector';
import { productGetDetail } from '../redux/slice';

interface Props {
  detail: any;
  getDetail: (id: number) => any;
  theme?: any;
}

class ProductDetail extends PureComponent<Props> {
  componentDidMount() {
    const { getDetail } = this.props;
    getDetail(getIdFromParams(this.props));
  }

  renderForeground = () => {
    const height = 80;
    const marginTop = parallaxHeaderHeight - height;
    const {
      theme,
      detail: { data },
    } = this.props;
    return (
      <QuickView
        height={height}
        backgroundColor={theme.colors.bgColor}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        marginTop={marginTop}
      >
        <QuickView margin={20}>
          <Text type="header">{data.name}</Text>
          <Text icon={{ name: 'map-marker' }} numberOfLines={1}>
            {data.address}
          </Text>
        </QuickView>
      </QuickView>
    );
  };

  renderStickyHeader = () => {
    const {
      detail: { data },
    } = this.props;
    return <Header title={data.name} />;
  };

  render() {
    const {
      detail: { data },
    } = this.props;
    return (
      <Container>
        <ParallaxScrollView
          backgroundImageSource={{ uri: data.mainImage?.link }}
          renderForeground={this.renderForeground}
          renderStickyHeader={this.renderStickyHeader}
        >
          <Body>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1000',
                cache: 'web',
              }}
              containerStyle={{ marginTop: 20 }}
            />
          </Body>
        </ParallaxScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  detail: parseObjectSelector(
    applyObjectSelector(productDetailSelector, state),
  ),
});

const mapDispatchToProps = (dispatch: any) => ({
  getDetail: (id: number) => dispatch(productGetDetail({ id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ProductDetail as any));
