// console.log('___GOOD MORNING, BELLY BUTTON OWNERS!!!___');

// Get samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let globalData = null;

// Fetch the JSON data and console log it
console.log("FETCHING JSON...")
d3.json(url).then(function(data) {
    
    // log to console the data and the confirmation of its receipt
    console.log("***JSON FETCHED SUCCESSFULLY***");
    console.log(data);
    globalData = data;
    init();
});

// Initialize and refresh dashboard
function init() {

    console.log(globalData)
    // Use D3 to select dropdown menu
    let dropdownMenu = d3.select('#selDataset');

    // get sample names and populate them in dropdownMenu
    d3.json(url).then(data => {

        // get names array
        let names = data.names;

        // add to dropdownMenu
        names.forEach(id => {
            dropdownMenu.append("option")
                .text(id)
                .property("value", id)   
        })
    
        // set sample for initial page load
        let initSample = names[1]
        // console.log(initSample)

        // build init plots
        buildBarChart(initSample)
        // buildBubbleChart(initSample)
        // buildMetadata(initSample)
    })
}

function getSample(sampleChoice) {

    d3.json(url).then(data => {
        
        // Get all sample data
        let sampleData = data.samples;
        
        // isolate given ID's sample data
        let sampleSelected = sampleData.filter(x => x.id == sampleChoice);
    
        // parse sample data
        let otu_ids = sampleSelected[0].otu_ids;
        let otu_labels = sampleSelected[0].otu_labels;
        let sample_values = sampleSelected[0].sample_values;

    });
}

// [2] - building bar chart that shows the top 10 OTUs in the given individual in the dropdown
function buildBarChart(sampleChoice) {

    d3.json(url).then(data => {
        
        // Get all sample data
        let sampleData = data.samples;
        
        // isolate given ID's sample data
        let sampleSelected = sampleData.filter(x => x.id == sampleChoice);
    
        // parse sample data
        let otu_ids = sampleSelected[0].otu_ids;
        let otu_labels = sampleSelected[0].otu_labels;
        let sample_values = sampleSelected[0].sample_values;
        
        // get top ten
        let xData = sample_values.slice(0,10).reverse();
        let yData = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();  // WHY????
        let labels = otu_labels.slice(0,10).reverse(); 
        
        // log sample data
        // console.log("OTU IDs: ", yData, "Labels: ", xData, "Values: ", labels[0]);
        
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
            title: `Top 10 OTUs present in ID: ${sampleSelected[0].id}`,
            bargap: 0.40,
            paper_bgcolor: 'rgba(245, 246, 249, 1)',
            plot_bgcolor: 'rgba(245, 246, 249, 0)'
        };

        // plot the bar chart
        Plotly.newPlot("bar", chartData, layout);
    });
};


// [3] - building bubble chart displaying each sample
function buildBubbleChart(sampleID) {

    d3.json(url).then(data => {
        
        // Get all sample data
        let sampleData = data.samples;
        
        // isolate given ID's sample data
        let sampleSelected = sampleData[sampleID];
    
        // define data
        let otu_ids = sampleSelected.otu_ids; // [X AND colors] JUST AN ID NUMBER, NOT A MEASUREMENT
        let sample_values = sampleSelected.sample_values; // [Y AND marker size] this is a measurement
        let otu_labels = sampleSelected.otu_labels; // [text]

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
                title: "OTU ID",
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
    });
};

// retrieve and display Subject ID's METADATA
function buildMetadata(sampleID) {
    d3.json(url).then(data => {
        
        // get 'metadata' array
        let metadata = data.metadata;

        // isolate given ID's METADATA object
        let sampleSelected = metadata[sampleID]
        
        // log metadata object to console 
        console.log("Metadata: ",sampleSelected)
        
        // clear html "Demographic Info"
        d3.select('#sample-metadata').html("");

        //
        Object.entries(sampleSelected).forEach(([key, value]) => {
            d3.select('#sample-metadata').append("h5").text(`${key}: ${value}`)
        }); 


    });
};


const x = 4
// buildBarChart(x);
// buildBubbleChart(x);
// buildMetadata(x);
// init()

// adjust this to take the dropdown selection (14.3.last)
// also need to populate the dropdown WITH those values

// unify data-get in one function (use of ID rather than current use of index, sampleID)
    // need to use `.filter(x => x.property)

// update all when sample is changed
// function newSelection() {}