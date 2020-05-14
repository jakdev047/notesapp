import React,{useState} from 'react';
import { Form,FormGroup,Label,Input, Button, Container } from 'reactstrap';

import {Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../store/actions/auth';

const Login = ({auth,login}) => {
  const {isAuthenticated} = auth;

  // email,password
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if( email=== '' && password=== '') {
      alert("Please Enter fill the form")
    }
    else {
      console.log({email,password});
      login({email,password});

      //reset form field
      setEmail('');
      setPassword('');
    }
  }

  if(isAuthenticated) {
    return <Redirect to='/'/>
  }

  return (
    <div className="registration-section my-5">
      <Container>
        <h2>Login User</h2>
        <Form onSubmit={ onHandleSubmit }>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email..." value={email} onChange={e=>setEmail(e.target.value)}/>
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="text" name="password" id="password" placeholder="Password..." value={password} onChange={e=>setPassword(e.target.value)}/>
          </FormGroup>

          <FormGroup>
            <Button color="primary">Login</Button>
          </FormGroup>
          
        </Form>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps,{login})(Login);