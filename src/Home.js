import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { addRepos } from './actions';
import RepoListItem from './RepoListItem';

class Repos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networkLoading: false,
    };
  }

  componentWillMount() {
    if (this.props.repos.length === 0) {
      this.fetchRepos();
    }
  }

  async fetchRepos() {
    this.setState({ networkLoading: true });
    try {
      const r = await fetch("https://api.github.com/users/mralexgray/repos");
      if (r.status === 200) {
        const repos = JSON.parse(await r.text());
        this.props.addRepos(repos);
      }
    } catch(e) {
      this.setState({ networkLoading: false });
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <FlatList
            data={this.props.repos}
            renderItem={RepoListItem}
          />
          <TouchableOpacity
            style={styles.addButton}
            underlayColor={'gray'}
            onPress={() => Actions.createRepo()}
          >
            <View>
              <Text style={styles.plusText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: 26,
    color: 'white',
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    repos: state.repos,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addRepos: repos => dispatch(addRepos(repos)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Repos)
