import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class RepoCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      homepage: '',
    }
  }

  saveRepo() {
    addRepo({
      name: this.state.name,
      full_name: `${this.state.username}/${this.state.name}`,
      homepage: this.state.homepage,
    });
  }

  onChangeText(text, field) {
    this.setState({ [field]: text });
  }

  _renderTextInputs() {
    return (
        <View style={styles.inputs}>
          <TextInput
            placeholder={"Name"}
            style={styles.textInput}
            onChangeText={e => this.onChangeText(e, 'name')}
            value={this.state.name}
          />
          <TextInput
            placeholder={"Github username"}
            autoCorrect={false}
            autoCapitalize={false}
            style={styles.textInput}
            onChangeText={e => this.onChangeText(e, 'username')}
            value={this.state.username}
          />
          <TextInput
            placeholder={"Project homepage"}
            autoCorrect={false}
            autoCapitalize={false}
            style={styles.textInput}
            onChangeText={e => this.onChangeText(e, 'homepage')}
            value={this.state.homepage}
          />
        </View>
    );
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.titleText}>Create a repo</Text>
          {this._renderTextInputs()}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.saveRepo.bind(this)}
            underlayColor={'gray'}
          >
            <View><Text style={styles.saveText}>Create</Text></View>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  textInput: {
    backgroundColor: 'white',
    marginTop: 20,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  saveButton: {
    backgroundColor: 'black',
    marginHorizontal: 30,
    marginVertical: 20,
    borderRadius: 5,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center'
  },
  saveText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
  }
})

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addRepo: repo => dispatch(addRepo(repo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoCreate);
