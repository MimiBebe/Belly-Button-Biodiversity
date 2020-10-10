const dataUrl = "./samples.json";

var selectDropdown = d3.select("#selDataset");

function optionChanged(subjectId){
    getMetaData(subjectId);
}

function getMetaData(metaDataTable,id){

    d3.select("#sample-metadata")
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
        // keys in "metadat" are: "id", "ethnicity", "gender", "age", "location", "bbtype", "wfreq"
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

addOptions(dataUrl);


// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
   
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var subjectId = dropdownMenu.property("value");

    subjectId = optionChanged(dropdownMenu.value);


    console.log(subjectId);

  }