import { useEffect, useRef } from "react";

import { scaleLinear, axisBottom, axisLeft, line, select, selectAll } from "d3";

import { setChartDimensions, getEntryDate } from "../lib/helpers";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import styled from "@emotion/styled";

// D3 Line-Chart Function
function drawChart(history) {
  const { margin, width, height } = setChartDimensions();

  const svg = select("#probability_history")
    .append("g")
    .attr("transform", `translate(${margin.left + 5}, ${margin.top})`);

  // Set X-Axis Scale according to number of data points
  const scaleX = scaleLinear()
    .domain([0, history.length])
    .range([0, width - 12]);

  const xAxisGenerator = axisBottom(scaleX);

  const tickLabels = history.map((entry) => entry.date);

  // Set number of ticks to data points and relabel with formatted date
  xAxisGenerator.ticks(history.length);
  xAxisGenerator.tickFormat((_, i) => tickLabels[i]);

  // Add X-Axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("class", `${history.length > 12 ? "x-axis-small" : ""}`)
    .call(xAxisGenerator);

  // Set Y-Axis scale between 0 and 1
  const scaleY = scaleLinear().domain([0, 1]).range([height, 0]);
  svg.append("g").call(axisLeft(scaleY));

  const repLine = line()
    .x(function (d) {
      return scaleX(d.x);
    })
    .y(function (d) {
      return scaleY(d.y[1]);
    });

  const pilytixLine = line()
    .x(function (d) {
      return scaleX(d.x);
    })
    .y(function (d) {
      return scaleY(d.y[0]);
    });

  svg
    .append("path")
    .datum(history)
    .attr("fill", "none")
    .attr("stroke", "var(--chart-orange)")
    .attr("stroke-width", 4)
    .attr("d", repLine);

  svg
    .append("path")
    .datum(history)
    .attr("fill", "none")
    .attr("stroke", "var(--chart-green)")
    .attr("stroke-width", 4)
    .attr("d", pilytixLine);
}

// Styles
const StyledBox = styled(Box)`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  && svg {
    @media only screen and (max-width: 400px) {
      transform: scale(0.8);
    }
  }

  && .x-axis-small {
    font-size: 9px;
    font-family: "Arial Narrow", Arial, sans-serif;
  }

  && .no-history {
    margin-right: calc(50% - 110px);

    @media only screen and (max-width: 600px) {
      margin-right: calc(60% - 110px);
    }
  }
`;

// Component
export default function ProbabilityChart({ data }) {
  const { margin, width, height } = setChartDimensions();
  const ref = useRef(null);

  // Set history if data exists
  const history = !data
    ? null
    : data.map((entry, i) => {
        return {
          x: i,
          y: [entry.pilytixProb, entry.repProb],
          date: getEntryDate(entry)
        };
      });

  useEffect(() => {
    // Remove any existing svg charts on display
    selectAll("g").remove();

    if (ref.current && history) drawChart(history);
  }, [history]);

  return (
    <StyledBox className="chart-container">
      <svg
        id="probability_history"
        ref={ref}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      ></svg>
      {!history && (
        <Alert className="no-history" severity="info">
          No historical data to show
        </Alert>
      )}
    </StyledBox>
  );
}
