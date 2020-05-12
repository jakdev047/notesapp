import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import SingleUserNote from '../components/SingleUserNote';

const SingleUser = ({notes}) => {
  const {id} = useParams();
  const note = notes.filter(item=>item.userId === id);
  console.log(note);
  return (
    <div>
      <Container>
        <Row>
          {
            note.map(item=>{
              return <SingleUserNote key={item.id} item={item}/>
            })
          }
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notes: state.notes.notes
  }
}

export default connect(mapStateToProps)(SingleUser);