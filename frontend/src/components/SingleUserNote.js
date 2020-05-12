import React from 'react';
import { Col,Card, CardBody,Button } from 'reactstrap';

const SingleUserNote = props => {
  const {title,comment} = props.item;
  return (
    <Col lg={4} sm={6}>
      <Card className="my-3">
        <CardBody>
          <h3>{title}</h3>
          <p>{comment}</p>
          <div className="">
            <Button color="success" style={{marginRight:'10px'}}>Update</Button>
            <Button color="danger">Delete</Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SingleUserNote;