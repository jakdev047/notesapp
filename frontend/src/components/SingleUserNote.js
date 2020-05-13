import React,{useState} from 'react';
import { Col,Card, CardBody,Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import classNames  from 'classnames';

const SingleUserNote = props => {
  const {title,comment} = props.item;
  const {classNames} = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <Col lg={4} sm={6}>
      <Card className="my-3">
        <CardBody>
          <h3>{title}</h3>
          <p>{comment}</p>
          <div>
            <Button onClick={toggle} color="success" style={{marginRight:'10px'}}>Update</Button>
            <Button color="danger">Delete</Button>
          </div>
        </CardBody>


        {/* modal */}
        <Modal isOpen={modal} toggle={toggle} className={classNames}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>

      </Card>
    </Col>
  );
};

export default SingleUserNote;