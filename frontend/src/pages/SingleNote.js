import React from 'react';
import { useParams } from 'react-router-dom';
import { Container,Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux';


const SingleNote = ({notes}) => {
  const {id} = useParams();
  const note = notes.find(note=>note.id === parseInt(id));
  return (
    <div>
      <Container>
        <Card className="my-3">
          <CardBody>
            <h3>{note.title}</h3>
            <p>{note.comment}</p>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.notes.notes
  }
}

export default connect(mapStateToProps)(SingleNote);