import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

export default class FDModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};

        // bind component class methods inside the constructor
        // binding inside constructor is better than binding inside render for performance sake
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({show: true});
    }

    hideModal() {
        this.setState({show: false});
    }

    render() {
      return (
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.showModal}>
            Launch demo modal
          </Button>

          <Modal
            {...this.props}
            show={this.state.show}
            onHide={this.hideModal}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Wrapped Text</h4>
              <p>Blah</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.hideModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>
        );
    } // end render function

} // end export default
