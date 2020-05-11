import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

const Home = ({notes}) => {
  return (
    <div className="home-section">
      <Container>
        <h2>Home page</h2>
        {console.log(notes)}
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