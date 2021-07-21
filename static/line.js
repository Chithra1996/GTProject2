function init(){
var dropdownMenu = d3.select("#selDataset");
var dropdownMenu2 = d3.select("#selDataset2");
var universities = ["Harvard University", "Stanford University", "University of Oxford",
        "Massachusetts Institute of Technology", "University of Cambridge", "University of California, Berkeley",
        "Princeton University", "University of Chicago", "Yale University",
        "Imperial College London", "California Institute of Technology"];
universities.forEach((university) => {
      dropdownMenu
      .append("option")
      .text(university)
      .property("value", university);
});
universities.forEach((university) => {
      dropdownMenu2
      .append("option")
      .text(university)
      .property("value", university);
});

  linechart(universities[0])
}
// Run the function
init();

// Call optionChanged when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", optionChanged);
d3.selectAll("#selDataset2").on("change", optionChanged);

// Function is called when a OTU is selected from dropdown menu
function optionChanged() {
// Use d3 to select dropdown menu
var dropdownMenu = d3.select("#selDataset");
var dropdownMenu2 = d3.select("#selDataset2");
// assign the value of the dropdown menu option to a variable
var selectedoption = dropdownMenu.property("value");
var selectedoption2 = dropdownMenu2.property("value");
console.log(selectedoption)
console.log(selectedoption2)
linechart(selectedoption)
}


function linechart(selectedoption) {
  d3.json("/sqldata").then(function(data){
    console.log(data);
  //Using Harvard as our initial university for times
  function initUni(university){
  return university.university_name == selectedoption;
  };    
  // Adding another line
  function initUni2(university){
  return university.university_name == "University of Chicago";
  };
//Filtering data to where university is Harvard
var initPlotData = data.filter(initUni);
var initPlotData2 = data.filter(initUni2);

//console.log(initPlotData);
var xValues = initPlotData.map(x => x.year).slice(0,10);
var yValues = initPlotData.map(x => x.world_rank).slice(0,10);
var yValues2 = initPlotData2.map(x => x.world_rank).slice(0,10);
new Chartist.Line('.ct-chart', {
labels: xValues,
series: [
  yValues,
  yValues2
]
}, {
fullWidth: true,
chartPadding: {
right: 40
},
axisX:{ axisTitle: 'Year' },
  axisY: {
  axisTitle: 'University Rank',
  onlyInteger: true,
  low: 0
  }
  });
  })
  .catch(err =>console.log(err));      
}
