function init(){
    d3.json("/sqldata").then(function(data){
        var dropdownMenu = d3.select("#selDataset");
        //Creating years for dropdown menu
        var years = [2011, 2012, 2013, 2014, 2015, 2016];
        years.forEach((year) => {
            dropdownMenu
            .append("option")
            .text(year)
            .property("value", year);
        });
        //Using 2011 as our initial year
        function yearFilter(year){
            return year.year == "2011";
        };
        //Filtering data to where year is 2011
        var initPlotData = data.filter(yearFilter);
        //console.log(initPlotData);
        var dataDiv = d3.select("#put-data-here");
        dataDiv.html("");
        var dataTable = dataDiv.append("table");
        dataTable.attr("class", "table table-striped table-hover");
        var dataHead = dataTable.append("thead").append("tr");
        var dataBody = dataTable.append("tbody");
        Object.keys(initPlotData[0]).forEach(col => {
            dataHead.append("th").text(col);
        })
        initPlotData.forEach(obj => {
            var row = dataBody.append("tr");
            Object.values(obj).forEach(cell => {
                //console.log(cell)
                row.append("td").text(cell);
            })
        })
  })
}; //end of init function
//Calling new function when year on dropdown menu is selected/changed
d3.selectAll("#selDataset").on("change", buildLinePlot);
function buildLinePlot(){
  d3.json("/sqldata").then(function(data){
    var dropdownMenu = d3.select("#selDataset");
    var selectedValue = dropdownMenu.property("value");
    //Creating function that finds data with year equal to selected dropdown
    function filterYear(year){
      return year.year == selectedValue;
    };
    var correctYear = data.filter(filterYear);
    console.log(correctYear);
    var dataDiv = d3.select("#put-data-here");
        dataDiv.html("");
        var dataTable = dataDiv.append("table");
        dataTable.attr("class", "table table-striped table-hover");
        var dataHead = dataTable.append("thead").append("tr");
        var dataBody = dataTable.append("tbody");
        Object.keys(correctYear[0]).forEach(col => {
            dataHead.append("th").text(col);
        })
        correctYear.forEach(obj => {
            var row = dataBody.append("tr");
            Object.values(obj).forEach(cell => {
                //console.log(cell)
                row.append("td").text(cell);
            })
        })  
   ;
  })
}
init();