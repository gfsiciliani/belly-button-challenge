// console.log('___GOOD MORNING, BELLY BUTTON OWNERS!!!___');

// Get samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// declare variables
let globalData = null;
let otu_ids = null;
let otu_labels = null;
let sample_values = null;
let metadata = null;
let names = null;

// Fetch the JSON data and console log it // get data and do things that only happen once
console.log("FETCHING JSON...")
d3.json(url).then(function(data) {
    
    // log to console the data and the confirmation of its receipt
    console.log("***JSON FETCHED SUCCESSFULLY***");
    console.log(data);
    globalData = data;

    // Use D3 to select dropdown menu
    let dropdownMenu = d3.select('#selDataset');

    // add to dropdownMenu
    globalData.names.forEach(id => {
        dropdownMenu.append("option")
            .text(id)
            .property("value", id)   
    });

    // initialize graphs and metadata
    init();
});

// Initialize and refresh dashboard
function init(value = globalData.names[0]) {

    // Use D3 to select dropdown menu
    let dropdownMenu = d3.select('#selDataset');

    // add to dropdownMenu
    globalData.names.forEach(id => {
        dropdownMenu.append("option")
            .text(id)
            .property("value", id)   
    });

    getSample(value);

    // build init plots
    buildBarChart(value);
    buildBubbleChart(value);
    buildMetadata(value);
}

function getSample(sampleChoice) {

    // Get all sample data
    let sampleData = globalData.samples;
    console.log("___", sampleChoice)

    // isolate given ID's sample data
    let sampleSelected = sampleData.filter(x => x.id == sampleChoice);
    // console.log("TEST",sampleSelected);

    // parse sample data
    otu_ids = sampleSelected[0].otu_ids;
    otu_labels = sampleSelected[0].otu_labels;
    sample_values = sampleSelected[0].sample_values;

    // metadata
    let metadata = globalData.metadata
}

// [2] - building bar chart that shows the top 10 OTUs in the given individual in the dropdown
function buildBarChart(sampleChoice) {
    
    // get top ten
    let xData = sample_values.slice(0,10).reverse();
    let yData = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();  // WHY????
    let labels = otu_labels.slice(0,10).reverse();
    
    // define trace for bar chart
    let trace = {
        x: xData,
        y: yData,
        text: labels,
        type: "bar",
        orientation: "h",
        marker: {
            color: 'rgba(55, 128, 191, 0.7)',
                line: {
                    color: 'rgba(55, 128, 191, 1.0)',
                    width: 1.5
                }
        }
    };

    // put trace in an array for Plotly
    let chartData = [trace]

    // define layout
    let layout = {
        title: `Top 10 OTUs present in ID: ${sampleChoice}`,
        bargap: 0.40,
        paper_bgcolor: 'rgba(245, 246, 249, 1)',
        plot_bgcolor: 'rgba(245, 246, 249, 0)'
    };

    // plot the bar chart
    Plotly.newPlot("bar", chartData, layout);  
};

// [3] - building bubble chart displaying each sample
function buildBubbleChart(sampleID) {

    // define trace for bubble chart
    let trace = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Greens",
            showscale: true
        }
    };

    // put trace in array for Plotly
    let chartData = [trace];

    // define layout
    let layout = {
        title: `All bacteria for ID No: ${sampleID}`,
        xaxis: {
            title: "OTU ID #",
            zeroline: false,
        },
        yaxis: {
            title: "Occurances of sample",
            zeroline: false,
        },
        hovermode: "closest",
        paper_bgcolor: 'rgba(245, 246, 249, 1)',
        plot_bgcolor: 'rgba(150, 150, 150, 0.5)',
        
    };

    // plot the bubble chart
    Plotly.newPlot("bubble", chartData, layout)
};

// retrieve and display Subject ID's METADATA
function buildMetadata(sampleID) {
    
    // isolate given ID's METADATA object
    let sampleSelected = globalData.metadata.filter(x => x.id == sampleID);
    
    // log metadata object to console 
    console.log("Sample selected",sampleSelected[0])
    
    // clear Demographic Info
    d3.select('#sample-metadata').html("");

    // populate Demographic Info
    Object.entries(sampleSelected[0]).forEach(([key, value]) => {
        d3.select('#sample-metadata').append("h5").text(`${key}: ${value}`)
    }); 
};

// update when sample is changed
function optionChanged(value) {
    console.log(value);
    init(value);
}