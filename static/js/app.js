// console.log('___GOOD MORNING, BELLY BUTTON OWNERS!!!___');

// Get samples endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
console.log("FETCHING JSON...")
d3.json(url).then(function(data) {
    console.log("***JSON FETCHED SUCCESSFULLY***");
    console.log(data);
});

// [2] - building bar chart that shows the top 10 OTUs in the given individual in the dropdown
function buildBarChart(sampleID) {

    d3.json(url).then(data => {
        
        // Get all sample data
        let sampleData = data.samples;
        
        // isolate given ID's sample data
        let sampleSelected = sampleData[sampleID];
    
        // parse sample data
        let otu_ids = sampleSelected.otu_ids;
        let otu_labels = sampleSelected.otu_labels;
        let sample_values = sampleSelected.sample_values;
        
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
            title: `Top 10 OTUs present in ID: ${sampleID}`,
            bargap: 0.40,
            paper_bgcolor: 'rgba(245, 246, 249, 1)',
            plot_bgcolor: 'rgba(245, 246, 249, 0)'
        };

        // plot the bar chart
        Plotly.newPlot("bar", chartData, layout);
    });
};

buildBarChart(0); // adjust this to take the dropdown selection (14.3.last)

// [3] - building bubble chart displaying each sample
function buildBubbleChart(sampleID) {


    // define data
    let otu_ids = sampleSelected.otu_ids; // [X AND colors] JUST AN ID NUMBER, NOT A MEASUREMENT
    let sample_values = sampleSelected.sample_values; // [Y AND marker size] this is a measurement
    let otu_labels = sampleSelected.otu_labels; // [text]
}