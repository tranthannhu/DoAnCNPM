/* eslint-disable newline-per-chained-call */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { shallow, ShallowWrapper } from 'enzyme';
import React, { ReactElement, Component } from 'react';
import toJson from 'enzyme-to-json';

export enum EnumComponent {
  SINGLE = 'single',
  HOC = 'hoc',
}

/**
 *
 * @param node React Native Component
 * @param listOfProps List of Props that you pass into current Component
 * @param type Type of current Component ('single' or 'hoc')
 */
export function getComponent<C extends Component, P = C['props'], S = C['state']>(
  node: ReactElement<P>,
  listOfProps: any,
  type: EnumComponent,
): ShallowWrapper<P, S, C> {
  const nodeWithProps = React.cloneElement(
    node,
    listOfProps,
  );
  let component: any;
  switch (type) {
    case EnumComponent.HOC:
      component = shallow(nodeWithProps).first().shallow().first().shallow().first().shallow();
      break;
    default:
      component = shallow(nodeWithProps);
      break;
  }
  return component;
}

/**
 *
 * @param node React Native Component
 * @param listOfProps List of Props that you pass into current Component
 * @param type Type of current Component ('single' or 'hoc')
 * @param styleName Name of current style (ex: 'style', 'titleStyle', 'containerStyle')
 */
export function getStyle<C extends Component, P = C['props'], S = C['state']>(
  node: ReactElement<P>,
  listOfProps: any,
  type: EnumComponent,
  styleName: 'style' | 'containerStyle' | 'iconStyle' | 'iconContainerStyle' | 'avatarStyle' | 'overlayContainerStyle' | 'placeholderStyle' | 'titleStyle' | 'badgeStyle' | 'textStyle' | 'buttonStyle' | 'buttonContainerStyle' | 'disabledStyle' | 'disabledTitleStyle' | 'disabledTextStyle' | 'disabledSelectedStyle' | 'disabledSelectedTextStyle' | 'innerBorderStyle'| 'selectedButtonStyle' | 'selectedTextStyle' | 'loadingStyle' | 'dividerStyle' | 'featuredSubtitleStyle' | 'featuredTitleStyle' | 'imageStyle' | 'imageWrapperStyle' | 'wrapperStyle' | 'backgroundImageStyle' | 'leftContainerStyle' | 'centerContainerStyle' | 'rightContainerStyle' | 'barStyle' | 'disabledInputStyle' | 'inputContainerStyle' | 'inputStyle' | 'labelStyle' | 'leftIconContainerStyle' | 'rightIconContainerStyle' | 'contentContainerStyle' | 'rightContentContainerStyle' | 'subtitleStyle' | 'rightTitleStyle' | 'rightSubtitleStyle' | 'overlayStyle' | 'thumbStyle' | 'trackStyle' | 'fontStyle' | 'h1Style' | 'h2Style' | 'h3Style' | 'h4Style' | 'captionStyle' | 'imageContainerStyle' = 'style',
) {
  /**
  * Use Mount (For HOCs Component) => THROW WARNING
  */
  // const wrapper = mount(<Text
  //   margin={10}
  //   marginVertical={10}
  //   marginHorizontal={10}
  //   marginTop={10}
  //   marginBottom={10}
  //   marginLeft={10}
  //   marginRight={10}
  // />);
  // const testStyle = wrapper.findWhere((node) => node.prop('testID') === 'EText')
  // .first().props().style;

  /**
  * Use Shallow (For HOCs Component) => OK
  */
  const component: any = getComponent(node, listOfProps, type);
  const testStyle = component.props()[styleName];
  return testStyle;
}

/**
 *
 * @param node React Native Component
 * @param listOfProps List of Props that you pass into current Component
 * @param type Type of current Component ('single' or 'hoc')
 * @param styleName Name of current style (ex: 'style', 'titleStyle', 'containerStyle')
 */
export function testStyleProps<C extends Component, P = C['props'], S = C['state']>(
  node: ReactElement<P>,
  listOfProps: any,
  type: EnumComponent,
  styleName: 'style' | 'containerStyle' | 'iconStyle' | 'iconContainerStyle' | 'avatarStyle' | 'overlayContainerStyle' | 'placeholderStyle' | 'titleStyle' | 'badgeStyle' | 'textStyle' | 'buttonStyle' | 'buttonContainerStyle' | 'disabledStyle' | 'disabledTitleStyle' | 'disabledTextStyle' | 'disabledSelectedStyle' | 'disabledSelectedTextStyle' | 'innerBorderStyle'| 'selectedButtonStyle' | 'selectedTextStyle' | 'loadingStyle' | 'dividerStyle' | 'featuredSubtitleStyle' | 'featuredTitleStyle' | 'imageStyle' | 'imageWrapperStyle' | 'wrapperStyle' | 'backgroundImageStyle' | 'leftContainerStyle' | 'centerContainerStyle' | 'rightContainerStyle' | 'barStyle' | 'disabledInputStyle' | 'inputContainerStyle' | 'inputStyle' | 'labelStyle' | 'leftIconContainerStyle' | 'rightIconContainerStyle' | 'contentContainerStyle' | 'rightContentContainerStyle' | 'subtitleStyle' | 'rightTitleStyle' | 'rightSubtitleStyle' | 'overlayStyle' | 'thumbStyle' | 'trackStyle' | 'fontStyle' | 'h1Style' | 'h2Style' | 'h3Style' | 'h4Style' | 'captionStyle' | 'imageContainerStyle' = 'style',
  level: number = 1,
) {
  const component: any = getComponent(node, listOfProps, type);
  let testStyle;
  switch (level) {
    case 1:
      testStyle = component.props()[styleName];
      break;
    case 2:
      testStyle = component.props().children.props[styleName];
      break;
    case 3:
      testStyle = component.props().children.props.children.props[styleName];
      break;
    default:
      testStyle = component.props()[styleName];
  }
  for (const [key, value] of Object.entries(testStyle)) {
    if (key in listOfProps) {
      expect(value).toBe(listOfProps[key]);
    }
  }
}

/**
 *
 * @param node React Native Component
 * @param type Type of current Component ('single' or 'hoc')
 * @param level Children level
 */
export function basicTest <C extends Component, P = C['props'], S = C['state']>(
  node: ReactElement<P>,
  type: EnumComponent,
  level: number = 1,
  haveChildren: boolean = true,
  haveStyleProp: boolean = true,
) {
  it('should render without issues', () => {
    const component: any = getComponent(node, {}, type);
    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  if (haveChildren) {
    it('should have text as children', () => {
      const props: any = {
        children: 'Children Text',
      };
      const component: any = getComponent(node, props, type);
      switch (level) {
        case 1:
          expect(component.props().children).toBe('Children Text');
          break;
        case 2:
          expect(component.props().children.props.children).toBe('Children Text');
          break;
        case 3:
          expect(component.props().children.props.children.props.children).toBe('Children Text');
          break;
        default:
          expect(component.props().children).toBe('Children Text');
      }
    });
  }
  if (haveStyleProp) {
    it('should apply style prop', () => {
      const props = {
        style: { color: 'red', fontSize: 30 },
      };
      const testStyle = getStyle(node, props, type);
      const component: any = getComponent(node, props, type);
      switch (level) {
        case 1:
          expect(testStyle).toMatchObject(props.style);
          break;
        case 2:
          expect(component.props().children.props.style).toMatchObject(props.style);
          break;
        case 3:
          expect(component.props().children.props.children.props.style).toMatchObject(props.style);
          break;
        default:
          expect(testStyle).toMatchObject(props.style);
      }
    });
  }
}
