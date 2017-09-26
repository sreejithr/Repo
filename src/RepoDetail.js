import React, { Component } from 'react';
import {
  View,
  Text,
  Linking,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

var moment = require('moment');

const truncateString = (str, len=70) => {
  if (!str) return '';
  if (str.length >= len) {
    return `${str.slice(0, len)}...`;
  }
  return str;
};

export default class RepoDetail extends Component {
  _renderOwner(owner) {
    return (
        <View style={styles.owner}>
          <Image style={styles.userImage} source={{uri: owner.avatar_url}} />
          <Text style={styles.ownerText}>@{owner.login}</Text>
        </View>
    )
  }

  _renderMetrics(item) {
    return (
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <Text style={styles.metricTitle}>Issues</Text>
            <Text style={styles.metricText}>{item.open_issues_count || 0}</Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.metricTitle}>Forks</Text>
            <Text style={styles.metricText}>{item.forks_count || 0}</Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.metricTitle}>Issues</Text>
            <Text style={styles.metricText}>{item.open_issues_count || 0}</Text>
          </View>
        </View>
    );
  }

  formatDate(date) {
    return moment(date).format('do MMM YYYY');
  }

  render() {
    const { item } = this.props;
    const repoLink = truncateString(item.html_url, 35),
          homepage = truncateString(item.homepage, 35);
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.name}</Text>
            {this._renderOwner(item.owner)}
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.created}>
              Created on {this.formatDate(item.created_at)}
            </Text>
          </View>

          <View style={styles.content}>
            {this._renderMetrics(item)}

            <TouchableOpacity onPress={() => Linking.openURL(item.homepage)}>
              <View style={styles.link}>
                <Text style={styles.linkTitle}>Homepage</Text>
                <Text style={styles.linkURL}>{homepage}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(item.html_url)}>
              <View style={styles.link}>
                <Text style={styles.linkTitle}>Repo</Text>
                <Text style={styles.linkURL}>{repoLink}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.link}>
              <Text style={styles.linkTitle}>Default branch</Text>
              <Text style={styles.linkURL}>{item.default_branch}</Text>
            </View>

            <View style={styles.languages}>
              {item.language ? (
                  <View style={styles.language}>
                    <Text style={styles.languageText}>{item.language}</Text>
                  </View>
              ) : null}
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 20,
    shadowOffset: {top: 0, left: 16, height: 42, width: -17},
    shadowColor: 'black',
    shadowRadius: 10,
  },
  header: {
    margin: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  description: {
    marginTop: 10,
  },
  owner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  content: {
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  metric: {
    marginLeft: 10,
    marginRight: 10,
  },
  created: {
    paddingTop: 10,
  },
  metricTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  metricText: {
    textAlign: 'center',
    fontSize: 20,
  },
  link: {
    flexDirection: 'row',
    marginTop: 10,
  },
  linkTitle: {
    color: 'gray',
  },
  linkURL: {
    marginLeft: 10,
  },
  languages: {
    flexDirection: 'row',
  },
  language: {
    borderRadius: 8,
    backgroundColor: 'black',
    paddingVertical: 2,
    paddingHorizontal: 4,
    height: 20,
    marginTop: 20,
  },
  languageText: {
    color: 'white',
  },
})
