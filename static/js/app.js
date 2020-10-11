const dataUrl = "./samples.json";

var selectDropdown = d3.select("#selDataset");

function optionChanged(subjectId){
    getMetaData(subjectId);
    drawBarChart(subjectId);
    drawBubleChart(subjectId);
    // upddatePlot(subjectId);
}

function drawBarChart(subjectId){
    d3.json(dataUrl).then((data) => {

        var allSamples = data.samples;
        var subjectSampleArray = allSamples.filter(s => s.id == subjectId);
        // console.log(subjectSamples)
        // first position has the array of interest
        var subjectSamples = subjectSampleArray[0];

        var subjectOtuIds = subjectSamples.otu_ids;
        var subjectOtuLabels = subjectSamples.otu_labels;
        var subjectSampleValue = subjectSamples.sample_values;

        var barYticks = subjectOtuIds.slice(0,10).map(otuId => `OTU ${otuId}`).reverse()

        var subjectBarData = {
            x: subjectSampleValue.slice(0,10).reverse(),
            y: barYticks,
            type: "bar",
            text: subjectOtuLabels.slice(0,10).reverse(),
            orientation: "h"
        }

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l:150}

        }

        Plotly.newPlot("bar",[subjectBarData],barLayout);

    });
}


function getMetaData(subjectId){
    
    d3.json(dataUrl).then((data) => {

        var allMetaData = data.metadata;
        var subjectMetaDataArray = allMetaData.filter(md => md.id == subjectId);
        // console.log(ubjectMetaDataArray)
        // first position has the array of interest
        var subjectMetaData = subjectMetaDataArray[0];
        var metaDataPanel = d3.select('#sample-metadata');
        metaDataPanel.html("");
        // console.log(subjectMetaData)
        Object.entries(subjectMetaData).forEach(([key,value]) => {

            var metaKeys = key;
            var metaValues = value;

            metaDataPanel.append("h5").text(`${key} : ${value}`)

        });

        
    });





}

function drawBubleChart(subjectId){
    console.log("drawBubleChart")
    console.log(subjectId)
}

// index value as value of drop down,
// values as text displayed in the drop down
// ie.: <option value="index">Text</option>
// function addOptions() {
//     d3.json(url).then(function(data) {
//         data.names.forEach((name, i) => {
//             var appendOption = selectDropdown.append("option").text(name).attr('value', i);
//             console.log(appendOption)
//         });
//     });
// }

// both values and text displayed in drop down are names in json
function addOptions(url) {
    d3.json(url).then(function(data) {

        // check to see how many keys in the samples data
        // 3 keys: names, metadata, samples
        // const keys = Object.keys(data);

        // var subjectNames = data.names;
        // var subjectMetadata = data.metadata;
        // var subjectSamples = data.samples;
        
        // check keys in each var above
        // keys in "metadata" are: "id", "ethnicity", "gender", "age", "location", "bbtype", "wfreq"
        // const subjectMetaKeys = Object.keys(subjectMetadata[0]);

        // keys in "samples" are: "id", "otu_ids", "sample_values", "otu_labels"
        // const subjectSamplesKeys = Object.keys(subjectSamples[0])

        data.names.forEach((name) => {
            //  append the drop down menu
            var appendOption = selectDropdown.append("option").text(name).attr('value', name);
            // console.log(appendOption)
        });

    });
}



// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function initHtml(url) {
    // populate drop down menu
    addOptions(dataUrl);

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var subjectId = dropdownMenu.property("value");

    // /optionChanged(subjectId);
    
    // get metadata
    getMetaData(subjectId)

    // console.log(subjectId);
    drawBarChart(subjectId)
  }

initHtml(dataUrl)