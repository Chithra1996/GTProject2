// Function to build gauge chart
function buildgauge(wfreq) {
    var data = [
        {      
          type: "indicator",
          mode: "gauge+number",
          value: wfreq,
          title: { text: "<b> Belly Button Washing Fequency </b> <br> Scrubs per Week" , font: { size: 18 } },
          number: { font: { size: 62, color:'#11848C' }},
          gauge: {
            // Show all ticks from 0 to 9 
            axis: { range: [null, 9], tickwidth: 1, tickcolor: "#0B5587", nticks:10 },
            bar: { color: "#E6CC6E" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "Lavender",
            steps: [
              { range: [0, 1], color: "#F2FCFC" },
              { range: [1, 2], color: "#E5F9F9" },
              { range: [2, 3], color: "#D8F6F5" },
              { range: [3, 4], color: "#CBF3F2"},
              { range: [4, 5], color: "#BEF1EF" },
              { range: [5, 6], color: "#B0EEEC" },
              { range: [6, 7], color: "#A3EBE9" },
              { range: [7, 8], color: "#96E8E5" },
              { range: [8, 9], color: "#89E5E2" },
            ],
            threshold: {
              line: { color: "#7AB97A", width: 4 },
              thickness: 1.8,
              value: wfreq
            }
          }
        }
    ];
      
var layout = {
        width: 400,
        height: 300,
        margin: { t: 150, r: 25, l: 25, b: 5 },
        font: { color: "charcoal", family: "Arial"}
    };
      

    // Build the Gauge Chart
    Plotly.newPlot("gauge", data, layout);
}