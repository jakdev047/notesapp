import React from 'react';
import { Spinner, Container } from 'reactstrap';

const CustomSpinner = () => {
  return (
    <Container className="my-5 text-center">
      <Spinner color="danger"/>
    </Container>
  );
};

export default CustomSpinner;