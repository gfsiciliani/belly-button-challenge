console.log('___GOOD MORNING, BELLY BUTTON OWNERS!!!___');

// Get samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log("JSON FETCHED", data);
    
    // get sample data
    let sampleSet = data.samples[0] // adjust to be chosen by dropdown (see 14.3.10 for tutorial)
    console.log("Sample set :", sampleSet);

    // map data?
    let otuIds = sampleSet.otu_ids;
        // let otuIds = sampleSet.map(x => x.otu_ids);

    console.log(otuIds)
    let x = otuIds.map(x => x)
    console.log(x)
});
