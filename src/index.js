import { select, selectAll } from "d3-selection";
import { histogram } from "d3-array";
import { csv } from 'd3-fetch';

let width = 500;
let height = 500;
let margin = { top: 10, left: 10, right: 10, bottom: 10 };



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

  let h = histogram();
  console.log(h);
}
