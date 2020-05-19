// Fetch the JSON data and console log it
d3.json('samples.json').then(function(data){
    console.log(data);

    // Create a Function to Build the List of Subject ID Numbers
    function buildId(data) {

        // Grab values from the data json object to build the list of Subect ID Nos.
        var names = data.names;
            console.log(names);
        
        // Define variable to select the Dropdown Menu Option from HTML file and append the Looped through Subject ID Nos.
        var static = d3.select("#selDataset")
            names.forEach(function(name){
            static.append("option")
            .text(name)
            .attr("value", name)
            }) 
    }
    

    // Creat a Function to Build the Demographic Information
    function buildDemographic(data,name) {

        // Grab values from the data json object by matching on Subject ID No. to build the Demographic Information
        var meta = data.metadata.forEach(function(metadata){
            if (metadata.id==name){
                return(metadata)
            }
        })

        // Define variable to later be utilized after Looping through Entire Row of Data
        var subject

            data.metadata.forEach(function(subjectData){
                if (subjectData.id==name){
                    subject = subjectData
                }
            })
        
        // Select Demographic Panel to a div tag with id "sample-metadata" from HTML file to place data
       var demographicInfo = d3.select("#sample-metadata");
        
       // Clear the Demographic Panel each time before a new Subject ID No. is selected
        demographicInfo.html("");
  
       // Extract the key and value pair after looping through the Metadata and Appending to the Demographic Panel
        Object.entries(subject).forEach(([key, value]) => {   
            demographicInfo.append("h6").text(`${key}:${value}`);    
        });
    }


    // Create a Function to Build the Bar Chart and Bubble Chart  
    function buildPlots(data,name) {
    
        // Grab values from the data json object by matching on Subject ID No. to build the Bar Chart and Bubble Chart
        var meta = data.metadata.forEach(function(metadata){
            if (metadata.id==name){
                return(metadata)
            }
        })

        // Define variable to later be utilized after Looping through Entire Row of Data
        var sample

            data.samples.forEach(function(sampleData){
                if (sampleData.id==name){
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
            title: "Top 10 Samples per Selected Subject",
            margin: {
                t: 100,
                b: 100,
                l: 100,
                r: 100
            }
        };
          
        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data1, layout1);
    
        // Create the trace for Bubble Chart
        var trace2 = {
            x: sample.otu_ids,
            y: sample.sample_values,
            hovertext:  sample.otu_labels,
            mode: "markers",
            marker: {
                size: sample.sample_values,
                color: sample.otu_ids
            }
        };
    
        // Create the data array for the Bubble Chart
        var data2 = [trace2];
    
        // Define the plot layout for the Bubble Chart
        var layout2 = {
            title: "All Samples per Selected Subject",
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200
        };
    
        // Plot the chart to a div tag with id "bubble"
        Plotly.newPlot("bubble", data2, layout2); 
    }
    
    // Call the buildId Function
    buildId(data);

    // Call the buildDemographic and buildPlots Functions after attaching an Event Listener to select a Subject ID from Dropdown Menu
    d3.select('#selDataset').on('change',function(){
        name =  d3.select(this).property('value');
        console.log(name);
        buildDemographic(data,name);
        buildPlots(data,name);
    })


    // Create a Function to Display the Initial Data Rendering on the First Subject ID No. 940
    function init() {
        var firstSample = data.names[0];
        buildDemographic(data,firstSample);
        buildPlots(data,firstSample);
    }
    
    // Call the init Function
    init();

})