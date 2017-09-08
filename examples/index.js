
var chrono, domain, height, margin, moment, width, x1, x2, x3, x4;

moment = require('moment-timezone');
chrono = require('chronological');
moment = chrono(moment);

var d3 = Object.assign({},
    require("d3-scale"),
    require("d3-time"),
    require("d3-selection"),
    require("d3-axis"),
    require('../')
);


margin = {
  top: 20,
  right: 30,
  bottom: 20,
  left: 30
};
width = 1160 - margin.left - margin.right;
height = 50 - margin.top - margin.bottom;
//note: DST boundary is at 2:00AM on 3/12.
domain = [moment.utc('2017-03-10T08:00:00Z'), moment.utc('2017-03-14T05:00:00Z')];

var timeFormatter = function(d) {
  var time;
  time = moment(d);
  if (time.hour() > 0) {
    return time.format('h:mma MMM D');
  } else {
    return time.format('MMM D');
  }
};


function addExampleAxis(elId, scale){
  var el = d3.select(elId).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g').attr('transform', "translate(" + margin.left + "," + margin.top + ")");

  el.append('g')
      .attr('class', 'x axis')
      .call(d3.axisBottom()
          .scale(scale)
          .tickFormat(timeFormatter)
          .ticks(6)
      );
}


//x1 = d3.scaleTime().domain(domain).nice(d3.utcDay).range([0, width]);
x1 = d3.scaleTime().domain(domain).range([0, width]);
addExampleAxis('#e1', x1);


//x2 = d3.scaleUtc().domain(domain).nice(d3.utcDay).range([0, width]);
x2 = d3.scaleUtc().domain(domain).range([0, width]);
addExampleAxis('#e2', x2);


//x3 = d3.scaleTimezone('UTC').domain(domain).nice(moment().tz('UTC').startOf('d').every(1, 'd')).range([0, width]);
x3 = d3.scaleTimezone('UTC').domain(domain).range([0, width]);
addExampleAxis('#e3', x3);


//x4 = d3.scaleTimezone('US/Eastern').domain(domain).nice(moment().tz('US/Eastern').startOf('d').every(1, 'd')).range([0, width]);
x4 = d3.scaleTimezone('US/Eastern').domain(domain).range([0, width]);
addExampleAxis('#e4', x4);

