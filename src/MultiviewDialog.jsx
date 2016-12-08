import React from 'react';
import { Modal, Button, ButtonToolbar, Grid, Row, Col, Clearfix } from 'react-bootstrap';
import ScatterPlot from './components/SAMPLE-scatter-plot.jsx';
import styles from './css/main.css';
import LineChart from './components/line-chart.jsx';
import BarGraph from './components/bar-graph.jsx';
import BPBarGraph from './components/bp-bar-graph.jsx';
import GenderBars from './components/GenderBars.jsx';
import Rebase from 're-base';
import D3LineChart from './components/d3LineChart.jsx';

var num_records; // test

const plotdim = {
    width: 400,
    height: 300,
    padding: 50
}

export default class MultiviewDialog extends React.Component {
    constructor(props) {
        super(props);

        // bind component class methods inside the constructor
        this.hideModal = this.hideModal.bind(this);
        this.handleMaleHover = this.handleMaleHover.bind(this);
        this.handleFemaleHover = this.handleFemaleHover.bind(this);
        this.handleMaleOut = this.handleMaleOut.bind(this);
        this.handleFemaleOut = this.handleFemaleOut.bind(this);
        this.handleDataBarOut = this.handleDataBarOut.bind(this);
        this.handleDataBarHover = this.handleDataBarHover.bind(this);
        this.handleAgeDetails = this.handleAgeDetails.bind(this);
        this.handleBMIDetails = this.handleBMIDetails.bind(this);
        this.handleBHDetails = this.handleBHDetails.bind(this);
        this.handleBPDetails = this.handleBPDetails.bind(this);
        this.handleMaleClick = this.handleMaleClick.bind(this);
        this.handleFemaleClick = this.handleFemaleClick.bind(this);

        this.state = {
            femaleShowing: false,
            maleShowing: false,
            dataBarHovered: false,
            xHover: -1,
            currentAge: '',
            currentCount: '',
            currentBMI: '',
            currentBMIAge: '',
            currentBH: '',
            currentBHage: '',
            currentBPAge: '',
            currentSYS: '',
            currentDYS: '',
            maleSelected: false,
            femaleSelected: false,

        }
    }

    handleMaleHover(maleShowing) {
        this.setState({
            maleShowing: maleShowing,
        });
    }

    handleFemaleHover(femaleShowing) {
        this.setState({
            femaleShowing: femaleShowing,
        });
    }

    handleMaleOut(maleOut) {
        this.setState({
            maleShowing: !maleOut,
        });
    }

    handleFemaleOut(femaleOut) {
        this.setState({
            femaleShowing: !femaleOut,
        });
    }

    handleDataBarHover(dataBarHovered, x) {
        this.setState({
            dataBarHovered: dataBarHovered,
            xHover: x,
        });
    }

    handleDataBarOut(dataBarOut) {
        this.setState({
            dataBarHovered: !dataBarOut,
            xHover: -1,
        });
    }

    handleAgeDetails(age, count){
        this.setState({
            currentAge: age,
            currentCount: count,
        });
    }

    handleBMIDetails(age, bmi) {
        this.setState({
            currentBMIAge: age,
            currentBMI: bmi,
        });
    }

    handleBHDetails(age, bh) {
        this.setState({
            currentBHAge: age,
            currentBH: bh,
        });
    }

    handleBPDetails(age, bp_sys, bp_dys) {
        this.setState({
            currentBPAge: age,
            currentSYS: bp_sys,
            currentDYS: bp_dys,
        });
    }

    handleMaleClick() {
        if(this.state.maleSelected)
        {
            this.setState({maleSelected: false,});
        }
        else
        {
            this.setState({maleSelected: true,});
        }
    }

    handleFemaleClick() {
        if(this.state.femaleSelected) {
            this.setState({femaleSelected: false});
        }
        else {
            this.setState({femaleSelected: true});
        }
    }

