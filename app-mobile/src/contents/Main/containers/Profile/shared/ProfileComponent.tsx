import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { QuickView, Text } from '@components';
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  informationCard: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export class ProfileComponent extends PureComponent {
  render() {
    return (
      <QuickView style={styles.informationCard} marginTop={10}>
        <QuickView marginTop={10}>
          <QuickView row marginBottom={10} justifyContent="space-between">
            <Text color="#2c3236">Experience</Text>
            <Icon name="edit" type="antdesign" size={18} color="#377cab" />
          </QuickView>
          <QuickView row alignItems="center">
            <QuickView
              flex={1}
              backgroundColor="#9e9991"
              paddingTop={10}
              paddingBottom={10}
              borderRadius={5}
            >
              <Icon name="briefcase" type="entypo" size={18} color="#fff" />
            </QuickView>
            <QuickView
              flex={7}
              marginLeft={10}
              style={{ borderLeftWidth: 2, borderColor: '#bfbdb6' }}
              paddingLeft={5}
            >
              <Text color="#2E3137" fontSize={14} fontWeight="bold">
                Founder at Apple INC
              </Text>
              <Text>
                <Icon
                  name="clockcircleo"
                  type="antdesign"
                  size={16}
                  color="#acf7ab"
                />
                <Text color="#377cab">9/2020 - 9/2020</Text>
              </Text>
            </QuickView>
          </QuickView>
          <QuickView>
            <Text center color="#377cab" fontWeight="bold" marginTop={20}>
              SEE ALL
            </Text>
          </QuickView>
        </QuickView>
      </QuickView>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent as any);
