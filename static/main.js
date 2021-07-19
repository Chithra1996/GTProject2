function init(){
  var dropdownMenu = d3.select("#selDataset");
  //Creating years for dropdown menu
  var years = [2012, 2013, 2014, 2015];
  years.forEach((year) => {
      dropdownMenu
      .append("option")
      .text(year)
      .property("value", year);
  });

  console.log(years[0])
  barchart(years[0])
}
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
console.log(selectedoption)
barchart(selectedoption)
}
 

// Function for the demographics info table
function barchart(selectedoption){
 d3.json('/sqldata').then(data=>{
    console.log(data);
    function chosenyear(year){
    return year.year == selectedoption;
  };
  //Filtering data to where year is 2012
  var initPlotData = data.filter(chosenyear);
  //console.log(initPlotData);
  //Array of countries for 2012
  var countryArray2012 = initPlotData.map(x => x.country);
  // console.log(countryArray2012);
  var countryCount = [];
  for(var i =0; i < countryArray2012.length; i++){
     countryCount.push("1");
  }
  // console.log(countryCount);
       var trace1 = {
            x: countryArray2012,
            y: countryCount,
            type: "bar",
            marker: {color: "pink"}
        };
        // Apply the group bar mode to the layout
        var layout = {
            title: "Number of Universities per year",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100,
            }
        };
        var data = [trace1];
        Plotly.newPlot("bar", data, layout);  
      

   })
   .catch(err =>console.log(err));

  }


    