import React, { useState, useRef } from "react";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
// import deepClone from "deepclone";
import _ from "lodash";
import { getData } from "./data";
// import { getData } from "./data";

const numFormatter = new Intl.NumberFormat("en-US");
const tooltip = {
  renderer: ({ title, datum, xKey, yKey }) => ({
    title,
    content: `${datum[xKey]}: ${numFormatter.format(datum[yKey])}`,
  }),
};
const barOptions = {
  series: [
    {
      type: "bar",
      xKey: "station",
      yKey: "early",
      stacked: true,
      yName: "Early",
      tooltip,
    },
    {
      type: "bar",
      xKey: "station",
      yKey: "morningPeak",
      yName: "Morning peak",
      stacked: true,
      tooltip,
    },
    {
      type: "bar",
      xKey: "station",
      yKey: "interPeak",
      yName: "Between peak",
      stacked: true,
      tooltip,
    },
    {
      type: "bar",
      xKey: "station",
      yKey: "afternoonPeak",
      yName: "Afternoon peak",
      stacked: true,
      tooltip,
    },
    {
      type: "bar",
      xKey: "station",
      yKey: "evening",
      yName: "Evening",
      stacked: true,
      tooltip,
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      label: {
        formatter: (params) => {
          return params.value / 1000 + "k";
        },
      },
    },
  ],
};
const lineOptions = {
  series: [
    {
      type: "line",
      xKey: "station",
      yKey: "early",
      yName: "Early",
      tooltip,
    },
    {
      type: "line",
      xKey: "station",
      yKey: "morningPeak",
      yName: "Morning peak",
      tooltip,
    },
    {
      type: "line",
      xKey: "station",
      yKey: "interPeak",
      yName: "Between peak",
      tooltip,
    },
    {
      type: "line",
      xKey: "station",
      yKey: "afternoonPeak",
      yName: "Afternoon peak",
      tooltip,
    },
    {
      type: "line",
      xKey: "station",
      yKey: "evening",
      yName: "Evening",
      tooltip,
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      label: {
        formatter: (params) => {
          return params.value / 1000 + "k";
        },
      },
    },
  ],
};
const areaOptions = {
  series: [
    {
      type: "area",
      xKey: "station",
      yKey: "early",
      stacked: true,
      yName: "Early",
      tooltip,
    },
    {
      type: "area",
      xKey: "station",
      yKey: "morningPeak",
      yName: "Morning peak",
      stacked: true,
      tooltip,
    },
    {
      type: "area",
      xKey: "station",
      yKey: "interPeak",
      yName: "Between peak",
      stacked: true,
      tooltip,
    },
    {
      type: "area",
      xKey: "station",
      yKey: "afternoonPeak",
      yName: "Afternoon peak",
      stacked: true,
      tooltip,
    },
    {
      type: "area",
      xKey: "station",
      yKey: "evening",
      yName: "Evening",
      stacked: true,
      tooltip,
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
    },
    {
      type: "number",
      position: "left",
      label: {
        formatter: (params) => {
          return params.value / 1000 + "k";
        },
      },
    },
  ],
};
const donutOptions = {
  series: [
    {
      type: "pie",
      title: {
        text: "Morning Peak",
      },
      calloutLabelKey: "station",
      legendItemKey: "station",
      angleKey: "morningPeak",
      outerRadiusRatio: 0.6,
    },
    {
      type: "donut",
      title: {
        text: "Afternoon Peak",
      },
      calloutLabelKey: "station",
      legendItemKey: "station",
      angleKey: "afternoonPeak",
      innerRadiusRatio: 0.7,
      showInLegend: false,
    },
  ],
  axes: [],
};

export const AgAnimation = () => {
  const chartRef = useRef(null);
  const [options, setOptions] = useState({
    data: getData(),
    animation: {
      enabled: true,
    },
    ...barOptions,
  });

  const changeSeriesBar = () => {
    const clone = _.cloneDeep(options);

    clone.series = barOptions.series;
    clone.axes = barOptions.axes;

    setOptions(clone);
  };

  const changeSeriesLine = () => {
    const clone = _.cloneDeep(options);

    clone.series = lineOptions.series;
    clone.axes = lineOptions.axes;

    setOptions(clone);
  };

  const changeSeriesArea = () => {
    const clone = _.cloneDeep(options);

    clone.series = areaOptions.series;
    clone.axes = areaOptions.axes;

    setOptions(clone);
  };

  const changeSeriesDonut = () => {
    const clone = _.cloneDeep(options);

    clone.series = donutOptions.series;
    clone.axes = donutOptions.axes;

    setOptions(clone);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          flex: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "0.5em",
        }}
      >
        <button onClick={changeSeriesBar}>Bar</button>
        <button onClick={changeSeriesLine}>Line</button>
        <button onClick={changeSeriesArea}>Area</button>
        <button onClick={changeSeriesDonut}>Pie &amp; Donut</button>
      </div>
      <AgChartsReact ref={chartRef} options={options} />
    </div>
  );
};
