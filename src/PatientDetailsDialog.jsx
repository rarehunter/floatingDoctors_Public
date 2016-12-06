import React from 'react';
import { Modal, Button, ButtonToolbar, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import styles from './css/main.css';


export default class PatientDetailsDialog extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {show: false};

        // bind component class methods inside the constructor
        // binding inside constructor is better than binding inside render for performance sake
        // this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    hideModal() {
        this.props.onHideModal(false, '');
    }

    render() {
        console.log(this.props);
        var record = this.props.patient;

        return (
                
                <Modal
                    {...this.props}
                    show={this.props.isDialogActive}
                    onHide={this.hideModal}
                    dialogClassName={styles.smallDialogBox}
                    backdrop={false}
                    keyboard={true}
                >

                    <Modal.Header bsClass={styles.modalTitle}>
                        <Modal.Title id="contained-modal-title-md"> {record.name} </Modal.Title>
                    </Modal.Header>

                    <Modal.Body bsClass={styles.modalSmallBody}>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={3}>
                                    <h6 className={styles.gray}> {record.consultLocation} | {record.consultTime}</h6>
                                </Col>
                            </Row>

                            <Row className="show-grid">
                                <Col md={1}>
                                    <h6 className={styles.black}>Gender</h6>
                                    <h6 className={styles.black}>DOB</h6>
                                    <h6 className={styles.black}>Height</h6>
                                    <h6 className={styles.black}>Weight (kg)</h6>
                                </Col>

                                <Col md={2}>
                                    <h6 className={styles.gray}>{record.gender}</h6>
                                    <h6 className={styles.gray}>05/01/1987</h6>
                                    <h6 className={styles.gray}>{record.height}</h6>
                                    <h6 className={styles.gray}>{record.weight}</h6>
                                </Col>

                                <Col md={1}>
                                    <h6 className={styles.black}>BP</h6>
                                    <h6 className={styles.black}>HR</h6>
                                    <h6 className={styles.black}>RR</h6>
                                    <h6 className={styles.black}>Temp (C)</h6>
                                </Col>

                                <Col md={2}>
                                    <h6 className={styles.gray}>{record.BP_DYS}</h6>
                                    <h6 className={styles.gray}>{record.heartRate}</h6>
                                    <h6 className={styles.gray}>{record.respirationRate}</h6>
                                    <h6 className={styles.gray}>{record.temperature}</h6>
                                </Col>


                            </Row>
                         </Grid>
                    </Modal.Body>

                    <Modal.Footer bsClass=''>
                        <Button bsClass={styles.modalFab} onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>

                </Modal>


        ); // end return statement

    } // end render function

} // end export default
