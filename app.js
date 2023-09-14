
d3.json('samples.json').then(({ names }) => {
    names.forEach(name => {
        d3.select('select').append('option').text(name)
    });

    optionChanged();
});

const optionChanged = () => {
    let choice = d3.select('select').node().value;

    d3.json('samples.json').then(({ metadata, samples }) => {

        let meta = metadata.filter(obj => obj.id == choice)[0];
        let sample = samples.filter(obj => obj.id == choice)[0];

        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key, val]) => {
            d3.select('.panel-body').append('h4').text(`${key}: ${val}`)
        });

        let { otu_ids, sample_values, otu_labels } = sample;

        var data = [
            {
                x: sample_values.slice(0, 10).reverse(),
                y: otu_ids.slice(0, 10).reverse().map(x => `OTU ${x}`),
                text: otu_labels.slice(0, 10).reverse(),
                type: 'bar',
                orientation: "h"
            }
        ];

        Plotly.newPlot('bar', data);

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              size: sample_values,
              colorscale: "Earth"
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Bubble Chart Hover Text',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data);

          var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: meta.wfreq,
              title: { text: "<b> Belly Button Washing Frequency </b><br> Scrubs per Week" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 9] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gauge', data, layout);

        console.log(meta, sample);
    })
}