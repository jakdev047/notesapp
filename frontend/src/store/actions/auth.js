import { SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import axios from 'axios';

export const signup = ({firstName,lastName,email,password,confirmPassword}) => async(dispatch) => {

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({firstName,lastName,email,password,confirmPassword});

  try {

    const response = await axios.post('/users',body,config);

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: response.data.token
    })
  } 

  catch (error) {
    console.log(error);
    dispatch({
      type: SIGN_UP_FAIL
    })
  }
}

export const login = ({email,password}) => async(dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  const body = JSON.stringify({email,password});

  try {
    const response = await axios.post('/users/login',body,config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.token
    })
  } 

  catch (error) {
    console.log(error);
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

export const logout = () => async(dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    await axios.post('/users/logout',config);

    dispatch({
      type: LOGIN_SUCCESS
    })
  } 
  catch (error) {
    console.log(error);
  }
}