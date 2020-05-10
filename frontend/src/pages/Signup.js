import React from 'react';
import { Form,FormGroup,Label,Input, Button, Container } from 'reactstrap';

const Signup = () => {
  return (
    <div className="registration-section my-5">
      <Container>
        <h2>Login User</h2>
        <Form>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email..." />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="text" name="password" id="password" placeholder="Password..." />
          </FormGroup>

          <FormGroup>
            <Button color="primary">Login</Button>
          </FormGroup>
          
        </Form>
      </Container>
    </div>
  );
};

export default Signup;