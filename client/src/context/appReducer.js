export const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: payload
      }
    case 'SET_LOGIN':
      if (!payload) {
        window.localStorage.removeItem('user');
        return {
          ...state,
          is_login: payload
        }
      }
      return {
        ...state,
        is_login: payload
      }
  }
};