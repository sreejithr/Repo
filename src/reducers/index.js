import { combineReducers } from 'redux';
import { ADD_REPOS, ADD_REPO } from '../actions';

const repos = (state=[], action) => {
  switch (action.type) {
  case ADD_REPOS:
    return state.concat(action.repos);
  case ADD_REPO:
    return [...state, action.repo];
  default:
    return state;
  }
}

export default combineReducers({ repos });
