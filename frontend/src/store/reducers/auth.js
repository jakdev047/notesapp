import { SIGN_UP_SUCCESS, SIGN_UP_FAIL } from "../actions/types";

const init = {
  token: localStorage.getItem('token'), // to check token on ls in browser
  isLoading: true,
  isAuthenticated: null,
  user: null
}

const reducers = (state=init,action) => {
  const {type,payload} = action;
  switch (type) {
    case SIGN_UP_SUCCESS:
      localStorage.setItem('token',payload);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false
      };
    
    case SIGN_UP_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        user: null
      };

    default:
      return state;
  }
};

export default reducers;