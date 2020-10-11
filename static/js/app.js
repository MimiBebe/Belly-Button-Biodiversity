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

        // clear teh panel
        metaDataPanel.html("");

        //  populate metadata
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


// both values and text displayed in drop down are names in json
function addOptions(url) {
    d3.json(url).then(function(data) {

        data.names.forEach((name) => {
            //  append the drop down menu
            var appendOption = selectDropdown.append("option").text(name).attr('value', name);
            // console.log(appendOption)
        });

    });
}



// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function initHtml(url) {
    // populate drop down menu
    addOptions(dataUrl);

    optionChanged(940);
   
  }

initHtml(dataUrl)


function updatePlotly() {
    // populate drop down menu
    addOptions(dataUrl);

    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var subjectId = dropdownMenu.property("value");

    optionChanged(subjectId);
  }