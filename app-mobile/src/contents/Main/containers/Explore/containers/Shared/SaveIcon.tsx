/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

interface Props {}
interface State {
  save : boolean;
}
class SaveIcon extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      save: false,
    };
  }

  render() {
    const { save } = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.setState({ save: !save })}
      >
        {save ? <Icon name="bookmark" type="material-community" color="#ffffff" /> : <Icon name="bookmark-outline" type="material-community" color="#ffffff" />}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state:any) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SaveIcon);
