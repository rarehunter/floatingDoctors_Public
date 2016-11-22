import React from 'react';
import { Modal, Button, ButtonToolbar, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import styles from './css/main.css';


export default class PatientDetailsDialog extends React.Component {
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
                <Button bsStyle="success" bsSize="xsmall" onClick={this.showModal}>
                    Some Patient
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName={styles.smallDialogBox}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-md">Patient Name </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Grid>

                            <Row className="show-grid">
                                <Col md={3}>
                                    <h6 className={styles.gray}>#PatientID | Community | 02/08/2015</h6>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col md={1}>
                                    <h6 className={styles.gray}>Gender</h6>
                                    <h6 className={styles.gray}>DOB</h6>
                                    <h6 className={styles.gray}>Height (cm)</h6>
                                    <h6 className={styles.gray}>Weight (kg)</h6>
                                </Col>

                                <Col md={1}>
                                    <h6 className={styles.black}>Male</h6>
                                    <h6 className={styles.black}>05/01/1987</h6>
                                    <h6 className={styles.black}>178</h6>
                                    <h6 className={styles.black}>70</h6>
                                </Col>

                                <Col md={1}>
                                    <h6 className={styles.gray}>BP</h6>
                                    <h6 className={styles.gray}>HR</h6>
                                    <h6 className={styles.gray}>RR</h6>
                                    <h6 className={styles.gray}>Temp (C)</h6>
                                </Col>

                                <Col md={1}>
                                    <h6 className={styles.black}>120/70</h6>
                                    <h6 className={styles.black}>52</h6>
                                    <h6 className={styles.black}>72</h6>
                                    <h6 className={styles.black}>37.1</h6>
                                </Col>


                            </Row>
                         </Grid>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </ButtonToolbar>

        ); // end return statement

    } // end render function

} // end export default
