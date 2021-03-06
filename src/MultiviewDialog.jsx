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
import {MdClose} from 'react-icons/lib/md';

var num_records; // test

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
        this.checkInfoState = this.checkInfoState.bind(this);

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
        this.props.onHideModal(false, '', this.props.type, false);
    }

    updateModalWidth()
    {
        var style = {
            width: parseInt(this.props.paneCenterWidth),
            margin: "auto"
        };
        return style;
    }

    checkInfoState(data) {
        let classy = "";
        if (data === '') {
            classy = `${styles.chartInfo} ${styles.hide}`;
        } else {
            classy = `${styles.chartInfo}`;
        }
        return classy;
    }
    render() {
        const chartWidth = (this.props.paneCenterWidth - 32*3)/ 2;
        const plotdim = {
            width: chartWidth,
            height: 240,
            padding: 24
        }
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

                        <Row className="show-grid">
                            <Col md={2}>
                                <p className={styles.bignumbers}>{this.props.theState.num_records}</p>
                                <p className={styles.gray}>Records</p>
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



                        <Row className="show-grid">
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <h5>Age Distribution</h5>
                                <div className={this.checkInfoState(this.state.currentAge)}>
                                    <h5 className={styles.dataDetails}>Age: {this.state.currentAge}</h5>
                                    <h5 className={styles.dataDetails}>Count: {this.state.currentCount}</h5>
                                </div>


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

                           <Col xs={12} sm={6} md={6} lg={6}>
                               <h5>Average BMI by Age</h5>
                               <div className={this.checkInfoState(this.state.currentBMIAge)}>
                                    <h5 className={styles.dataDetails}>Age: {this.state.currentBMIAge}</h5>
                                    <h5 className={styles.dataDetails}>BMI: {this.state.currentBMI}</h5>
                                </div>

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
                                         chartType1="bmi"
                                         chartType2="empty"
                                         xLabel="Age"
                                         yLabel="kg/m^2"
                                         {...plotdim} />
                           </Col>
                       </Row>


                       <Row className="show-grid">
                           <Col xs={12} sm={6} md={6} lg={6}>
                               <h5>Average Blood Hemoglobin by Age</h5>

                               <div className={this.checkInfoState(this.state.currentBH)}>
                                    <h5 className={styles.dataDetails}>Age: {this.state.currentBHAge}</h5>
                                    <h5 className={styles.dataDetails}>HB: {this.state.currentBH}</h5>
                                </div>
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
                                         chartType1="hb-male"
                                         chartType2="hb-female"
                                         xLabel="Age"
                                         yLabel="mg/dL"
                                         {...plotdim} />

                           </Col>

                         <Col xs={12} sm={6} md={6} lg={6}>
                             <h5>Average Blood Pressure by Age</h5>
                             <div className={this.checkInfoState(this.state.currentBPAge)}>
                                    <h5 className={styles.dataDetails}>Age: {this.state.currentBPAge}</h5>
                                    <h5 className={styles.dataDetails}>SYS: {this.state.currentSYS}</h5>
                                     <h5 className={styles.dataDetails}>DYS: {this.state.currentDYS}</h5>
                                </div>
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
                                         chartType1="bp-sys"
                                         chartType2="bp-dys"
                                         xLabel="Age"
                                         yLabel="mm Hg"
                                         {...plotdim} />
                         </Col>
                       </Row>

                    </Modal.Body>

                    <Modal.Footer bsClass=''>
                        <Button bsClass={styles.modalFab} onClick={this.hideModal}><MdClose /></Button>
                    </Modal.Footer>

                </Modal>
        ); // end return statement

    } // end render function
} // end export default
