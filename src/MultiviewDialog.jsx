import React from 'react';
import { Modal, Button, ButtonToolbar, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import ScatterPlot from './components/SAMPLE-scatter-plot.jsx';
import styles from './css/main.css';
import LineChart from './components/line-chart.jsx';
import BarGraph from './components/bar-graph.jsx';
import Rebase from 're-base';

var prrecords;

var base = Rebase.createClass({
    apiKey: "AIzaSyC7kqijvE-MYFjuvJarGXs8AC06zq0PFEo",
    authDomain: "floatdocadmin.firebaseapp.com",
    databaseURL: "https://floatdocadmin.firebaseio.com",
    storageBucket: "floatdocadmin.appspot.com",
    messagingSenderId: "487269857429"
});

const plotdim = {
    width: 300,
    height: 200,
    padding: 30,
}



export default class MultiviewDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};

        // bind component class methods inside the constructor
        // binding inside constructor is better than binding inside render for performance sake
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.state = {data: [[50,60],[80,200],[100,40],[120,10],[200,100]] };
    }

    componentDidMount() {
        console.log("Did mount");
        base.fetch('community', {
            context: this,
            asArray: false,
            queries: {
            }
        }).then(data => {
            prrecords = (Object.keys(data.AGUACATE).length);

        });
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
                <Button bsStyle="info" bsSize="xsmall" onClick={this.showModal}>
                    Some Community
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName={styles.largeDialogBox}
                    backdrop={false}
                    keyboard={true}
                >

                    <Modal.Header bsClass={styles.modalTitle}>
                        <Modal.Title id="contained-modal-title-lg">Community Name Here</Modal.Title>
                    </Modal.Header>

                    <Modal.Body bsClass={styles.modalLargeBody}>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={2}>
                                    <h5 className={styles.gray}>Records</h5>
                                    <p className={styles.bignumbers}>{prrecords}</p>
                                </Col>

                                <Col md={2}>
                                    <h5 className={styles.gray}>Patients</h5>
                                    <p className={styles.bignumbers}>125</p>

                                </Col>

                                <Col md={2} mdOffset={6}>
                                    <h6 className={styles.gray + ' ' + styles.textRight}>Jan 2015-Dec 2015</h6>
                                </Col>
                            </Row>

                            <br />

                            <Row className="show-grid">
                                <Col xs={12} sm={6} md={4} lg={4}>
                                    <h5>Age Distribution</h5>
                                    <LineChart {...this.state} {...plotdim} />
                               </Col>

                               <Col xs={12} sm={6} md={4} lg={4}>
                                   <h5>Height Distribution</h5>
                                   <ScatterPlot {...this.state} {...plotdim} />
                               </Col>

                               <Col xs={12} sm={6} md={4} lg={4}>
                                   <h5>Weight Distribution</h5>
                                   <BarGraph {...this.state} {...plotdim} />
                               </Col>
                           </Row>

                           <Row className="show-grid">
                               <Col xs={12} sm={6} md={4} lg={4}>
                                   <h5>Blood Pressure Distribution</h5>
                                   <ScatterPlot {...this.state} {...plotdim} />
                               </Col>

                             <Col xs={12} sm={6} md={4} lg={4}>
                                 <h5>Body Mass Index (BMI) Distribution</h5>
                                 <ScatterPlot {...this.state} {...plotdim} />
                             </Col>

                             <Col xs={12} sm={6} md={4} lg={4}>
                                 <h5>Blood Hemoglobin Distribution</h5>
                                 <ScatterPlot {...this.state} {...plotdim} />
                             </Col>
                           </Row>

                         </Grid>

                    </Modal.Body>

                    <Modal.Footer bsClass=''>
                        <Button bsClass={styles.modalFab} onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </ButtonToolbar>

        ); // end return statement

    } // end render function

} // end export default
