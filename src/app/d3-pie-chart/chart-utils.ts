import * as d3 from "d3";

export function genedArc(innerRadius: number, outerRadius, growRatio?: number): d3.svg.Arc<d3.svg.arc.Arc> {
  if (growRatio) {
    innerRadius = innerRadius * (1 + growRatio);
    outerRadius = outerRadius * (1 + growRatio);
  }
  return d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
}
