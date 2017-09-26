import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const truncateString = str => {
  if (!str) return '';
  if (str.length >= 50) {
    return `${str.slice(0, 50)}...`;
  }
  return str;
};

export default RepoListItem = ({ item }) => (
    <TouchableOpacity onPress={() => Actions.repoDetail({ item })}>
      <View style={styles.container}>
        <Text style={styles.fullName}>{item.full_name}</Text>
        <Text style={styles.description}>{truncateString(item.description)}</Text>

        <View style={styles.glance}>
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

          {item.language ? (
              <View style={styles.language}>
                <Text style={styles.languageText}>{item.language}</Text>
              </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fullName: {
    fontWeight: 'bold',
  },
  description: {
    color: '#d2d2d2',
  },
  metrics: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  metric: {
    marginRight: 10,
  },
  metricTitle: {
    textAlign: 'center',
  },
  metricText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  glance: {
    flex: 1,
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
});
