import React from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Note from '../components/Note';

const Home = ({notes}) => {
  return (
    <div className="home-section my-3">
      <Container>
        <Row>
          {
            notes.map(note=>{
              return <Note key={note.id} note={note}/>
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


export default connect(mapStateToProps)(Home);