    hideModal() {
        this.props.onHideModal(false, '', this.props.groupName);
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
        return (
                <Modal
                    show={this.props.isDialogActive}
                    onHide={this.hideModal}
                    dialogClassName={styles.largeDialogBox}
                    backdrop={false}
                    keyboard={true}
                    style={this.updateModalWidth()}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">{this.props.groupName}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body bsClass={styles.modalLargeBody}>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={1}>
                                    <h5 className={styles.gray}>Visits</h5>

                                    <br />
                                    <p className={styles.bignumbers}>{this.props.theState.num_records}</p>
                                </Col>

                                <Col md={3}>
                                    <GenderBars maleClass={styles.mbar}
                                                femaleClass={styles.fbar}
                                                maleHover={this.handleMaleHover}
                                                femaleHover={this.handleFemaleHover}
                                                maleOut={this.handleMaleOut}
                                                femaleOut={this.handleFemaleOut}
                                                maleClick={this.handleMaleClick}
                                                femaleClick={this.handleFemaleClick}
                                                maleState={this.state.maleSelected}
                                                femaleState={this.state.femaleSelected}
                                                data={this.props.theState.gender_data} />
                                </Col>

                            </Row>

                            <br />

                            <Row className="show-grid">
                                <Col xs={12} sm={6} md={4} lg={4}>
                                    <h5>Age Distribution</h5>

                                    <h5 className={styles.dataDetails}>Age: {this.state.currentAge}</h5>
                                    <h5 className={styles.dataDetails}>Count: {this.state.currentCount}</h5>

                                    <BarGraph data={this.props.theState.age_nest}
                                              dataBars={styles.dataBars}
                                              allAge={this.props.theState.age_nest}
                                              maleAge={this.props.theState.age_nest_M}
                                              femaleAge={this.props.theState.age_nest_F}
                                              maleShowing={this.state.maleShowing}
                                              femaleShowing={this.state.femaleShowing}
                                              maleState={this.state.maleSelected}
                                              femaleState={this.state.femaleSelected}
                                              onDataBarHover={this.handleDataBarHover}
                                              onDataBarOut={this.handleDataBarOut}
                                              highlightThis={this.state.xHover}
                                              updateDetails={this.handleAgeDetails}
                                              xLabel="Age"
                                              yLabel="Count"
                                              {...plotdim} />

                               </Col>

                               <Col xs={12} sm={6} md={4} lg={4}>
                                   <h5>Average BMI by Age</h5>
                                   <h5 className={styles.dataDetails}>Age: {this.state.currentBMIAge}</h5>
                                   <h5 className={styles.dataDetails}>BMI: {this.state.currentBMI}</h5>

                                   <BarGraph data={this.props.theState.bmi_nest_all}
                                             dataBars={styles.dataBars}
                                             allAge={this.props.theState.bmi_nest_all}
                                             maleAge={this.props.theState.bmi_nest_M}
                                             femaleAge={this.props.theState.bmi_nest_F}
                                             maleShowing={this.state.maleShowing}
                                             femaleShowing={this.state.femaleShowing}
                                             maleState={this.state.maleSelected}
                                             femaleState={this.state.femaleSelected}
                                             onDataBarHover={this.handleDataBarHover}
                                             onDataBarOut={this.handleDataBarOut}
                                             highlightThis={this.state.xHover}
                                             updateDetails={this.handleBMIDetails}
                                             chartType="bmi"
                                             xLabel="Age"
                                             yLabel="kg/m^2"
                                             {...plotdim} />
                               </Col>
                           </Row>

                           <br /><br />

                           <Row className="show-grid">
                               <Col xs={12} sm={6} md={4} lg={4}>
                                   <h5>Average Blood Hemoglobin by Age</h5>
                                   <h5 className={styles.dataDetails}>Age: {this.state.currentBHAge}</h5>
                                   <h5 className={styles.dataDetails}>HB: {this.state.currentBH}</h5>

                                   <BarGraph data={this.props.theState.bh_nest_all}
                                             dataBars={styles.dataBars}
                                             allAge={this.props.theState.bh_nest_all}
                                             maleAge={this.props.theState.bh_nest_M}
                                             femaleAge={this.props.theState.bh_nest_F}
                                             maleShowing={this.state.maleShowing}
                                             femaleShowing={this.state.femaleShowing}
                                             maleState={this.state.maleSelected}
                                             femaleState={this.state.femaleSelected}
                                             onDataBarHover={this.handleDataBarHover}
                                             onDataBarOut={this.handleDataBarOut}
                                             highlightThis={this.state.xHover}
                                             updateDetails={this.handleBHDetails}
                                             chartType="hb"
                                             xLabel="Age"
                                             yLabel="mg/dL"
                                             {...plotdim} />

                               </Col>

                             <Col xs={12} sm={6} md={4} lg={4}>
                                 <h5>Average Blood Pressure by Age</h5>
                                 <h5 className={styles.dataDetails}>Age: {this.state.currentBPAge}</h5>
                                 <h5 className={styles.dataDetails}>SYS: {this.state.currentSYS} &nbsp; &nbsp; DYS: {this.state.currentDYS}</h5>

                                 <BPBarGraph data={this.props.theState.bp_nest_all}
                                             dataBars={styles.dataBars}
                                             allAge={this.props.theState.bp_nest_all}
                                             maleAge={this.props.theState.bp_nest_M}
                                             femaleAge={this.props.theState.bp_nest_F}
                                             maleShowing={this.state.maleShowing}
                                             femaleShowing={this.state.femaleShowing}
                                             maleState={this.state.maleSelected}
                                             femaleState={this.state.femaleSelected}
                                             onDataBarHover={this.handleDataBarHover}
                                             onDataBarOut={this.handleDataBarOut}
                                             highlightThis={this.state.xHover}
                                             updateDetails={this.handleBPDetails}
                                             chartType="bp"
                                             xLabel="Age"
                                             yLabel="mm Hg"
                                             {...plotdim} />
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
