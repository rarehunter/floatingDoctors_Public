import React from 'react';
import styles from './css/main.css';
import MainViewLayout from './MainViewLayout.jsx';
import LabelGroup from './components/LabelGroup.jsx';
import CommunityLabelGroup from './components/CommunityLabelGroup.jsx';
import MainChart from './components/MainChart.jsx';
import LinkGroup from './components/LinkGroup.jsx';
import LoadingView from './Loading.jsx';
import MultiviewDialog from './MultiviewDialog.jsx';
import PatientDetailsDialog from './PatientDetailsDialog.jsx';
import HeaderPage from './HeaderPage.jsx';
import * as Meta from './Metadata.jsx';
import * as Helper from './Helper.jsx';
import DataManager from './helper/dataManager.jsx';
import {SectionsContainer, Section} from 'react-fullpage';
import * as d3 from 'd3';


const PADDING = 32;
const PANE_SPAN = 12;
const PANE_LEFT_SPAN = 2;
const PANEL_CENTER_SPAN = 8;
const PANEL_RIGHT_SPAN = 2;

// Dummy data
const labelGroupData1 = [
    "Worms",
    "Prolapse",
    "Schizophremia",
    "Prostatitis",
    "Renal Colic"
];


const startTime = Meta.DEFAULT_START_TIME.getTime();
const endTime = Meta.DEFAULT_END_TIME.getTime();
var records;
var visitedDate;
var diagnosisData;
var communityData;
var treatmentData;
var waterSourceData;
var banoData;
var dataManager;


