import React from 'react';
import Rebase from 're-base';

var base = Rebase.createClass({
    apiKey: "AIzaSyC7kqijvE-MYFjuvJarGXs8AC06zq0PFEo",
    authDomain: "floatdocadmin.firebaseapp.com",
    databaseURL: "https://floatdocadmin.firebaseio.com",
    storageBucket: "floatdocadmin.appspot.com",
    messagingSenderId: "487269857429"
});

export default class dataManager {

    constructor(startDate){
        // Get all records
        this.startTime = startDate.getTime();
        base.fetch('records', {
            context: this,
            asArray: false,
            queries: {
                startAt: this.startTime,
                orderByChild: 'consultTime',
            }
        }).then(data => {
            this.allRecords = data;
        });

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
    *
    * number [int]: number of visited date requested
    * endDate [date]: query before this end date
    *
    * visitedDate: a list of date
    */
    getVisits(number, endDate)
    {
        var endTime = endDate.getTime();
        // Assume average records number is 10
        // this factor here should be the max(data_point_of_the_day)
        var queryNumber = number * 250; 
        base.fetch('records', {
            context: this,
            asArray: true,
            queries: {
                orderByChild: 'consultTime',
                startAt: this.startTime,
                endAt: endTime,
                limitToLast: queryNumber
            }
        }).then(data => {
            var visitedDate = [];
            for (var i = 0; i < Object.keys(data).length; i++)
            {   
                var date = new Date(data[i]['consultTime']);
                date.setMonth(date.getMonth() - 1); // Month is started from 0
                if (visitedDate.indexOf(date) == -1)
                {
                    visitedDate.push(date);
                }

                if(visitedDate.length == number)
                    break;
            }
            return visitedDate;
        });
    }


    /*
    * Return the filtered records
    *
    * url: endpoint in Firebase 
    * valid url: diagnosis, bano, community, treatment, waterResource
    * 
    * keyValue: query the particular records ID under that key
    * 
    *
    * records: filtered records objects
    */
    getRecords(url, keyValue)
    {
        if(this.baseURL.indexOf(url) == -1)
            return null;

        base.fetch(url + '/' + keyValue, {
            context: this,
            asArray: false,
        }).then(data => {
            var records = {};
            var recordsKeys = Object.keys(data);
            console.log(recordsKeys.length);

            for (var i = 0; i < recordsKeys.length; i++)
            {   
                if(this.allRecords[recordsKeys[i]] != null)
                    records[recordsKeys[i]] = this.allRecords[recordsKeys[i]]; 
            }
            return records;
        });
    }

    /*
    * Return all the filtered records
    *
    * visitedDate: consulted date, generated by getVisits()
    * records: filtered records objects
    */
    getVisitedRecords(visitedDate)
    {
        var endTime = visitedDate[0].getTime();
        var startTime = visitedDate[visitedDate.length-1].getTime();
        base.fetch('records', {
            context: this,
            asArray: false,
            queries: {
                orderByChild: 'consultTime',
                startAt: this.startTime,
                endAt: endTime,
            }
        }).then(data => {
            return data;
        });
    }


    getCommunities()
    {
        base.fetch('community', {
            context: this,
            asArray: false,
        }).then(data => {
            var communities = Object.keys(data);
            return communities;
        });
    }

    getBano()
    {
        base.fetch('bano', {
            context: this,
            asArray: false,
        }).then(data => {
            var bano = Object.keys(data);
            return bano;
        });
    }


    getTreatement()
    {
        base.fetch('treatment', {
            context: this,
            asArray: false,
        }).then(data => {
            var treatment = Object.keys(data);
            return treatment;
        });
    }

    getDiagnosis()
    {
        base.fetch('diagnosis', {
            context: this,
            asArray: false,
        }).then(data => {
            var diagnosis = Object.keys(data);
            return diagnosis;
        });
    }

    getWaterResource()
    {
        base.fetch('waterResource', {
            context: this,
            asArray: false,
        }).then(data => {
            var water_resource = Object.keys(data);
            return water_resource;
        });
    }



}