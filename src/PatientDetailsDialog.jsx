import React from 'react';
import { Modal, Button, ButtonToolbar, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import styles from './css/main.css';
import {toTitleCase} from './Helper.jsx';



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
        this.props.onHideModal(false, this.props.patient, 0);
    }

    updateModalWidth()
    {
        var style = {
            width: parseInt(this.props.paneCenterWidth),
            margin: "auto"
        };
        return style;
    }

    render() {
        var record = this.props.patient;
        var name = "-";
        var consultDate = "-";
        var consultLocation = "-";
        var gender = "-";
        var DOB = "-";
        var height = "-";
        var weight = "-";
        var BP = "-";
        var HR = "-";
        var RR = "-";
        var temp = "-";

        if(record.name) { name = toTitleCase(record.name); }
        if(record.consultLocation) { consultLocation = toTitleCase(record.consultLocation); }
        if(record.consultTime)
        {
            consultDate = new Date(record.consultTime);
            consultDate = consultDate.toLocaleDateString("en-US");
        }
        if(record.gender) { gender = record.gender; }
        if(record.DOB)
        {
            DOB = new Date(record.DOB);
            DOB= DOB.toLocaleDateString("en-US");
        }
        if(record.height) { height = record.height; }
        if(record.weight) { weight = record.weight; }
        if(record.BP_DYS) { BP = record.BP_DYS; }
        if(record.heartRate) { HR = record.heartRate; }
        if(record.respirationRate) { temp = record.respirationRate; }

        return (
                
                <Modal
                    {...this.props}
                    show={this.props.isDialogActive}
                    onHide={this.hideModal}
                    dialogClassName={styles.smallDialogBox}
                    backdrop={false}
                    keyboard={true}
                    style={this.updateModalWidth()}
                >

                    <Modal.Header bsClass={styles.modalTitle}>
                        <Modal.Title id="contained-modal-title-md"> {name} </Modal.Title>
                    </Modal.Header>

                    <Modal.Body bsClass={styles.modalSmallBody}>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={3}>
                                    <h6 className={styles.gray}> {consultLocation} | {consultDate}</h6>
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
                                    <h6 className={styles.gray}>{gender}</h6>
                                    <h6 className={styles.gray}>{DOB}</h6>
                                    <h6 className={styles.gray}>{height}</h6>
                                    <h6 className={styles.gray}>{weight}</h6>
                                </Col>

                                <Col md={1}>
                                    <h6 className={styles.black}>BP</h6>
                                    <h6 className={styles.black}>HR</h6>
                                    <h6 className={styles.black}>RR</h6>
                                    <h6 className={styles.black}>Temp (C)</h6>
                                </Col>

                                <Col md={2}>
                                    <h6 className={styles.gray}>{BP}</h6>
                                    <h6 className={styles.gray}>{HR}</h6>
                                    <h6 className={styles.gray}>{RR}</h6>
                                    <h6 className={styles.gray}>{temp}</h6>
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
