function buildMetadata(sample) {
    var url = `/metadata/${sample}`;
    d3.json(url).then(function(data) { 
      console.log(data);
      var metaSample = d3.select("#sample-metadata");
      metaSample.html("");
      Object.entries(data).forEach(([key,value]) => {
        metaSample.append("h6").text(`${key}:${value}`);
      });
  
  
  
  
  
  
        buildGauge(data.WFREQ);
    
  });
  };
    
        
      
  
      
  //     buildPlot();
  // //   // @TODO: Complete the following function that builds the metadata panel
  
  // //   // Use `d3.json` to fetch the metadata for a sample
  // //   // Fetch the JSON data and console log it
  // //   // Use d3 to select the panel with id of `#sample-metadata`
  // //   // Use `.html("") to clear any existing metadata
  // // var url = "/samples/<sample>";
  
  // //   // d3.json(/metadata/${sample}).then(function(data) { 
  // //   //   var metaSample = d3.select(“#sample-metadata”)};
  // //   //   console.log(data);
   
   
  
     
  // // dataSample.html("")
  // //     // Use `Object.entries` to add each key and value pair to the panel
  // //     // Hint: Inside the loop, you will need to use d3 to append new
  // //     // tags for each key-value in the metadata.
  
      // BONUS: Build the Gauge Chart
  //   buildGauge(data.WFREQ);
    
  //   }):
  // }
  
   function buildCharts(sample) {
    var url = `/samples/${sample}`;
    d3.json(url).then(function(data) { 
    
      console.log(data);
      
      var data = [
        {
        labels:data ["otu_ids"].slice (0,10),
        values:data["sample_values"].slice(0,10),
        hovertext:data["otu_labels"].slice(0,10),
        type: "pie"
    }];
    var layout = {title: "Bacteria Pie Chart",
  
    };
    Plotly.newPlot("pie",data,layout);
  

    
      var trace = [
          {
          x:data ["otu_ids"],
          y:data["sample_values"],
          text:data["otu_labels"],
          mode: 'markers',
          marker: {
              size:data ["sample_values"],
              color:data["otu_ids"]
            }
      }];
      
      var data2 = [trace];
      var layout = {
        title: "Bacteria Bubble  Chart",
       
      
    
      };
      Plotly.newPlot("bubble",data2,layout);
    });
  }
  

    
  
  
  
   
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
  //   // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  //  Initialize the dashboard
  init();
  