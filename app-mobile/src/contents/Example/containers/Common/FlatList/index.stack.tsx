import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import productStack from './routes';
import ProductListScreen from './screens/ProductList';
import ProductDetailScreen from './screens/ProductDetail';

const Stack = createStackNavigator();

export default function ProductStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={productStack.productList} component={ProductListScreen} />
      <Stack.Screen name={productStack.productDetail} component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
