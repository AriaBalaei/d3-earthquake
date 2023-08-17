const canvas = d3.select('.canva');

let width = '100%';
let height = '100%';
const api_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
//const api_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
const svg = canvas.append('svg')
  .attr('width', width)
  .attr('height', height)

//JSON
d3.json(api_url).then(data => {
  console.log(data)
    const circle = svg.selectAll('circle')
        .data(data.features);
  
    circle.enter().append('circle')    
      .attr('cx', (d, i) => Math.floor(Math.random() * 450) + (d.properties.mag * 2))
      .attr('cy', (d, i) => Math.floor(Math.random() * 100) + d.properties.mag + 4)
      .attr('r', (d, i) => (d.properties.mag)*2)  
      .style('top', '156')
      
      .on('mouseover', function(event){
        console.log(event.target);
         d3.select(event.target)
         .transition()
         .duration(100)//100 ms
         .style('opacity', '0.7')
         
      })

      .on('mouseout', function(event){
        console.log(event.target);
         d3.select(event.target)
         .transition()
         .duration(100)//100 ms
         .style('opacity', '1')
      })
      .attr('fill', (d, i) => d.properties.alert)  
 
})
