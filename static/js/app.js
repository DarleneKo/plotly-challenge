// // Creat a Function to Get the Data
// function getData() {
        // var data;
//     // Fetch the JSON data and console log it
//         d3.json("samples.json").then(function(promiseData) {
//          data = promiseData

//     });
//   return data
// }

// const data = getData();

d3.json('samples.json').then(function(data){
    console.log(data);
    function buildInfo(data) {

        // Fetch the JSON data and console log it
            // d3.json("samples.json").then(function(data) {
            //     console.log(data);
        
        // Promise Pending
            // const dataPromise = d3.json("samples.json");
            //     console.log("Data Promise: ", dataPromise);
    
        // Grab values from the data json object to build the list of Subect ID Numbers
            var names = data.names;
                console.log(names);
    
            var static = d3.select("#selDataset")
            names.forEach(function(name){
                static.append("option")
                .text(name)
                .attr("value", name)
            })
        }
    function buildPlots(data,name) {
    
        // // Fetch the JSON data and console log it
        //     d3.json("samples.json").then(function(data) {
        //         console.log(data);
    
        // // Promise Pending
        //     const dataPromise = d3.json("samples.json");
        //         console.log("Data Promise: ", dataPromise);
    
        // Grab values from the data json object to build the Bar Chart and Bubble Chart for first Subject
            // var sample = data.samples[0];
        
            var meta = data.metadata.forEach(function(metadata){
                if (metadata.id===name){
                    return(metadata)
                }
            })
            var sample

            data.samples.forEach(function(sampleData){
                if (sampleData.id===name){
                    sample = sampleData
                }
            })
    
        // Create the trace for Bar Chart
            var trace1 = {
                x: sample.sample_values.slice(0, 10).reverse(),
                y: sample.otu_ids.slice(0, 10).map(number => `OTU ID ${number}`).reverse(),
                hovertext: sample.otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            };
      
        // Create the data array for the Bar Chart
            var data1 = [trace1];
      
        // Define the plot layout for the Bar Chart
            var layout1 = {
                title: "Top 10 Samples per Subject",
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 100
                }
            };
          
        // Plot the chart to a div tag with id "bar"
            Plotly.newPlot("bar", data1, layout1);
    
        // Create the trace for Bubble Chart
            var trace2 = {
                x: sample.otu_ids,
                y: sample.sample_values,
                mode: "markers",
                marker: {
                    size: sample.sample_values,
                    //color = d3.scale.category20c(),
                    color: sample.otu_ids
                },
                hovertext:  sample.otu_labels
            };
    
        // Create the data array for the Bubble Chart
            var data2 = [trace2];
    
        // Define the plot layout for the Bubble Chart
            var layout2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
        // Plot the chart to a div tag with id "bubble"
            Plotly.newPlot("bubble", data2, layout2); 
        }
    buildInfo(data);

    d3.select('#selDataset').on('change',function(){
        name =  d3.select(this).property('value');
        console.log(name)
        buildPlots(data,name);
    })
    
})

// // Create a Function to Provide Demographic Information
// function buildInfo() {

//     // Fetch the JSON data and console log it
//         d3.json("samples.json").then(function(data) {
//             console.log(data);
    
//     // Promise Pending
//         const dataPromise = d3.json("samples.json");
//             console.log("Data Promise: ", dataPromise);

//     // Grab values from the data json object to build the list of Subect ID Numbers
//         var names = data.names;
//             console.log(names);

//         var static = d3.select("#selDataset")
//         names.forEach(function(name){
//             static.append("option")
//             .text(name)
//             .attr("value", name)
//         })
//     });
// }

// buildInfo();

// // Create a Function to Build both Bar Chart and Bubble Chart
// function buildPlots() {
    
//     // Fetch the JSON data and console log it
//         d3.json("samples.json").then(function(data) {
//             console.log(data);

//     // Promise Pending
//         const dataPromise = d3.json("samples.json");
//             console.log("Data Promise: ", dataPromise);

//     // Grab values from the data json object to build the Bar Chart and Bubble Chart for first Subject
//         var sample = data.samples[0];
    
//         var meta = data.metadata.forEach(function(metadata){
//             if (metadata.id===name){
//                 return(metadata)
//             }
//         })

//     // Create the trace for Bar Chart
//         var trace1 = {
//             x: sample.sample_values.slice(0, 10).reverse(),
//             y: sample.otu_ids.slice(0, 10).map(number => `OTU ID ${number}`).reverse(),
//             hovertext: sample.otu_labels.slice(0, 10).reverse(),
//             type: "bar",
//             orientation: "h",
//         };
  
//     // Create the data array for the Bar Chart
//         var data1 = [trace1];
  
//     // Define the plot layout for the Bar Chart
//         var layout1 = {
//             title: "Top 10 Samples per Subject",
//             margin: {
//                 l: 100,
//                 r: 100,
//                 t: 100,
//                 b: 100
//             }
//         };
      
//     // Plot the chart to a div tag with id "bar"
//         Plotly.newPlot("bar", data1, layout1);

//     // Create the trace for Bubble Chart
//         var trace2 = {
//             x: sample.otu_ids,
//             y: sample.sample_values,
//             mode: "markers",
//             marker: {
//                 size: sample.sample_values,
//                 //color = d3.scale.category20c(),
//                 color: sample.otu_ids
//             },
//             hovertext:  sample.otu_labels
//         };

//     // Create the data array for the Bubble Chart
//         var data2 = [trace2];

//     // Define the plot layout for the Bubble Chart
//         var layout2 = {
//             xaxis:{title: "OTU ID"},
//             height: 600,
//             width: 1000
//         };

//     // Plot the chart to a div tag with id "bubble"
//         Plotly.newPlot("bubble", data2, layout2); 
//     });
// }






// buildPlots();