export default class MainView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            activeRecord: '',
            activeLabel: '',
            groupRecords: [],
            num_records: 0,
            gender_data: [[]],
            age_nest: [],
            age_nest_M: [],
            age_nest_F: [],
            bmi_nest_all: [],
            bmi_nest_M: [],
            bmi_nest_F: [],
            bh_nest_all: [],
            bh_nest_M: [],
            bh_nest_F: [],
            bp_nest_all: [],
            bp_nest_M: [],
            bp_nest_F: [],
            multiViewShowing: false,
            groupName: '',
            patientDialogShowing: false,
            patientRecord: '',
            maleShowing: false,
            femaleShowing: false,
            selectedRecord: '',
            selectedLabels: [],
            records: [],
            visitedDate: [],
            communities: [],
            diagnosis: [],
            treatments: [],
            waterSources: [],
            bano: [],
            lines: [],
        };
        this.handleUserClick = this.handleUserClick.bind(this);
        this.handlePatientClick = this.handlePatientClick.bind(this);
        this.handleLabelInteraction = this.handleLabelInteraction.bind(this);
        this.handleRecordInteraction = this.handleRecordInteraction.bind(this);
        this.handleUserHover = this.handleUserHover.bind(this);
    }

    componentWillmount(){
        // console.log("Component will mount");

    }

    componentDidMount() {
        const height = this.state.height - this.props.y;
        dataManager = new DataManager(Meta.DEFAULT_END_TIME);
        var that = this;
        dataManager.getVisits(function(visitedDate){

            dataManager.getVisitedRecords(function(data){
                visitedDate = dataManager.visitedDate;
                records = dataManager.records;
                diagnosisData = dataManager.getDiagnosis();
                communityData = dataManager.communityData;
                treatmentData = dataManager.treatmentData;
                waterSourceData = dataManager.waterSourceData;
                banoData = dataManager.banoData;

                // Change state
                that.setState({
                    records: records,
                    height: height,
                    diagnosis: diagnosisData,
                    communities: communityData,
                    treatments: treatmentData,
                    waterSources: waterSourceData,
                    bano: banoData,
                    visitedDate: visitedDate,
                });

            });
        });
        window.addEventListener("resize", this.updateSize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateSize);
    }

    updateSize() {
        // console.log("Window resized");
        // this.setState({
        //  width: window.innerWidth,
        //  height: window.innerHeight
        // });
    }

    filterRecords(activeLabel) {
        return ((record) =>  {
            if (activeLabel === '') return true;

            let result = '';
            if (activeLabel.type === 'diagnosis') {
                const diagnosis = this.state.diagnosis.find(d => {
                    return d.id === activeLabel.value;
                });

                record.diagnosis && (result = record.diagnosis.find(r => {
                    return r === diagnosis.name;
                }));
            } else if (activeLabel.type === 'treatment') {
                const treatment = this.state.treatments.find(t => {
                    return t.id === activeLabel.value;
                });
                record.treatment && (result = record.treatment.find(r => {
                    return r === treatment.name;
                }));
            } else if (activeLabel.type === 'watersources') {
                const watersource = this.state.waterSources.find(w => {
                    return w.id === activeLabel.value;
                });
                if (record.waterResource === watersource.name) {
                    result = watersource.name;
                }

            } else if (activeLabel.type === 'bano') {
                const bano = this.state.bano.find(b => {
                    return b.id === activeLabel.value;
                });
                if (record.bano === bano.name) {
                    result = bano.name;
                }
            } else if (activeLabel.type === 'community') {

                const community = this.state.communities.find(c => {
                    return c.id === activeLabel.value;
                });
                // console.log(community.name);
                if (record.consultLocation === community.full_name) {
                    result = community.name;
                }
            }
            if (result === '' || result === undefined) {
                return false;
            } else {
                return true;
            }
        });
    }

    // update visitedDates
    updateVisitedDates(updatedRecords, state) {
        var records_keys = updatedRecords.slice().map(r => {
            return r.key;
        });

        var dateRecords = this.state.visitedDate.slice();

        // update state for all visited date record
        for(var i = 0; i < dateRecords.length; i++)
        {
            for (var j = 0; j < dateRecords[i].value.length; j++)
            {
                if(records_keys.indexOf(dateRecords[i].value[j].key) != -1)
                {
                    dateRecords[i].value[j].state = state;
                }
            }
        }

        // update record state
        this.setState({
            visitedDate: dateRecords
        });
    }

    updateCommunities(updatedRecords, state) {
        // console.log(updatedRecords.length);
        const communities = this.state.communities.slice();
        communities.map(c => {
            c.count = 0;
            c.state = 0;
        });
        const communityRecords = d3.nest()
            .key(function(d) {return d.consultLocation;})
            .rollup(function(leaf) {return leaf.length;})
            .entries(updatedRecords);

        communityRecords.map(r => {
            communities.map(c => {
                if (c.full_name === r.key) {
                    c.state = state;
                    c.count = r.value;
                }
            })
        });

        // communities.sort((a,b) => {
        //  const countA = a.count;
        //  const countB = b.count;
        //  if (countA < countB) {
        //      return 1;
        //  }
        //  if (countA > countB) {
        //      return -1;
        //  }
        //  return 0;
        // });

        this.setState({
            communities: communities
        });
    }

    updateDiagnosis(updatedRecords, state) {
        // console.log(updatedRecords.length);
        const diagnosis = this.state.diagnosis.slice();
        diagnosis.map(d => {
            d.count = 0;
            d.state = 0;
        });
        const diagnosisRecords = dataManager.getDiagnosis(updatedRecords);
        // console.log(diagnosisRecords);
        diagnosisRecords.map(r => {
            diagnosis.map(d => {
                if (d.name === r.name) {
                    d.state = state;
                    d.count = r.count;
                }
            })
        });

        diagnosis.sort((a,b) => {
            const countA = a.count;
            const countB = b.count;
            if (countA < countB) {
                return 1;
            }
            if (countA > countB) {
                return -1;
            }
            return 0;
        });
        this.setState({
            diagnosis: diagnosis
        });
    }

    updateTreatments(updatedRecords, state) {
        const treatments = this.state.treatments.slice();
        treatments.map(t => {
            t.count = 0;
            t.state = 0;
        });

        const treatmentsRecords = dataManager.getTreatments(updatedRecords);
        treatmentsRecords.map(r => {
            treatments.map(t => {
                if (t.name === r.name) {
                    t.state = state;
                    t.count = r.count;
                }
            })
        });

        treatments.sort((a,b) => {
            const countA = a.count;
            const countB = b.count;
            if (countA < countB) {
                return 1;
            }
            if (countA > countB) {
                return -1;
            }
            return 0;
        });
        this.setState({
            treatments: treatments
        });
    }

    updateWaterSources(updatedRecords, state) {
        const waterSources = this.state.waterSources.slice();
        waterSources.map(w => {
            w.count = 0;
            w.state = 0;
        });

        const waterSourcesRecords = dataManager.getWaterSources(updatedRecords);
        waterSourcesRecords.map(r => {
            waterSources.map(w => {
                if (w.name === r.name) {
                    w.state = state;
                    w.count = r.count;
                }
            })
        });

        waterSources.sort((a,b) => {
            const countA = a.count;
            const countB = b.count;
            if (countA < countB) {
                return 1;
            }
            if (countA > countB) {
                return -1;
            }
            return 0;
        });
        this.setState({
            waterSources: waterSources
        });
    }

    updateBano(updatedRecords, state) {
        const bano = this.state.bano.slice();
        bano.map(b => {
            b.count = 0;
            b.state = 0;
        });

        const banoRecords = dataManager.getbanoData(updatedRecords);
        banoRecords.map(r => {
            bano.map(b => {
                if (b.name === r.name) {
                    b.state = state;
                    b.count = r.count;
                }
            })
        });

        bano.sort((a,b) => {
            const countA = a.count;
            const countB = b.count;
            if (countA < countB) {
                return 1;
            }
            if (countA > countB) {
                return -1;
            }
            return 0;
        });
        this.setState({
            bano: bano
        });
    }

    handleLabelInteraction(type, id, state) {
        let activeLabel = "";
        let toState = 0;
        let toRecordState = 0;
        if (state === 1) {
            activeLabel = {'type':type, 'value':id};
            toState = 2;
            toRecordState = 1;
        }
        if (type === "diagnosis") {
            const diagnosis = this.state.diagnosis.slice();
            const results = diagnosis.map((d, i) => {
                if (d.id === id) {
                    d.state = state;
                }
                return d;
            });
            this.setState({
                diagnosis: results,
                activeLabel: activeLabel
            });
            this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateVisitedDates(this.state.records.filter(this.filterRecords(activeLabel)), toRecordState);
        }
        if (type === "treatment") {
            const treatments = this.state.treatments.slice();
            const results = treatments.map((t, i) => {
                if (t.id === id) {
                    t.state = state;
                }
                return t;
            });
            this.setState({
                treatments: results,
                activeLabel: activeLabel
            });
            this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateVisitedDates(this.state.records.filter(this.filterRecords(activeLabel)), toRecordState);
        }
        if (type === "watersources") {
            const watersources = this.state.waterSources.slice();
            const results = watersources.map((w, i) => {
                if (w.id === id) {
                    w.state = state;
                }
                return w;
            });
            this.setState({
                waterSources: results,
                activeLabel: activeLabel
            });
            this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateVisitedDates(this.state.records.filter(this.filterRecords(activeLabel)), toRecordState);
        }
        if (type === "bano") {
            const bano = this.state.bano.slice();
            const results = bano.map((b, i) => {
                if (b.id === id) {
                    b.state = state;
                }
                return b;
            });
            this.setState({
                bano: results,
                activeLabel: activeLabel
            });
            this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateVisitedDates(this.state.records.filter(this.filterRecords(activeLabel)), toRecordState);
        }
        if (type === "community") {
            const communities = this.state.communities.slice();
            const results = communities.map((c, i) => {
                if (c.id === id) {
                    c.state = state;
                }
                return c;
            });
            this.setState({
                communities: results,
                activeLabel: activeLabel
            });
            // this.updateCommunities(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateDiagnosis(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateTreatments(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateWaterSources(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateBano(this.state.records.filter(this.filterRecords(activeLabel)), toState);
            this.updateVisitedDates(this.state.records.filter(this.filterRecords(activeLabel)), toRecordState);
        }
    }

    handleRecordInteraction(id, state) {
        const records = this.state.records.slice();
        records.map((r) => {
            if (r.id === id) r.state = state;
        });
        this.setState({
            records: records
        });
    }

	// helper function that returns filtered records by parameters
	getFilteredRecords(filterBy, key, community_records) {
		var filtered;
		if(filterBy == "all")
		{
			if (key == "age") //male and female ages
			{
				// Filter out NaN and empty strings for all ages in the records
				filtered = community_records.filter(function(d) {
                    return (!isNaN(d.age) && d.age != "")
                });

				// Then get rid of float ages and make it all integers
				filtered = filtered.map(function(e) {
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

				return filtered;
			}
            else if(key == "bh") // male and female blood hemoglobin
            {
                // Filter out NaN and empty strings for all bmi and age in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.HB) && !isNaN(d.age) && d.HB != "" && d.age != "");
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.HB = Math.round(parseFloat(e.HB));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                return filtered;
            }
            else if(key == "bmi") // male and female bmi
            {
                // Filter out NaN and empty strings for all height, weight, and age in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.height) && !isNaN(d.weight) && !isNaN(d.age) &&
                            d.height != "" && d.weight != "" && d.age != "");
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.height = Math.round(parseFloat(e.height));
                    e.weight = Math.round(parseFloat(e.weight));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                return filtered;
            }
            else if(key == "bp") // male and female bp
            {
                // Filter out NaN and empty strings for blood pressure sys, dys and age in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.age) && d.BP_SYS != "" && d.BP_DYS != "" && d.age != "");
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.BP_SYS = Math.round(parseFloat(e.BP_SYS));
                    e.BP_DYS = Math.round(parseFloat(e.BP_DYS));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                // do one more filter and ensure that systolic Bp is always higher than diastolic
                filtered = community_records.filter(function(d) {
                    return (d.BP_SYS > d.BP_DYS && !isNaN(d.BP_SYS) && !isNaN(d.BP_DYS));
                });

                return filtered;
            }
		}
		else if (filterBy == "M")
		{
			if (key == "age") // male ages
			{
				// Filter out NaN and empty strings for males in the records
				filtered = community_records.filter(function(d) {
                    return (!isNaN(d.age) && d.age != "" && d.gender == "M");
                });

                // Then get rid of floats and make it all integers
				filtered = filtered.map(function(e) {
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

				return filtered;
			}
            else if(key == "bh") // male blood hemoglobin
            {
                // Filter out NaN and empty strings, and non-males for all bmi and age in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.HB) && d.HB != "" && !isNaN(d.age) && d.age != "" && d.gender == "M");
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.HB = Math.round(parseFloat(e.HB));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                return filtered;
            }
            else if(key == "bmi") // male bmi
            {
                // Filter out NaN and empty strings for all height, weight, and age in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.height) && !isNaN(d.weight) && !isNaN(d.age) &&
                            d.height != "" && d.weight != "" && d.age != "" &&
                            d.gender == "M");
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.height = Math.round(parseFloat(e.height));
                    e.weight = Math.round(parseFloat(e.weight));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                return filtered;
            }
            else if(key == "bp") // male bp
            {
                // Filter out NaN and empty strings for blood pressure sys, dys and age in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.age) && d.BP_SYS != "" && d.BP_DYS != "" && d.age != "");
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.BP_SYS = Math.round(parseFloat(e.BP_SYS));
                    e.BP_DYS = Math.round(parseFloat(e.BP_DYS));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                // do one more filter and ensure that systolic Bp is always higher than diastolic
                filtered = community_records.filter(function(d) {
                    return (d.BP_SYS > d.BP_DYS && !isNaN(d.BP_SYS) && !isNaN(d.BP_DYS) && d.gender == "M");
                });

                return filtered;
            }
		}
		else if (filterBy == "F")
		{
			if (key == "age") //female ages
			{
				// Filter out NaN and empty strings for females in the records
				filtered = community_records.filter(function(d) {
                    return (!isNaN(d.age) && d.age != "" && d.gender == "F");
                });

                // Then get rid of floats and make it all integers
				filtered = filtered.map(function(e) {
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

				return filtered;
			}
            else if(key == "bh") //female blood hemoglobin
            {
                // Filter out NaN and empty strings for all bmi in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.HB) && d.HB != "" && !isNaN(d.age) && d.age != "" && d.gender == "F");
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.HB = Math.round(parseFloat(e.HB));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                return filtered;
            }
            else if(key == "bmi") // female bmi
            {
                // Filter out NaN and empty strings for all height, weight, and age in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.height) && !isNaN(d.weight) && !isNaN(d.age) &&
                            d.height != "" && d.weight != "" && d.age != "" &&
                            d.gender == "F");
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.height = Math.round(parseFloat(e.height));
                    e.weight = Math.round(parseFloat(e.weight));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                return filtered;
            }
            else if(key == "bp") // female bp
            {
                // Filter out NaN and empty strings for blood pressure sys, dys and age in the records
                filtered = community_records.filter(function(d) {
                    return (!isNaN(d.age) && d.BP_SYS != "" && d.BP_DYS != "" && d.age != "" );
                });

                // Then get rid of floats and make it all integers
                filtered = filtered.map(function(e) {
                    e.BP_SYS = Math.round(parseFloat(e.BP_SYS));
                    e.BP_DYS = Math.round(parseFloat(e.BP_DYS));
                    e.age = Math.round(parseFloat(e.age));
                    return e;
                });

                // do one more filter and ensure that systolic Bp is always higher than diastolic
                filtered = community_records.filter(function(d) {
                    return (d.BP_SYS > d.BP_DYS && !isNaN(d.BP_SYS) && !isNaN(d.BP_DYS) && d.gender == "F");
                });

                return filtered;
            }
        }
    }


    handleUserClick(multiViewShowing, groupName, type) {

        //Translate abbreviation to full community name
        var groupRecords;

        var full_community_name;
		var community_records;

        var num_records = 0, num_females = 0, num_males = 0, num_other = 0;
        var age_nest, age_nest_M, age_nest_F;
        var gender_data;
        var bh_nest_all, bh_nest_M, bh_nest_F;
        var bmi_nest_all, bmi_nest_M, bmi_nest_F;
        var bp_nest_all, bp_nest_M, bp_nest_F;

        if(groupName == '')
        {
            // full_community_name = '';
            groupRecords = [];
            age_nest = [];
            age_nest_M = [];
            age_nest_F = [];
            num_records = 0;
            gender_data = [[0,0]];
            bh_nest_all = [];
            bh_nest_M = [];
            bh_nest_F = [];
            bmi_nest_all = [];
            bmi_nest_M = [];
            bmi_nest_F = [];
            bp_nest_all = [];
            bp_nest_M = [];
            bp_nest_F = [];

            this.handleLabelInteraction("community", '', 0);
            this.updateCommunities(this.state.records, 0);

            // reset click back
            this.updateDiagnosis(this.state.records, 0);
            this.updateTreatments(this.state.records, 0);
            this.updateBano(this.state.records, 0);
            this.updateWaterSources(this.state.records, 0);

        }
        else
        {
            // search for community full name if type == community
            if(type == 'community')
            {
                var dict_array = Object.entries(Meta.COMMUNITY_NAME_DICT);

                // Translation from abbreviation to full name
                for (var i = 0; i < dict_array.length; i++)
                {
                    if(dict_array[i][1] === groupName)
                    {
                        groupName = dict_array[i][0];
                        break;
                    }
                }
            }

            /* Grab community records from dataManager to be displayed in MultiviewDialog */
            if(type == 'community')
            {
                groupRecords = dataManager.getRecordsByCommunity(groupName);
            }
            if(type == 'diagnosis')
            {
                groupRecords = dataManager.getRecordsByDiagnosis(groupName);
            }
            if(type == 'treatment')
            {
                groupRecords = dataManager.getRecordsByTreatments(groupName);
            }
            if(type == 'watersources')
            {
                groupRecords = dataManager.getRecordsByWatersource(groupName);
            }
            if(type == 'bano')
            {
                groupRecords = dataManager.getRecordsByBano(groupName);
            }
            console.log(groupRecords);
            num_records = groupRecords.length;

            // console.log(community_records);

            // call helper function to get a data array with the right filters applied
            var age_by_all = this.getFilteredRecords("all", "age", groupRecords);
            var age_by_M = this.getFilteredRecords("M", "age", groupRecords);
            var age_by_F = this.getFilteredRecords("F", "age", groupRecords);
            var bh_by_all = this.getFilteredRecords("all", "bh", groupRecords);
            var bh_by_M = this.getFilteredRecords("M", "bh", groupRecords);
            var bh_by_F = this.getFilteredRecords("F", "bh", groupRecords);
            var bmi_by_all = this.getFilteredRecords("all", "bmi", groupRecords);
            var bmi_by_M = this.getFilteredRecords("M", "bmi", groupRecords);
            var bmi_by_F = this.getFilteredRecords("F", "bmi", groupRecords);
            var bp_by_all = this.getFilteredRecords("all", "bp", groupRecords);
            var bp_by_M = this.getFilteredRecords("M", "bp", groupRecords);
            var bp_by_F = this.getFilteredRecords("F", "bp", groupRecords);

            // gender_nest is used to show gender distribution (M, F)
            var gender_nest =  d3.nest().key(function(d){ return d.gender; })
                    .rollup(function(leaves) { return leaves.length; })
                    .entries(groupRecords);

            /* Grab the count of male, female, and other */
            for (var [key, obj] of Object.entries(gender_nest)) {
                if(obj.key == "M")
                    num_males = obj.value;
                if(obj.key == "F")
                    num_females = obj.value;
                if(obj.key == "")
                    num_other = obj.value;
            }

            // we will pass this to the state - rendered by GenderBars
            gender_data = [[num_males, num_females]];

            //First nest by age
            var full_nested = d3.nest().key(function(d){ return d.age; });

			// age distribution for all
			age_nest = full_nested.rollup(function(leaves) { return leaves.length; })
							.entries(age_by_all)
							.sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

			// age distribution for males
			age_nest_M = full_nested.rollup(function(leaves) { return leaves.length; })
							.entries(age_by_M)
							.sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

			// age distribution for females
			age_nest_F = full_nested.rollup(function(leaves) { return leaves.length; })
							.entries(age_by_F)
							.sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // average bh distribution for all
			bh_nest_all = full_nested.rollup(function(leaves) {
                                    var sum = 0;
                                    for(var i = 0; i < leaves.length; i++)
                                    {
                                        sum += leaves[i].HB
                                    }
                                    return sum/leaves.length;
                                })
							.entries(bh_by_all)
							.sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // bh distribution for males
			bh_nest_M = full_nested.rollup(function(leaves) {
                                    var sum = 0;
                                    for(var i = 0; i < leaves.length; i++)
                                    {
                                        sum += leaves[i].HB
                                    }
                                    return sum/leaves.length;
                                })
							.entries(bh_by_M)
							.sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // bh distribution for females
            bh_nest_F = full_nested.rollup(function(leaves) {
                                    var sum = 0;
                                    for(var i = 0; i < leaves.length; i++)
                                    {
                                        sum += leaves[i].HB
                                    }
                                    return sum/leaves.length;
                                })
                            .entries(bh_by_F)
                            .sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // average bmi distribution for all
            bmi_nest_all = full_nested.rollup(function(leaves) {
                                var sum = 0;
                                for(var i = 0; i < leaves.length; i++)
                                {
                                    // BMI = weight / height (m) ^ 2
                                    sum += leaves[i].weight / (Math.pow(leaves[i].height / 100, 2) );
                                }
                                return sum/leaves.length;
                            })
                            .entries(bmi_by_all)
                            .sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // average bmi distribution for males
            bmi_nest_M = full_nested.rollup(function(leaves) {
                                var sum = 0;
                                for(var i = 0; i < leaves.length; i++)
                                {
                                    // BMI = weight / height (m) ^ 2
                                    sum += leaves[i].weight / (Math.pow(leaves[i].height / 100, 2) );
                                }
                                return sum/leaves.length;
                            })
                            .entries(bmi_by_M)
                            .sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // average bmi distribution for females
            bmi_nest_F = full_nested.rollup(function(leaves) {
                                var sum = 0;
                                for(var i = 0; i < leaves.length; i++)
                                {
                                    // BMI = weight / height (m) ^ 2
                                    sum += leaves[i].weight / (Math.pow(leaves[i].height / 100, 2) );
                                }
                                return sum/leaves.length;
                            })
                            .entries(bmi_by_F)
                            .sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // average bp distribution for all
            bp_nest_all = full_nested.rollup(function(leaves) {
                                var sum_sys = 0, sum_dys = 0;
                                for(var i = 0; i < leaves.length; i++)
                                {
                                    sum_sys += leaves[i].BP_SYS;
                                    sum_dys += leaves[i].BP_DYS;
                                }
                                return [sum_sys/leaves.length, sum_dys/leaves.length];
                            })
                            .entries(bp_by_all)
                            .sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // average bp distribution for male
            bp_nest_M = full_nested.rollup(function(leaves) {
                                var sum_sys = 0, sum_dys = 0;
                                for(var i = 0; i < leaves.length; i++)
                                {
                                    sum_sys += leaves[i].BP_SYS;
                                    sum_dys += leaves[i].BP_DYS;
                                }
                                return [sum_sys/leaves.length, sum_dys/leaves.length];
                            })
                            .entries(bp_by_M)
                            .sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

            // average bp distribution for female
            bp_nest_F = full_nested.rollup(function(leaves) {
                                var sum_sys = 0, sum_dys = 0;
                                for(var i = 0; i < leaves.length; i++)
                                {
                                    sum_sys += leaves[i].BP_SYS;
                                    sum_dys += leaves[i].BP_DYS;
                                }
                                return [sum_sys/leaves.length, sum_dys/leaves.length];
                            })
                            .entries(bp_by_F)
                            .sort(function(a,b) { return d3.ascending(parseInt(a.key), parseInt(b.key))} );

		}

		this.setState({
			multiViewShowing: multiViewShowing,
			groupName: groupName,
			groupRecords: groupRecords,
			num_records: num_records,
			gender_data: gender_data,
			age_nest: age_nest,
			age_nest_M: age_nest_M,
			age_nest_F: age_nest_F,
            bh_nest_all: bh_nest_all,
            bh_nest_M: bh_nest_M,
            bh_nest_F: bh_nest_F,
            bmi_nest_all: bmi_nest_all,
            bmi_nest_M: bmi_nest_M,
            bmi_nest_F: bmi_nest_F,
            bp_nest_all: bp_nest_all,
            bp_nest_M: bp_nest_M,
            bp_nest_F: bp_nest_F,
        });
    }


    handlePatientClick(patientDialogShowing, patientRecord, state) {
        this.handleUserHover(patientRecord, state);
        this.setState({
            patientDialogShowing: patientDialogShowing,
            patientRecord: patientRecord
        });
    }

    handleUserHover(selectedRecord, state){

        // update selected record state
        var vRecords = this.state.visitedDate;

        if(selectedRecord)
        {
            for (var i = 0; i < vRecords.length; i++)
            {
                for(var j = 0; j< vRecords[i].value.length; j++)
                {
                    if (selectedRecord.key == vRecords[i].value[j].key)
                    {
                        vRecords[i].value[j].state = state;
                        break;
                    }
                }
            }
        }

        if(state)
        {
            this.updateCommunities([selectedRecord], state);
            this.updateDiagnosis([selectedRecord], state);
            this.updateBano([selectedRecord], state);
            this.updateTreatments([selectedRecord], state);
            this.updateWaterSources([selectedRecord], state);
        }
        else
        {
            this.updateCommunities(this.state.records, state);
            this.updateDiagnosis(this.state.records, state);
            this.updateBano(this.state.records, state);
            this.updateTreatments(this.state.records, state);
            this.updateWaterSources(this.state.records, state);
            // records
            this.setState({
                visitedDate: dataManager.visitedDate
            });

        }
    }

    render() {
        const { width, height } = this.state;
        const paneLeftX = 0;
        const paneLeftWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANE_LEFT_SPAN - Meta.PADDING;
        const paneCenterX = paneLeftWidth + Meta.PADDING;
        const paneCenterWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANEL_CENTER_SPAN;
        const paneRightX = paneLeftWidth + paneCenterWidth + Meta.PADDING * 2;
        const paneRightWidth = (width - Meta.PADDING * 2) / Meta.PANE_SPAN * Meta.PANEL_RIGHT_SPAN - Meta.PADDING;
        var isDialogActive = this.state.multiViewShowing || this.state.patientDialogShowing

        const visitDates = Helper.getAttributeFromObejcts(this.state.visitedDate, "key");
        const numRecords = this.state.records.length;
        let options = {
          activeClass:          'active', // the class that is appended to the sections links
          anchors: ['sectionOne', 'sectionTwo'],
          arrowNavigation:      true, // use arrow keys
          className:            'SectionContainer', // the class name for the section container
          delay:                1000, // the scroll animation speed
          navigation:           true, // use dots navigatio
          scrollBar:            false, // use the browser default scrollbar
          sectionClassName:     'Section', // the section class name
          sectionPaddingTop:    '0', // the section top padding
          sectionPaddingBottom: '0', // the section bottom padding
          verticalAlign:        false, // align the content of each section vertical
          navigation:           false
        };

        if (this.state.diagnosis.length === 0 || this.state.treatments.length === 0 || this.state.waterSources.length === 0 || this.state.communities.length === 0 || this.state.bano.length === 0) {
            return (
                <LoadingView />
            );
        } else {
            return (
                <div>


                    <SectionsContainer {...options}>
                        <Section>
                            <HeaderPage  dates={visitDates} communities={this.state.communities} numRecords={numRecords}/>
                        </Section>
                        <Section>
                            <MultiviewDialog paneCenterWidth={paneCenterWidth}
                                isDialogActive={this.state.multiViewShowing}
                                theState={this.state} groupName={this.state.groupName}
                                onHideModal={this.handleUserClick}/>
                            <PatientDetailsDialog paneCenterWidth={paneCenterWidth} isDialogActive={this.state.patientDialogShowing} patient={this.state.patientRecord} onHideModal={this.handlePatientClick} />

                            <svg className={styles.svgWrapper} width={width} height={height} transform={`translate(${this.props.x}, ${this.props.y})`}>
                                <MainViewLayout leftX={paneLeftX} centerX={paneCenterX} rightX={paneRightX}
                                    left = {[
                                        <LabelGroup key="0"
                                            type="diagnosis"
                                            isDialogActive={isDialogActive}
                                            direction='v'
                                            title="Diagnosis"
                                            tooltip="true"
                                            tooltipPos="right"
                                            textAnchor="end"
                                            data={this.state.diagnosis.slice(0,16)}
                                            onLabelInteraction={this.handleLabelInteraction}
                                            onUserInput={this.handleUserClick}
                                            x={paneLeftWidth} y="0"/>,
                                        <LabelGroup key="1"
                                            type="watersources"
                                            isDialogActive={isDialogActive}
                                            direction='v'
                                            title="Water Sources"
                                            tooltip="true"
                                            tooltipPos="right"
                                            textAnchor="end"
                                            data={this.state.waterSources}
                                            onLabelInteraction={this.handleLabelInteraction}
                                            onUserInput={this.handleUserClick}
                                            x={paneLeftWidth} y={height/2}/>
                                    ]}
                                    center = {[
                                        <MainChart key="0"
                                            data={this.state.records}
                                            isDialogActive={isDialogActive}
                                            visitedDate={this.state.visitedDate}
                                            onUserHover={this.handleUserHover}
                                            onUserInput={this.handlePatientClick}
                                        />,
                                        <CommunityLabelGroup key="1"
                                            type="community"
                                            isDialogActive={isDialogActive}
                                            direction='h'
                                            title="Community"
                                            tooltip="true"
                                            textAnchor="middle"
                                            width={paneCenterWidth}
                                            data={this.state.communities}
                                            onLabelInteraction={this.handleLabelInteraction}
                                            onUserInput={this.handleUserClick}
                                            x="0" y={Meta.MainChartHeight() + Meta.PADDING}/>
                                    ]}
                                    right = {[
                                        <LabelGroup key="0"
                                            type="treatment"
                                            direction='v'
                                            title="Treatment"
                                            textAnchor="start"
                                            tooltip="true"
                                            tooltipPos="left"
                                            data={this.state.treatments.slice(0,16)}
                                            onLabelInteraction={this.handleLabelInteraction}
                                            onUserInput={this.handleUserClick}
                                            x="0" y="0"/>,
                                        <LabelGroup key="1"
                                            type="bano"
                                            direction='v'
                                            title="Bano"
                                            tooltip="true"
                                            tooltipPos="left"
                                            x="0"
                                            data={this.state.bano}
                                            textAnchor="start"
                                            onLabelInteraction={this.handleLabelInteraction}
                                            onUserInput={this.handleUserClick}
                                            x="0" y={height/2}/>
                                    ]}
                                />
                                <LinkGroup />
                            </svg>
                        </Section>
                    </SectionsContainer>

                </div>
            );
        }
    }
}
