// Function used to create a table upon init and drop down select
function createDataTable(selected){
    // This one sends a request the byCamp route we set up in app.py
    // We're using the format to insert the bootcamp we want results for
    d3.json('/sqldata').then(bcmp => {
        // Logging the result for educational purposes
        console.log(bcmp);
        

        // As you can see, the data is in kind of a funky format for table building,
        //  so we're going to reformat it.

        // We're going to build an array of objects, each object representing a row in the table.
        // The object's keys will be the column name and the value will be the particular id's value for that key
        var tabularData = []

        Object.entries(bcmp).forEach(([col, rows]) => {
            Object.entries(rows).forEach(([stu_id, stu_data]) => {
                // findIndex will iterate through a list and find an object based on a callback function you give it
                // like indexOf, it will return -1 if the object is not found
                // We're using this to see whether the student has already been added to our array
                var studentIndex = tabularData.findIndex(obj => obj.student_id == `${stu_id}`);

                if (studentIndex != -1) {
                    tabularData[studentIndex][col] = stu_data;
                } else {
                    var temp = {}
                    temp["student_id"] = `${stu_id}`;
                    
                    if (col != "student_id") {
                        temp[col] = stu_data;
                    }
                    
                    tabularData.push(temp);
                }
            })
        })

        // Logging for educational purposes
        console.log(tabularData);

        // Here, we're grabbing onto the div and making sure to clear it as this table is built by appending
        //  things and we want to ensure we're not appending to the end of an old table.
        var dataDiv = d3.select("#put-data-here");
        dataDiv.html("");

        var dataTable = dataDiv.append("table");
        dataTable.attr("class", "table table-striped table-hover");
        var dataHead = dataTable.append("thead").append("tr");
        var dataBody = dataTable.append("tbody");

        // Here, we're adding the table header. 
        // We're also assuming that all ids have the same columns and are therefore only
        // adding the columns of the first object in tabularData
        Object.keys(tabularData[0]).forEach(col => {
            dataHead.append("th").text(col);
        })

        // Here, we're adding the table rows.
        tabularData.forEach(obj => {
            var row = dataBody.append("tr");
            Object.values(obj).forEach(cell => {
                row.append("td").text(cell);
            })
        })
    })
}
