

function init(){
    d3.json("data/cwurData.json").then(function(data){
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
    })
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

barchart(selectedoption)

}

// Function for the demographics info table
function barchart(selectedoption){
    d3.json("data/cwurData.json").then(function(data){
        console.log(data)
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
        //Array of unique countries for 2012
        var uniqueCountries2012 = countryArray2012.filter((v, i, a) => a.indexOf(v) === i);
        // console.log(uniqueCountries2012);
        //Creating bar graph
        //This will create array of world ranks for 2012 cwur data
        var cwur_rank_2012 = initPlotData.map( x => x.world_rank);
        // console.log(cwur_rank_2012);
        //This will create array of universities for 2012 cwur data
        var cwur_uni_2012 = initPlotData.map( x => x.institution);
        // console.log(cwur_uni_2012);
    })
}


