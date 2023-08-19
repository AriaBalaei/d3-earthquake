const canvas = d3.select('.canva');

let width = '100%';
let height = '100%';
const api_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
//const api_url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson';
const svg = canvas.append('svg')
  .attr('width', width)
  .attr('height', height)

//Dfine div => tooltip
var div = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', '0')
//Time Function
function timeStamptoDate(mTime){
  var mDate = new Date(mTime);
    return mDate.toLocaleDateString('en-US')
}


//JSON
d3.json(api_url).then(data => {

    const circle = svg.selectAll('circle')
        .data(data.features);
  
    circle.enter().append('circle')    
      .attr('cx', (d, i) => Math.floor(Math.random() * 450) + (d.properties.mag * 2))
      .attr('cy', (d, i) => Math.floor(Math.random() * 100) + d.properties.mag + 4)
      .attr('r', (d, i) => (d.properties.mag)*2)  
      .style('top', '156')
      
      //Mouse Over
      .on('mouseover', (event) => {
        console.log(event);
      //  console.log(event.target);
         d3.select(event.target)
         .transition()
         .duration(100)//100 ms
         .style('opacity', '0.7')

         div.transition()
          .duration(200)
          .style('opacity', '0.89')

        div.html('<p> Mag: '+ event.srcElement.__data__.properties.mag +'</p>'
          + '<p> Time: ' +timeStamptoDate(event.srcElement.__data__.properties.time)+ '</p>' 
          + '<p> Place: '+ event.srcElement.__data__.properties.place.split(',')[1] +'</p>')
            .style('left', event.pageX +12 +'px')
            .style('top', event.pageY -20 + 'px')


      })
      
      //Mouse Out
      .on('mouseout', function(event){
        console.log(event.target);
         d3.select(event.target)
         .transition()
         .duration(100)//100 ms
         .style('opacity', '1')

         div.transition()
          .duration(450)
          .style('opacity', '0')

      })
      .attr('fill', (d, i) => d.properties.alert)  
 
})
