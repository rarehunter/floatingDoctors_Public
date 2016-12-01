var express = require('express');
var path = require('path');
var fileUpload = require('express-fileupload');
var firebase = require("firebase");
var fs = require('fs-extra');
var readline = require('readline');

var webpack = require('webpack');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var compiler = webpack(config);
var app = express();
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(hotMiddleware(compiler));


// Initialize Firebase
var config = {
    apiKey: "AIzaSyC7kqijvE-MYFjuvJarGXs8AC06zq0PFEo",
    authDomain: "floatdocadmin.firebaseapp.com",
    databaseURL: "https://floatdocadmin.firebaseio.com",
    storageBucket: "floatdocadmin.appspot.com",
    messagingSenderId: "487269857429"
};
firebase.initializeApp(config);


var database = firebase.database();
var purge = function() {
    var ref = database.ref();
    ref.set(null, function(err) {
        if(!err) console.log('Done purge');
        process.exit(0);
    });
}


// Read diagnosis file
var readCodeFile = function (fileName) {

	var codeDict = {};

	var fileContent = fs.readFileSync(fileName).toString();
	// console.log(fileContent);

    var lines = fileContent.split("\n");
    for (var i = 1; i < lines.length; i++)
    {
    	var line = lines[i];
    	var items = line.split("	");
    	codeDict[items[1]] = items[0];
    }

    return codeDict;
}

var diagnosisCode = readCodeFile("static_files/diagnosisCode.txt");
var treatmentCode = readCodeFile("static_files/treatmentCode.txt");


// read each attribute in array
// Convert to JS object
var strToRecords = function(elements){
    var record = {};

    // Record
    record['record'] = elements[0];

    // Consult date & time
    record['consultMonth'] = elements[1];
    if(isNaN(parseInt(record['consultMonth'])))
        record['consultMonth'] = '01';

    record['consultDay'] = elements[2];
    if(isNaN(parseInt(record['consultDay'])))
        record['consultDay'] = '01';

    record['consuleYear'] = elements[3];
    if(isNaN(parseInt(record['consuleYear'])))
            record['consuleYear'] = '2011'; // set default as 2011

    var consultTime = new Date(record['consuleYear'], record['consultMonth'], record['consultDay']);
    record['consultTime'] = consultTime.getTime();

    // Consult location
    record['consultLocation'] = elements[4];

    // DOB
    record['DOBMonth'] = elements[5];
    if(isNaN(parseInt(record['DOBMonth'])))
        record['DOBMonth'] = '01';

    record['DOBDay'] = elements[6];
    if(isNaN(parseInt(record['DOBDay'])))
        record['DOBDay'] = '01';

    record['DOBYear'] = elements[7];
    if(isNaN(parseInt(record['DOBYear'])))
        record['DOBYear'] = '1970'; // set default as 1970

    var DOB = new Date(record['DOBYear'], record['DOBMonth'], record['DOBDay']);
    record['DOB'] = DOB.getTime();

    // Name
    record['name'] = elements[8];

    // Gender
    record['gender'] = elements[9];

    // Age
    // TODO: check whether age is int
    record['age'] = '';
    if(elements[10] != null && !isNaN(parseInt(elements[10])))
        record['age'] = parseInt(elements[10]);
    else if(elements[11] != null && !isNaN(parseInt(elements[11])))
        record['age'] = parseFloat(elements[11])/12;

    // height
    record['height'] = '';
    if(!isNaN(parseFloat(elements[12])))
        record['height'] = parseFloat(elements[12]);

    // weight
    record['weight'] = '';
    if(!isNaN(parseFloat(elements[13])))
        record['weight'] = parseFloat(elements[13]);

    // BP_SYS & BP_DYS
    record['BP_SYS'] = elements[14];
    record['BP_DYS'] = elements[15];

    // HR
    record['heartRate'] = '';
    if(elements[18] != null && !isNaN(parseInt(elements[18])))
        record['heartRate'] = parseInt(elements[18]);

    // RR
    record['respirationRate'] = '';
    if(elements[19] !=null && !isNaN(parseInt(elements[19])))
        record['respirationRate'] = parseInt(elements[19]);

    // Temperature
    record['temperature'] = '';
    if(elements[21] != null && !isNaN(parseFloat(elements[21])))
    {
        record['temperature'] = parseFloat(elements[21]);
    }

    if(elements[20] != null && !isNaN(parseFloat(elements[20])))
    {
        var temp = parseFloat(elements[20]);
        // converted to Celsius degree
        record['temperature'] = (temp - 32) * 0.5556;
    }

    // Smoke
    record['smoke'] = '';
    if(elements[22] == 'Y')
        record['smoke'] = true
    if(elements[22] == 'N')
        record['smoke'] = false

    // Drink
    record['drink'] = '';
    if(elements[23] == 'Y')
        record['drink'] = true
    if(elements[23] == 'N')
        record['drink'] = false

    // Drug
    record['drug'] = '';
    if(elements[24] == 'Y')
        record['drug'] = true
    if(elements[24] == 'N')
        record['drug'] = false

    // Bano
    record['bano'] = '';
    if(elements[30] == 'Y')
        record['bano'] = 'latrine';
    else if(elements[31] == 'Y')
        record['bano'] = 'toilet';
    else if(elements[32] == 'Y')
        record['bano'] = 'composing';
    else if(elements[33] == 'Y')
        record['bano'] = 'overwater';
    else if(elements[34] == 'Y')
        record['bano'] = 'other';
    else if(elements[35] == 'Y')
        record['bano'] = 'field';

    // Water resource
    record['waterResource'] = '';
    if(elements[36] == 'Y')
        record['waterResource'] = 'well';
    else if(elements[37] == 'Y')
        record['waterResource'] = 'river';
    else if(elements[38] == 'Y')
        record['waterResource'] = 'bottle';
    else if(elements[39] == 'Y')
        record['waterResource'] = 'spring';
    else if(elements[40] == 'Y')
        record['waterResource'] = 'rain';
    else if(elements[41] == 'Y')
        record['waterResource'] = 'pipe';
    else if(elements[42] == 'Y')
        record['waterResource'] = 'aqueduct';
    else if(elements[43] == 'Y')
        record['waterResource'] = 'city';

    // Glucose fasting
    record['glucoseFasting'] = '';
    if(elements[45] != null && !isNaN(parseInt(elements[45])))
        record['glucoseFasting'] = parseInt(elements[45]);

    // Glucose-nonfasting
    record['glucoseNonFasting'] = '';
    if(elements[46] != null && !isNaN(parseInt(elements[46])))
        record['glucoseNonFasting'] = parseInt(elements[46]);

    // HB
    record['HB'] = '';
    if(elements[47] != null && !isNaN(parseFloat(elements[47])))
        record['HB'] = parseFloat(elements[47]);

    // Diagonosis: [48 : 57]
    var i = 48;
    var diagnosis = [];
    while (i < 58)
    {
    	var item = elements[i];
    	if(item != null && diagnosisCode[item] != undefined)
    	{
    		diagnosis.push(diagnosisCode[item]);
    	}
    	i++;
    }
    record['diagnosis'] = diagnosis;


    // Treatment: [58 : 67]
    var i = 58;
    var treatment = [];
    while (i < 68)
    {
    	var item = elements[i];
    	if(item != null && treatmentCode[item] != undefined)
    	{
    		treatment.push(treatmentCode[item]);
    	}
    	i++;
    }
    record['treatment'] = treatment;

    return record;

}

