import * as Meta from './Metadata.jsx';
import * as d3 from 'd3';
import Rebase from 're-base';


var base = Rebase.createClass({
    apiKey: "AIzaSyC7kqijvE-MYFjuvJarGXs8AC06zq0PFEo",
    authDomain: "floatdocadmin.firebaseapp.com",
    databaseURL: "https://floatdocadmin.firebaseio.com",
    storageBucket: "floatdocadmin.appspot.com",
    messagingSenderId: "487269857429"
});

var communityDict = Meta.COMMUNITY_NAME_DICT;

export function getRecords(startTime, endTime, callback){
    var recordsData = [];
    console.log(startTime);
    console.log(endTime);
    base.fetch('records', {
        context: this,
        asArray: true,
        queries: {
            startAt: startTime,
            endAt: endTime,
            orderByChild: 'consultTime',
        }
    }).then(data => {
        return callback(data);
    });
}


// Get visits by number
export function getVisits(number)
{
    var queryNumber = number * 250;
    base.fetch('records', {
        context: this,
        asArray: true,
        queries: {
            orderByChild: 'consultTime',
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


// Get records by time & community
export function getRecordsByURL(startTime, endTime, url, keyValue, callback)
{
    // var ref = base.database().ref("records");
    // ref
    //     .orderBy('consultTime')
    //     .startAt(startTime)
    //     .endAt(endTime)
    //     .equalTo(url)
    //     .once('value', function(data){
    //         console.log(data.key);
    //     });


    var recordsData = [];
    base.fetch('records', {
        context: this,
        asArray: true,
        queries: {
            startAt: startTime,
            endAt: endTime,

        }
    }).then(data => {

        // request community data
        base.fetch(url + '/' + keyValue, {
            context: this,
            asArray: false,
        }).then(requestList => {
            var records = {};
            var recordsKeys = Object.keys(requestList);
            console.log(recordsKeys.length);

            for (var i = 0; i < data.length; i++)
            {   
                // TODO: need to check the data structure
                console.log(data);
                if( recordsKeys.include(data[i].key))
                    records.push(data[i]);
            }
            return records;
        });


    });
}

// Given start & end time, return all the diagnosis in this records
export function getDiagnosis(startTime, endTime, callback)
{
    var diagnosisData = [];
    base.fetch('records', {
        context: this,
        asArray: true,
        queries: {
            startAt: startTime,
            endAt: endTime,
            orderByChild: 'consultTime',
        }
    }).then(data => {
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
        return callback(diagnosisData);

    });
}


// Given start & end time, return all the treatment in this records
export function getTreatments(startTime, endTime, callback)
{
    var treatmentData = [];
    base.fetch('records', {
        context: this,
        asArray: true,
        queries: {
            startAt: startTime,
            endAt: endTime,
            orderByChild: 'consultTime',
        }
    }).then(data => {
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
        return callback(treatmentData);

    });

} 


// Given start & end time, return all the community in this records
export function getCommunities(startTime, endTime, callback)
{
    var communitiesData = [];
    base.fetch('records', {
        context: this,
        asArray: true,
        queries: {
            startAt: startTime,
            endAt: endTime,
            orderByChild: 'consultTime',
        }
    }).then(data => {
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
        return callback(communitiesData);

    });

}


// Given start & end time, return all the community in this records
export function getWaterSources(startTime, endTime, callback)
{
    var waterSourceData = [];
    base.fetch('records', {
        context: this,
        asArray: true,
        queries: {
            startAt: startTime,
            endAt: endTime,
            orderByChild: 'consultTime',
        }
    }).then(data => {
        var nested_data = d3.nest()
            .key(function(d) {
                return d.waterResource;
            })
            .rollup(function(leaves) { return leaves.length;})
            .entries(data)
            .sort(function(a, b) { return d3.descending(a.value, b.value)});

        for (var i = 0; i < nested_data.length; i++)
        {
            if(nested_data[i].key == 'undefined') continue;
            waterSourceData.push({
                "id": i,
                "name": nested_data[i].key,
                "count": nested_data[i].value,
                "state": 0
            });
        }
        return callback(waterSourceData);

    });

}


// Given start & end time, return all the community in this records
export function getbanoData(startTime, endTime, callback)
{
    var banoData = [];
    base.fetch('records', {
        context: this,
        asArray: true,
        queries: {
            startAt: startTime,
            endAt: endTime,
            orderByChild: 'consultTime',
        }
    }).then(data => {
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
        return callback(banoData);

    });

}


export function getAttributeFromObejcts(objects, attr) {
    let results = [];
    objects.forEach(function(d) {
        results.push(d[attr]);
    });
    return results;
}

export function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
