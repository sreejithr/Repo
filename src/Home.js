import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
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
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
