import React from 'react';
import { Form,FormGroup,Label,Input, Button, Container } from 'reactstrap';

const Registration = () => {
  return (
    <div className="registration-section my-5">
      <Container>
        <h2>Registration User</h2>
        <Form>
          <FormGroup>
            <Label for="firstname">Firstname</Label>
            <Input type="text" name="firstname" id="firstname" placeholder="First Name..." />
          </FormGroup>

          <FormGroup>
            <Label for="lastname">Last Name</Label>
            <Input type="text" name="lastname" id="lastname" placeholder="Last Name..." />
          </FormGroup>
          
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email..." />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="text" name="password" id="password" placeholder="Password..." />
          </FormGroup>

          <FormGroup>
            <Label for="confirmpassword">Confirm Password</Label>
            <Input type="text" name="confirmpassword" id="confirmpassword" placeholder="Confirm Password..." />
          </FormGroup>

          <FormGroup>
            <Button color="primary">Submit</Button>
          </FormGroup>
          
        </Form>
      </Container>
    </div>
  );
};

export default Registration;