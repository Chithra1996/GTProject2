d3.json('sqldata').then(function(data){
    var dataDiv = d3.select("#put-data-here");
        dataDiv.html("");
        var dataTable = dataDiv.append("table");
        dataTable.attr("class", "table table-striped table-hover");
        var dataHead = dataTable.append("thead").append("tr");
        var dataBody = dataTable.append("tbody");
        Object.keys(data[0]).forEach(col => {
            dataHead.append("th").text(col);
        })
//This populates table
        data.forEach(obj => {
            var row = dataBody.append("tr");
            Object.values(obj).forEach(cell => {
                //console.log(cell)
                row.append("td").text(cell);
            })
        })
})
