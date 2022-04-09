import {
  Body,
  Button,
  Container,
  FlatList,
  Header,
  QuickView,
  Text,
} from '@components';
import React, { PureComponent } from 'react';
import { TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { profileGetListSkill } from '../../redux/slice';

interface Props {
  getListSkill: any;
  listSkill: any;
}
interface State {
  isVisible: boolean;
  value: number;
  indexActive: number;
}

const data: any = [];
class DetailSkillScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
      value: 0,
      indexActive: 0,
    };
  }

  componentDidMount() {
    const { getListSkill } = this.props;
    getListSkill();
  }

  renderSkill = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={{ marginHorizontal: 30, marginVertical: 30 }}
      onPress={() => {
        this.setState({ value: item.exp });
        this.setState({ isVisible: true });
        this.setState({ indexActive: item.index });
      }}
    >
      <FastImage
        source={{ uri: item.icon }}
        style={{ width: 60, height: 60 }}
      />
      <Text center marginTop={5} numberOfLines={2} style={{ width: 80 }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const { listSkill } = this.props;
    if (listSkill.metadata) {
      listSkill.metadata.map((skill: any, index: any) => {
        data.push({ ...skill, exp: 0, index });
      });
    }
    const { isVisible, value } = this.state;
    const toggleOverlay = () => {
      this.setState({ isVisible: !isVisible });
    };
    const { indexActive } = this.state;
    return (
      <Container>
        <Header backgroundColor="#1f4780" />
        <Body>
          <ScrollView>
            <QuickView>
              <FlatList
                data={data}
                renderItem={this.renderSkill}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              />

              <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
                <QuickView width={300} height={450} backgroundColor="#fff">
                  <QuickView
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <QuickView position="absolute">
                      <Text color="#000">{value}</Text>
                    </QuickView>
                    {data.length > 0 ? (
                      <CircleSlider
                        value={data[indexActive]?.exp}
                        btnRadius={10}
                        dialRadius={60}
                        onValueChange={(x) => {
                          if (x % 24 === 0) {
                            this.setState({ value: x / 24 });
                            data[indexActive].exp = x;
                          }
                          return x;
                        }}
                      />
                    ) : (
                      <></>
                    )}
                    <QuickView>
                      <Button title="Complete" center />
                    </QuickView>
                  </QuickView>
                </QuickView>
              </Overlay>
            </QuickView>
          </ScrollView>
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  listSkill: state.profile.toJS().LIST_SKILL,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListSkill: () => dispatch(profileGetListSkill({})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailSkillScreen as any);
