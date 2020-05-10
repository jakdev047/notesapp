import React from 'react';

import { Form,FormGroup,Label,Input, Button, Container } from 'reactstrap';

const Addnotes = () => {
  return (
    <div className="registration-section my-5">
      <Container>
        <h2>Add Notes</h2>
        <Form>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" id="title" placeholder="Title..." />
          </FormGroup>

          <FormGroup>
            <Label for="comment">Comment</Label>
            <Input type="textarea" name="text" id="comment" placeholder="Please Comment here..."/>
          </FormGroup>

          <FormGroup>
            <Button color="primary">Add Note</Button>
          </FormGroup>
          
        </Form>
      </Container>
    </div>
  );
};

export default Addnotes;