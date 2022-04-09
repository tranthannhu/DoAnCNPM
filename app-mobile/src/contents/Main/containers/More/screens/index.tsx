import React from 'react';
import { View, StyleSheet, SectionList } from 'react-native';
import {
  Container,
  Header,
  QuickView,
  AuthButton,
  GoToExampleButton,
  Text,
} from '@components';
import { ListItem, Divider } from 'react-native-elements';
import { withTranslation } from 'react-i18next';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import PickerChangeLanguage from '@contents/Config/Shared/PickerChangeLanguage';
import LogoutButton from '@contents/Auth/containers/Index/Login/Shared/LogoutButton';
import LoginButton from '@contents/Auth/containers/Index/Login/Shared/LoginButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '@utils/navigation';
import moreStack from '../routes';
// import NavigationService from '@utils/navigation';

const BLUE = '#007AFF';
const GREY = '#8E8E93';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFF4',
  },
  separatorComponent: {
    backgroundColor: 'white',
  },
  separator: {
    marginLeft: 58,
  },
  headerSection: {
    height: 30,
  },
});

interface Props {
  t: any;
}

class Settings extends React.PureComponent<Props> {
  renderItem = ({
    item: {
      title,
      backgroundColor,
      icon,
      rightTitle,
      hideChevron,
      rightElement,
    },
  }: any) => (
    <ListItem
      containerStyle={{ paddingVertical: 8 }}
      key={title}
      chevron={!hideChevron}
      rightTitle={rightTitle}
      leftIcon={{
        type: 'ionicon',
        name: icon,
        size: 20,
        color: 'white',
        containerStyle: {
          backgroundColor,
          width: 28,
          height: 28,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      title={title}
      rightElement={rightElement}
    />
  );

  renderSectionHeader = () => <View style={styles.headerSection} />;

  ItemSeparatorComponent = () => (
    <View style={styles.separatorComponent}>
      <Divider style={styles.separator} />
    </View>
  );

  keyExtractor = (item: any, index: any) => index;

  render() {
    const { t } = this.props;
    const sections = [
      {
        data: [
          {
            title: t('theme'),
            backgroundColor: BLUE,
            icon: 'ios-bulb',
            hideChevron: true,
            rightElement: <SwitchChangeTheme />,
          },
          {
            title: t('language'),
            icon: 'ios-settings',
            backgroundColor: GREY,
            hideChevron: true,
            rightElement: <PickerChangeLanguage />,
          },
        ],
      },
    ];

    return (
      <Container>
        <Header title={t('header:setting')} />
        <QuickView height={120}>
          <SectionList
            contentContainerStyle={{ marginTop: -30 }}
            keyExtractor={this.keyExtractor}
            sections={sections}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
            SectionSeparatorComponent={Divider}
            stickySectionHeadersEnabled={false}
          />
        </QuickView>
        <QuickView paddingHorizontal={10}>
          <GoToExampleButton />
          <LoginButton />
          <LogoutButton />
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate(moreStack.mapScreen);
            }}
          >
            <Text>click</Text>
          </TouchableOpacity>
        </QuickView>
        <QuickView paddingHorizontal={10}>
          <AuthButton
            t="auth:login"
            // onPress={() => NavigationService.navigate(rootStack.authStack)}
          />
        </QuickView>
      </Container>
    );
  }
}
export default withTranslation()(Settings as any);
