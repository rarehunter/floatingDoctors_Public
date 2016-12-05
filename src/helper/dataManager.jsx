import React from 'react';
import Rebase from 're-base';
import * as Meta from '../Metadata.jsx';
import * as d3 from 'd3';


var base = Rebase.createClass({
    apiKey: "AIzaSyC7kqijvE-MYFjuvJarGXs8AC06zq0PFEo",
    authDomain: "floatdocadmin.firebaseapp.com",
    databaseURL: "https://floatdocadmin.firebaseio.com",
    storageBucket: "floatdocadmin.appspot.com",
    messagingSenderId: "487269857429"
});

var communityDict = Meta.COMMUNITY_NAME_DICT;


export default class DataManager {

    constructor(endDate){
        // Get all records
        this.endTime = endDate.getTime();
        this.startTime = endDate.getTime();
        this.numOfVisits = Meta.DEFAULT_VISITS;
        this.records = [];
        this.visitedDate = [];
        this.baseURL = [
            'bano',
            'community',
            'diagnosis',
            'records',
            'treatment',
            'waterResource',
        ];
    }

     /*
    * Return the unique visited date list
    * visitedDate: a list of date
    */
    getVisits(callback)
    {
        var queryNumber = this.numOfVisits * Meta.MAX_RECORDS;

        base.fetch('records', {
            context: this,
            asArray: true,
            queries: {
                orderByChild: 'consultTime',
                endAt: this.endTime
                // limitToLast: queryNumber
            }
        }).then(data => {
            var visitedDate = [];
            // nesting data according to consult time
            var nested_data = d3.nest()
                .key(function(d) { return d.consultTime; })
                .entries(data);

            var startIndex = 0;
            if (nested_data.length > this.numOfVisits)
            {
                startIndex = nested_data.length - this.numOfVisits;
            }

            this.startTime = parseInt(nested_data[startIndex].key);

            // mapping key to visitedDate
            for(var i = startIndex; i < nested_data.length; i++)
            {
                var date = new Date(parseInt(nested_data[i].key));
                visitedDate[i-startIndex] = 
                {
                    key: date.toDateString(),
                    value: nested_data[i].values
                }
            }
            
            // for (var i = Object.keys(data).length - 1; i >= 0; i--)
            // {   
            //     var date = data[i]['consultTime'];
            //     if (visitedDate.indexOf(date) == -1)
            //     {
            //         visitedDate.push(date);
            //     }

            //     if(visitedDate.length == this.numOfVisits)
            //         break;
            // }

            // for (var i = 0; i < visitedDate.length; i++)
            // {
            //     var date = new Date(visitedDate[i]);
            //     date.setMonth(date.getMonth() - 1);
            //     visitedDate[i] = date;
            // }

            this.visitedDate = visitedDate;
            return callback(nested_data);
        });
    }


    /*
    * Return visited records
    *
    * visitedDate: consulted date, generated by getVisits()
    * records: filtered records objects
    */
    getVisitedRecords(callback)
    {
        base.fetch('records', {
            context: this,
            asArray: true,
            queries: {
                orderByChild: 'consultTime',
                startAt: this.startTime,
                endAt: this.endTime,
            }
        }).then(data => {
            // Get the records
            this.records = data;

            // Get diagnosis, communities, treatment, waterResources
            this.diagnosisData = this.getDiagnosis();
            this.communityData = this.getCommunities();
            this.treatmentData = this.getTreatments();
            this.waterSourceData = this.getWaterSources();
            this.banoData = this.getbanoData();

            return callback(data);
        });
    }

