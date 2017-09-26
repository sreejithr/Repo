export const ADD_REPOS = 'ADD_REPOS';
export const ADD_REPO = 'ADD_REPO';

export const addRepos = repos => {
  return {
    type: ADD_REPOS,
    repos,
  };
}

export const addRepo = repo => {
  return {
    type: ADD_REPO,
    repo,
  };
}
