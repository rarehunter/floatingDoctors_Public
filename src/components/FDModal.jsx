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
                    Some Community
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Community Name Here</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h4>Some header here</h4>
                        <p>Place stuff here</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </ButtonToolbar>

        ); // end return statement

    } // end render function

} // end export default