    // Given start & end time, return all the diagnosis in this records
    getDiagnosis(data = this.records)
    {
        // var data = this.records;
        var diagnosisData = [];

        // Step 1: expand record data
        var expand_data = [];
        for(var i = 0; i < data.length; i++)
        {
            if(data[i].hasOwnProperty("diagnosis") && data[i].diagnosis.length > 0)
            {
                for (var j = 0; j < data[i].diagnosis.length; j++)
                {
                    var d = Object.assign({}, data[i]);
                    d.diagnosis = data[i].diagnosis[j];
                    expand_data.push(d);
                }
            }
            else
            {
                expand_data.push(data[i]);
            }
        }

        // Step 2: nest data 
        var nested_data = d3.nest()
            .key(function(d) {
                return d.diagnosis;
            })
            .rollup(function(leaves) { return leaves.length;})
            .entries(expand_data)
            .sort(function(a, b) { return d3.descending(a.value, b.value)});


        // Step 3: formating data to required format
        for (var i = 0; i < nested_data.length; i++)
        {
            if(nested_data[i].key == 'undefined') continue;
            diagnosisData.push({
                "id": i,
                "name": nested_data[i].key,
                "count": nested_data[i].value,
                "state": 0
            });
        }

        return diagnosisData;
    }


    // Get communities
    getCommunities(data = this.records)
    {
        var communitiesData = [];
        var nested_data = d3.nest()
            .key(function(d) {
                return d.consultLocation;
            })
            .rollup(function(leaves) { return leaves.length;})
            .entries(data)
            .sort(function(a, b) { return d3.descending(a.value, b.value)});

        for (var i = 0; i < nested_data.length; i++)
        {
            if(nested_data[i].key == 'undefined') continue;
            var communityName = nested_data[i].key;
            communitiesData.push({
                "id": i,
                "full_name": communityName,
                "name": communityDict[communityName],
                "count": nested_data[i].value,
                "state": 0
            });
        }

        return communitiesData;
    }


    // get treatment
    getTreatments(data = this.records)
    {
        var treatmentData = [];
        // Step 1: expand record data
        var expand_data = [];
        for(var i = 0; i < data.length; i++)
        {
            if(data[i].hasOwnProperty("treatment") && data[i].treatment.length > 0)
            {
                for (var j = 0; j < data[i].treatment.length; j++)
                {

                    var d = Object.assign({}, data[i]);
                    d.treatment = data[i].treatment[j];
                    expand_data.push(d);
                }
            }
            else
            {
                expand_data.push(data[i]);
            }
        }

        var nested_data = d3.nest()
            .key(function(d) {
                return d.treatment;
            })
            .rollup(function(leaves) { return leaves.length;})
            .entries(expand_data)
            .sort(function(a, b) { return d3.descending(a.value, b.value)});

        for (var i = 0; i < nested_data.length; i++)
        {
            if(nested_data[i].key == 'undefined') continue;
            var treatment = nested_data[i].key;
            treatmentData.push({
                "id": i,
                "name": nested_data[i].key,
                "count": nested_data[i].value,
                "state": 0
            });
        }

        return treatmentData;

    }

    // get water source
    getWaterSources(data = this.records)
    {
        var waterSourceData = [];
       
        var nested_data = d3.nest()
            .key(function(d) {
                return d.waterResource;
            })
            .rollup(function(leaves) { return leaves.length;})
            .entries(data)
            .sort(function(a, b) { return d3.descending(a.value, b.value)});

        for (var i = 0; i < nested_data.length; i++)
        {
            if(nested_data[i].key == 'undefined' || nested_data[i].key == '') continue;
            waterSourceData.push({
                "id": i,
                "name": nested_data[i].key,
                "count": nested_data[i].value,
                "state": 0
            });
        }
        return waterSourceData;

    }


    // get bano data
    getbanoData(data = this.records)
    {
        var banoData = [];        
        var nested_data = d3.nest()
            .key(function(d) {
                return d.bano;
            })
            .rollup(function(leaves) { return leaves.length;})
            .entries(data)
            .sort(function(a, b) { return d3.descending(a.value, b.value)});

        for (var i = 0; i < nested_data.length; i++)
        {
            if(nested_data[i].key == 'undefined' || nested_data[i].key == '') continue;
            banoData.push({
                "id": i,
                "name": nested_data[i].key,
                "count": nested_data[i].value,
                "state": 0
            });
        }
        return banoData;


    }


}