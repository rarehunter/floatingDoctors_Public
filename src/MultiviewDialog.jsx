import React from 'react';
import { Modal, Button, ButtonToolbar, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import ScatterPlot from './components/SAMPLE-scatter-plot.jsx';
import styles from './css/main.css';
import LineChart from './components/line-chart.jsx';
import BarGraph from './components/bar-graph.jsx';
import GenderBars from './components/GenderBars.jsx';
import Rebase from 're-base';
import D3LineChart from './components/d3LineChart.jsx';

var num_records; // test

const plotdim = {
    width: 300,
    height: 200,
    padding: 30
}

export default class MultiviewDialog extends React.Component {
    constructor(props) {
        super(props);

        // bind component class methods inside the constructor
        this.hideModal = this.hideModal.bind(this);

        // var recordCount = d3.rollup(function(s) {
        //     return d3.sum(s, function(d) { return d.sales });
        // };

        this.state = {
            // genderData: [[props.theState.num_males, props.theState.num_females]],
            ageData: [
                        [[50,60],[80,35],[100,40],[120,10],[150,100]],
                        [[10,50],[50,120],[90,100],[110,60],[130,60]],
                        [[30,70],[40,80],[50,90],[70,25],[160,40]]
                    ],

            // genderData: [[87,57]],
            bmiData: [[10,25],[15,14],[20,30],[25,41],[30,65],[35,85],[40,45]],
            bpData: [[10,63],[15,85],[20,53],[25,78],[30,30],[35, 13],[40,23]],
            bhData: [[10,98],[15,54],[20,23],[25,43],[30,5],[35,12],[40,67]]
        };

    }

    // componentDidMount() {
    //     base.fetch('community', {
    //         context: this,
    //         asArray: false,
    //         queries: {
    //         }
    //     }).then(data => {
    //         prrecords = (Object.keys(data.AGUACATE).length);
    //     });
    //
    // }

    hideModal() {
        this.props.onHideModal(false, '');
    }

    render() {
        return (
                <Modal
                    show={this.props.isDialogActive}
                    onHide={this.hideModal}
                    dialogClassName={styles.largeDialogBox}
                    backdrop={false}
                    keyboard={true}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{this.props.community}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body bsClass={styles.modalLargeBody}>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={1}>
                                    <h5 className={styles.gray}>Records</h5>

                                    <br />
                                    <p className={styles.bignumbers}>{this.props.theState.num_records}</p>
                                </Col>

                                <Col md={2}>
                                    <GenderBars data={this.props.theState.gender_data} />
                                </Col>

                                <Col md={2} mdOffset={2}>
                                    <h6 className={styles.gray + ' ' + styles.textRight}>Jan 2015-Dec 2015</h6>
                                </Col>
                            </Row>

                            <br />

                            <Row className="show-grid">
                                <Col xs={12} sm={6} md={4} lg={4}>
                                    <h5>Age Distribution</h5>
                                    <D3LineChart data={this.props.theState.age_nest}
                                                 allAge={this.props.theState.age_nest}
                                                 maleAge={this.props.theState.age_nest_M}
                                                 femaleAge={this.props.theState.age_nest_F}
                                                 {...plotdim} />
                               </Col>

                               <Col xs={12} sm={6} md={4} lg={4}>
                                   <h5>BMI Distribution</h5>
                                   <LineChart data={this.state.ageData} {...plotdim} />

                               </Col>
                           </Row>

                           <br /><br />

                           <Row className="show-grid">
                               <Col xs={12} sm={6} md={4} lg={4}>
                                   <h5>Blood Hemoglobin Distribution</h5>
                                   <LineChart data={this.state.ageData} {...plotdim} />
                               </Col>

                             <Col xs={12} sm={6} md={4} lg={4}>
                                 <h5>Blood Pressure Distribution</h5>
                                 <LineChart data={this.state.ageData} {...plotdim} />

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
