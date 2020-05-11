import React from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const Note = props => {
  const {title,comment} = props.note
  return (
    <Col lg={4} sm={6} xs={12} className="my-3">
      <Card>
        <CardBody>
          <h3>
            <Link to="/">{title}</Link>
            <p>{comment}</p>
          </h3>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Note;