// handle the incoming uploads view POST method
app.post('/upload', function(req, res){
    var file;
    if(!req.files)
    {
        res.send('No files were uploaded.');
        return;
    }

    var recordRef = database.ref("records");
    // var diagnosisRef = database.ref("diagnosis");
    // var treatmentRef = database.ref("treatment");
    var index = 0;

    file = req.files.dataFile;
    var lines = file.data.toString('utf8').split("\n");
    for (var i = 0; i < lines.length; i++)
    {
        // console.log(lines[i]);
        var line = lines[i];
        if (line.length == 0)
            continue;
        var elements = line.split(",");

        var record = strToRecords(elements);

        console.log(record);
        // Push to firebase
        var newRecordRef = recordRef.push();
        newRecordRef.set(record, function(err){
            if(!err) console.log(++index);
        });


        var recordID = newRecordRef.key;
        var updates = {};

        // Push to diagnosis table
        var diagnosis = record['diagnosis'];

        for( var j = 0; j < diagnosis.length; j++)
        {
            updates['/diagnosis/' + diagnosis[j] + '/' + recordID] = true;
        }

        // Push to treatement table
        var treatment = record['treatment'];
        for (var j = 0; j< treatment.length; j++)
        {
            updates['/treatment/' + treatment[j] + '/' + recordID] = true;
        }

        // Push to Community table
        if(record['consultLocation'].length > 0)
            updates['/community/' + record['consultLocation'] + '/' + recordID] = true;

        // Push to Bano table
        if(record['bano'].length > 0)
            updates['/bano/' + record['bano'] + '/' + recordID] = true;

        if(record['waterResource'].length > 0)
            updates['/waterResource/' + record['waterResource'] + '/' + recordID] = true;

        firebase.database().ref().update(updates);
    }

});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('listening on port ' + port);
});

// purge();
