// Create init function
function init(){

  //Read the data
  d3.json("data/times.json").then((timedata)=> {
     console.log(timedata);
     var newdata = [2012, 2013, 2014, 2015]
     console.log(newdata)
     // Appending ids on dropdown
     newdata.forEach((id) => {
         d3.select("#selDataset")
         .append("option")
         .text(id)
         .property("value");
     });
     // Choosing the first subject 
     console.log(newdata[1]);
     buildbar(newdata[1]);
     buildbubble(newdata[1]);
     demographics(newdata[1])

 });
};
// Run the function
init(); 

// Call optionChanged when a change takes place to the DOM
d3.selectAll("body").on("change", optionChanged);
// Function is called when a OTU is selected from dropdown menu
function optionChanged() {
 // Use d3 to select dropdown menu
 var dropdownmenu = d3.select("#selDataset");
 // assign the value of the dropdown menu option to a variable
 var selectedoption = dropdownmenu.property("value");

 // Build the plot with the new selected option 
 buildbar(selectedoption);
 buildbubble(selectedoption);
 demographics(selectedoption)
}

// Function for the demographics info table
function demographics(selectedoption){
 d3.json("samples.json").then((data)=> {
     // Create metadata variable
     var metadata = data.metadata;
     console.log(metadata);
     // find info by filtering id
     var info_data = metadata.filter(row => row.id.toString() === selectedoption)[0];
     // select #sample-metadata panel with d3
     var demo_Info = d3.select("#sample-metadata");
     // create variable and filter frequency for gauge chart 
     var wfreq = info_data.wfreq;
     console.log(wfreq);
     // clear the demographic info before entering new data
     demo_Info.html("");
     // Enter data to table by appending it to demo_Info
     Object.entries(info_data).forEach((key)=>{
         demo_Info.append("p").text(key[0].toUpperCase() + ": " + key[1]+ "\n");
     });
     // Build the gauge chart
     buildgauge(wfreq);
 });
};  

// Function for the bar plot
function buildbar(selectedoption){
 d3.json("samples.json").then((data)=> {
     var sample_data = data.samples.filter(object => object.id.toString() === selectedoption)[0];
     console.log(sample_data)
     // Slice the first 10 objects for sample_values
     var sliced_sample = (sample_data.sample_values.slice(0, 10)).reverse();
     // Slice the first 10 objects for otu_ids
     var sliced_otu_ids = (sample_data.otu_ids.slice(0,10)).reverse(); // 0 is inclusive, 10 is not. 
     console.log(sliced_otu_ids);
     // Slice the first 10 labels
     var slice_labels = (sample_data.otu_labels.slice(0, 10)).reverse();
     console.log(slice_labels);

     // Create a trace variable
     var trace = {
         x: sliced_sample,
         y: sliced_otu_ids.map(object => "OTU" + object),
         text: slice_labels,
         name: "OTU",
         type: "bar",
         orientation: "h",
         marker: {color: "pink"},
     };
     var bardata = [trace];
     // Apply the group bar mode to the layout
     var layout = {
         title: "Top 10 Bacteria Coultures Found",
         margin: {
             l: 100,
             r: 100,
             t: 100,
             b: 100,
         }
     };
     // Build the bar plot
     Plotly.newPlot("bar", bardata, layout);   
     
 });    

};
// Function for the bubble plot
function buildbubble(selectedoption){
 d3.json("samples.json").then((data)=> {
     var sample_data = data.samples.filter(object => object.id.toString() === selectedoption)[0];
     var otu_ids = sample_data.otu_ids;
     var sample_val = sample_data.sample_values;

     // Create a trace variable 
     var trace = {
         x: otu_ids,
         y: sample_val,
         text: sample_data.otu_labels,
         mode: 'markers',
         marker: {
             size: sample_val,
             color: otu_ids,
             // Change color scale 
             colorscale: 'Picnic',
             // Show color scale 
             showscale: true,
             colorbar: {
                 thickness: 10,
                 y: 0.5,
                 ypad: 0,
                 titleside: 'bottom',
                 outlinewidth: 1,
                 tickfont: {
                   family: 'Lato',
                   size: 14,
                   color: 'pink'
                 }
             } 
         }
     }
     var bubbledata = [trace];

     // Customize Layout 
     var layout = {
         xaxis:{title: "OTU ID"},
         title: "Bacteria Cultures Per Sample",
         // Change size of plot
         //height: 500,
        // width: 1000,
     }

     // Build the bubble plot
     Plotly.newPlot("bubble", bubbledata, layout); 
 });
}