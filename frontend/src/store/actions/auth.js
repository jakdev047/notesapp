import { SIGN_UP_SUCCESS, SIGN_UP_FAIL } from './types';
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

    console.log(response.data.token)

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