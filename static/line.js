function init(){
  d3.json("/sqldata").then(function(data){
      var dropdownMenu = d3.select("#selDataset");
      var dropdownMenu2 = d3.select("#selDataset2");
      //Creating years for dropdown menu
      //var years = [2011, 2012, 2013, 2014, 2015, 2016];
      //Variable to populate dropdown menu
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
      //Using Harvard as our initial university for times
      function initUni(university){
          return university.university_name == "Harvard University";
      };
    
      //Filtering data to where university is Harvard
      var initPlotData = data.filter(initUni);
      //console.log(initPlotData);
      
      var xValues = initPlotData.map(x => x.year).slice(0,10);
      var yValues = initPlotData.map(x => x.world_rank).slice(0,10);
      //var yValuesCwur = initPlotDataCwur.map(x => x.world_rank).slice(0,10)
      //console.log(yValues);
      var selectedUniversity = dropdownMenu.property("value");
  new Chartist.Line('.ct-chart', {
    labels: xValues,
    series: [
      yValues
    ]
  }, {
    fullWidth: true,
    chartPadding: {
      right: 40
    },
    axisX:{
      axisTitle: 'Year'
    },
    axisY: {
      axisTitle: 'University Rank',
      onlyInteger: true,
      //offset: 20
      low: 0
    }
  });
  //dropdownMenu2.html('');
})
}; //end of init function
d3.selectAll("#selDataset").on("change", buildLinePlot);
d3.selectAll("#selDataset2").on("change", buildLinePlot);
function buildLinePlot(){
d3.json("/sqldata").then(function(data){
  var dropdownMenu = d3.select("#selDataset");
  var dropdownMenu2 = d3.select("#selDataset2");
  var universities = ["Harvard University", "Stanford University", "University of Oxford",
      "Massachusetts Institute of Technology", "University of Cambridge", "University of California, Berkeley",
      "Princeton University", "University of Chicago", "Yale University",
      "Imperial College London", "California Institute of Technology"];
  //console.log(universities);

  var selectedUniversity = dropdownMenu.property("value");
  var selectedUniversity2 = dropdownMenu2.property("value");
  //console.log(selectedUniversity);
  //Creating function that finds data with university equal to selected dropdown
  function filterUniversity(university){
    return university.university_name == selectedUniversity;
  };
  function filterUniversity2(university){
    return university.university_name == selectedUniversity2;
  };
  var correctUniversities = data.filter(filterUniversity);
  //console.log(correctUniversities);
  var correctUniversities2 = data.filter(filterUniversity2);
  var xValues = correctUniversities.map(x => x.year).slice(0,10);
  var yValues = correctUniversities.map(x => x.world_rank).slice(0,10);
  var yValues2 = correctUniversities2.map(x => x.world_rank).slice(0,10);
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
    axisX:{
      axisTitle: 'Year'
    },
    axisY: {
      axisTitle: 'University Rank',
      onlyInteger: true,
      //offset: 20
      low: 0
    }
  });
})
//dropdownMenu.html('');
}
init();