import { select, selectAll } from "d3-selection";
import { histogram, extent } from "d3-array";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { max } from "d3";

let width = 500;
let height = 500;
let margin = { top: 10, left: 30, right: 10, bottom: 10 };

csv(require("./data/Video_Games_Sales_as_at_22_Dec_2016.csv")).then((data) => {
  data.map((d) => (d.Year_of_Release = +d.Year_of_Release));
  console.log(data);
  render(data);
});

function render(incomingData) {
  let innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;
  let svg = select("div.dataViz")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let g = svg
    .append("g")
    .attr("transform", `translate(${margin.top}, ${margin.bottom})`);

  let x = scaleLinear()
    .domain(extent(incomingData, (d) => d.Year_of_Release))
    .range([margin.left, innerWidth]);

  let xAxis = axisBottom(x);

  let gXAxis = g
    .append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${innerHeight - margin.bottom})`)
    .call(xAxis);

  let h = histogram().value((d) => {
    return d.Year_of_Release;
  });

  let bins = h(incomingData);
  console.log(bins);

  let y = scaleLinear()
    .domain([max(bins, (d) => d.length) + 1000, 0])
    .range([0, innerHeight]);

  let yAxis = axisLeft(y);

  let gYAxis = g
    .append("g")
    .attr("class", "YAxis")
    .attr("transform", `translate(${margin.left}, ${-margin.bottom})`)
    .call(yAxis);

  g.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d.x0) + 2)
    .attr("y", (d) => y(d.length) - margin.bottom)
    .attr("height", (d) => {
      return innerHeight - y(d.length);
    })
    // .attr("transform", (d) => {
    //   return `translate(${0}, ${y(d.length) - margin.bottom})`;
    // })
    .attr("width", 10)
    .style("fill", "#e63946");
}
