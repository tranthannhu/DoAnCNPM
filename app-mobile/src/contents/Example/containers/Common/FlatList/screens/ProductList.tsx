import React, { PureComponent } from 'react';
import {
  Container,
  QuickView,
  Header,
  Body,
  FlatList,
  Text,
} from '@components';
import { connect } from 'react-redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import { TQuery, TArrayRedux } from '@utils/redux';
import { Card, withTheme } from 'react-native-elements';
import { createShadow } from '@utils/view';
import { Color } from '@themes/Theme';
import { StyleSheet } from 'react-native';
import { vndPriceFormat } from '@utils/functions';
import { compose } from 'recompose';
import { ThemeEnum } from '@contents/Config/redux/constant';
import NavigationService from '@utils/navigation';
import { setIdIntoParams } from '@utils/appHelper';
import Filter from '@utils/filter';
import { productGetList } from '../redux/slice';
import { productListSelector } from '../redux/selector';
import productStack from '../routes';

interface Props {
  list: TArrayRedux;
  getList: (query?: TQuery) => any;
  theme?: any;
}

class ProductListScreen extends PureComponent<Props> {
  renderItem = ({ item }: { item: any }) => {
    const { theme } = this.props;
    const containerStyle = StyleSheet.flatten([
      {
        borderRadius: 10,
        margin: 0,
        borderWidth: 0,
      },
      theme.key === ThemeEnum.LIGHT && createShadow(Color.grey3),
    ]);
    const wrapperStyle = StyleSheet.flatten([
      { borderRadius: 10 },
      {
        backgroundColor:
          theme.key === ThemeEnum.LIGHT
            ? theme.colors.white
            : theme.colors.grey8,
      },
    ]);

    return (
      <QuickView
        backgroundColor={
          theme.key === ThemeEnum.LIGHT
            ? '#E6EDFF'
            : theme.colors.bgColorSecondary
        }
        borderRadius={10}
        marginVertical={10}
        paddingHorizontal={theme.key === ThemeEnum.LIGHT ? 1 : 0}
        // eslint-disable-next-line max-len
        onPress={() => NavigationService.navigate(
          productStack.productDetail,
          setIdIntoParams(item),
        )}
      >
        <Card
          image={{
            uri: item.mainImage?.link,
          }}
          imageProps={{ borderRadius: 10 }}
          containerStyle={containerStyle}
          wrapperStyle={wrapperStyle}
        >
          <Text
            marginLeft={10}
            numberOfLines={1}
            marginRight={35}
            bold
            fontSize={18}
            color={theme.colors.primary}
          >
            {item.name}
          </Text>
          <Text
            marginLeft={10}
            marginTop={5}
            fontSize={12}
            color={theme.colors.secondary}
          >
            {item.address}
          </Text>
        </Card>
        <QuickView
          row
          paddingHorizontal={20}
          paddingBottom={10}
          paddingVertical={10}
        >
          <QuickView flex={5}>
            <Text color={theme.colors.secondary} fontSize={12}>
              Phí hoa hồng
            </Text>
            <Text color={theme.colors.primary} fontSize={18}>
              {`${item.commissionRate} %`}
            </Text>
          </QuickView>
          <QuickView flex={5}>
            <Text color={theme.colors.secondary} fontSize={12}>
              Giá sản phẩm
            </Text>
            <Text color={theme.colors.primary} fontSize={18}>
              {vndPriceFormat(item.price)}
            </Text>
          </QuickView>
        </QuickView>
      </QuickView>
    );
  };

  render() {
    const { list, getList } = this.props;
    const { theme } = this.props;
    const fields = ['id', 'name', 'commissionRate', 'address'];
    /**
     * For Filter
     */
    const filter = new Filter();
    // filter.mergeFilter('name', '$like', 'Rich');
    // filter.mergeFilter('name', '$not', 'Sunshine City Sài Gòn', 'OR');
    // filter.mergeFilter('sections.price', '$lte', 1000000000);

    return (
      <Container>
        <Header backIcon title="FlatList" shadow switchTheme />
        <Body>
          <QuickView>
            {/* Basic FlatList */}
            <FlatList
              list={list}
              getList={(query?: TQuery) => {
                getList({ ...query, fields, filter: filter.filterObject });
              }}
              // getList={getList}
              renderItem={this.renderItem}
              extraData={theme}
            />

            {/* Custom FlatList Color */}
            {/* <FlatList
              textColor="blue"
              loadingColor="blue"
              list={list}
              getList={getList}
              renderItem={this.renderItem}
            /> */}
          </QuickView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  list: parseArraySelector(applyArraySelector(productListSelector, state)),
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: (query?: TQuery) => dispatch(productGetList({ query })),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
});

export default compose(withTheme, withReduce)(ProductListScreen as any);
