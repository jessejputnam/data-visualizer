import { useEffect, useRef } from "react";

import {
  axisBottom,
  axisTop,
  axisLeft,
  scaleBand,
  scaleLinear,
  select
} from "d3";

import {
  hideTooltip,
  showTooltip,
  showHoverTitle,
  hideHoverTitle,
  setChartDimensions
} from "../lib/helpers";

import Box from "@mui/material/Box";
import styled from "@emotion/styled";

import Tooltip from "../components/modal/Tooltip";
import HoverTitle from "../components/modal/HoverTitle";

// X-Axis Element
function AxisPos({ scale, transform }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale).tickSize(0));
    }
  }, [scale]);

  return <g className="x-axis" ref={ref} transform={transform} />;
}

// X-Axis Element
function AxisNeg({ scale, transform }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisTop(scale).tickSize(0));
    }
  }, [scale]);

  return <g className="x-axis" ref={ref} transform={transform} />;
}

// Y Axis Element
function AxisLeft({ scale }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale).ticks(5));
    }
  }, [scale]);

  return <g ref={ref} />;
}

// Chart Bar Elements
function Bars({ data, scaleX, scaleY }) {
  return (
    <>
      {data.map(({ weight, name }) => (
        <rect
          className="bar"
          onMouseEnter={showHoverTitle}
          onMouseLeave={hideHoverTitle}
          key={`bar-${name}`}
          id={name}
          x={scaleX(name)}
          y={weight.value > 0 ? scaleY(weight.value) : scaleY(0)}
          width={20}
          height={
            scaleY(0) -
            (weight.value > 0 ? scaleY(weight.value) : scaleY(-weight.value))
          }
          fill={weight.value > 0 ? "var(--green)" : "var(--red)"}
        />
      ))}
    </>
  );
}

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

  .x-axis {
    text {
      opacity: 0;
      pointer-events: none;
      user-select: none;
    }
  }

  && .bar:hover {
    filter: brightness(80%);
    cursor: pointer;
  }
`;

export default function FactorsChart({ decreasingWin, increasingWin }) {
  const { margin, width, height } = setChartDimensions();

  // Bar Chart details display
  const displayDescription = (e) => {
    const name = e.target.id;
    const tooltip = e.target.closest(".chart-container").children[1];
    const data = !increasingWin
      ? decreasingWin
      : !decreasingWin
      ? increasingWin
      : [...increasingWin, ...decreasingWin];

    const filteredData = data.filter((win) => win.name === name)[0];

    if (!filteredData) return;

    showTooltip(tooltip, filteredData);
  };

  const hideDescription = (e) => {
    const tooltip = e.target.closest(".chart-container").children[1];

    if (e.target.tagName !== "rect") {
      hideTooltip(tooltip);
    }
  };

  // Generate X-Axis Scales if data exists
  const negScale = !decreasingWin
    ? null
    : scaleBand()
        .domain(decreasingWin.map(({ name }) => name))
        .range([0, width])
        .padding(0.5);

  const posScale = !increasingWin
    ? null
    : scaleBand()
        .domain(increasingWin.map(({ name }) => name))
        .range([0, width])
        .padding(0.5);

  // Generate Y-Axis Scale
  const scaleY = scaleLinear().domain([-3, 3]).range([height, 0]);

  return (
    <StyledBox onClick={hideDescription} className="chart-container">
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g
          onClick={displayDescription}
          transform={`translate(${margin.left}, ${margin.top})`}
        >
          {!!posScale && (
            <AxisPos
              scale={posScale}
              transform={`translate(0, ${height / 2})`}
            />
          )}
          {!!negScale && (
            <AxisNeg
              scale={negScale}
              transform={`translate(0, ${height / 2})`}
            />
          )}
          <AxisLeft scale={scaleY} />
          {!!posScale && (
            <Bars data={increasingWin} scaleX={posScale} scaleY={scaleY} />
          )}
          {!!negScale && (
            <Bars data={decreasingWin} scaleX={negScale} scaleY={scaleY} />
          )}
        </g>
      </svg>

      <Tooltip />

      <HoverTitle />
    </StyledBox>
  );
}
