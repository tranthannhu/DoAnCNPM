import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const standardWidth = 375;
const standardHeight = 812;

const Metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  ratioH: height / standardHeight,
  ratioW: width / standardWidth,
};

export default Metrics;
