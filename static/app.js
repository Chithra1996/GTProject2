// Create init function
function init(){

  //Read the data
  d3.json("data/time.json").then((data)=> {
     console.log(data);
     var top = (data.slice)(0,9);
     console.log(top)
     var names =[]
     for (var i = 0; i< top.length; i++) {
        names.push(top[i].university_name)
     }
     console.log(names)
     // Appending ids on dropdown
     names.forEach((id) => {
         d3.select("#selDataset")
         .append("option")
         .text(id)
         .property("value");
     });
     // Choosing the first subject 
     console.log(names[0]);
    // buildbar(names[0]);
    // buildbubble(names[0]);
     demographics(names[0])

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
//buildbar(selectedoption);
//buildbubble(selectedoption);
demographics(selectedoption)

}

// Function for the demographics info table
function demographics(selectedoption){
 d3.json("time.json").then((data)=> {
    var top = (data.slice)(0,9);
    var info_data =[]
    for (var i = 0; i< top.length; i++) {
        info_data.push(top.filter(object => object[i].toString() === selectedoption)[0]);
    }

         //var details = info_data;
   console.log(info_data);
   


 });
};  
