import React,{useState} from 'react';
import { Form,FormGroup,Label,Input, Button, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { signup } from '../store/actions/auth';

const Registration = ({signup}) => {
  // c
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if(firstName === '' && lastName=== '' && email=== '' && password=== '' && confirmPassword=== '') {
      alert("Please Enter fill the form")
    }
    else {
      // const newUser = {firstName,lastName,email,password,confirmPassword}
      console.log({firstName,lastName,email,password,confirmPassword})

      signup({firstName,lastName,email,password,confirmPassword});

      //reset form field
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <div className="registration-section my-5">
      <Container>
        <h2>Registration User</h2>
        <Form onSubmit={ onHandleSubmit }>
          <FormGroup>
            <Label for="firstname">Firstname</Label>
            <Input type="text" name="firstname" id="firstname" placeholder="First Name..." value={firstName} onChange={e=>setFirstName(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for="lastname">Last Name</Label>
            <Input type="text" name="lastname" id="lastname" placeholder="Last Name..."  value={lastName} onChange={e=>setLastName(e.target.value)} />
          </FormGroup>
          
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email..." value={email} onChange={e=>setEmail(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="text" name="password" id="password" placeholder="Password..." value={password} onChange={e=>setPassword(e.target.value)}/>
          </FormGroup>

          <FormGroup>
            <Label for="confirmpassword">Confirm Password</Label>
            <Input type="text" name="confirmpassword" id="confirmpassword" placeholder="Confirm Password..." value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </FormGroup>
          
        </Form>
      </Container>
    </div>
  );
};



export default connect(null,{signup})(Registration);