import { Center, RangeSlider, Select, Title } from "@mantine/core";
import { ResponsiveBar } from "@nivo/bar";
import { useState } from "react";
import styled from "styled-components";
import { INPUTS, OUTPUTS } from "../constants/data";
import RAW_DATA from "../data.json";
import { Outputs } from "../types/data";

const outputMinMax: Record<Outputs, [number, number]> = {
  Viscosity: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  "Cure Time": [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  Elongation: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  "Tensile Strength": [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  "Compression Set": [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
};

Object.values(RAW_DATA).map((data) => {
  Object.entries(data.outputs).map(([output, value]) => {
    outputMinMax[output as Outputs][0] = Math.min(
      outputMinMax[output as Outputs][0],
      value,
    );
    outputMinMax[output as Outputs][1] = Math.max(
      outputMinMax[output as Outputs][1],
      value,
    );
  });
});

function HistogramView() {
  const [selectedOutput, setSelectedOutput] = useState<Outputs | null>();
  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 0]);
  const handleChangeSelectedOutput = (output: Outputs) => {
    setSelectedOutput(undefined);
    setTimeout(() => {
      setSelectedOutput(output);
      setRangeValue(outputMinMax[output]);
    });
  };
  const data = Object.entries(RAW_DATA)
    .filter(
      ([_, data]) =>
        !selectedOutput ||
        (data.outputs[selectedOutput] > rangeValue[0] &&
          data.outputs[selectedOutput] < rangeValue[1]),
    )
    .map(([timestamp, data]) => {
      return {
        timestamp,
        ...data.inputs,
      };
    })
    .slice(0, 8);

  return (
    <Container>
      <Sidebar>
        <Title order={6}>Output filter</Title>
        <Select
          label="Output"
          placeholder="Select"
          value={selectedOutput}
          onChange={handleChangeSelectedOutput}
          data={OUTPUTS.map((output) => ({
            value: output,
            label: output,
          }))}
        />
        {selectedOutput && (
          <>
            <SliderLabel>Filter by value</SliderLabel>
            <RangeSlider
              size="sm"
              onChangeEnd={setRangeValue}
              min={outputMinMax[selectedOutput][0]}
              max={outputMinMax[selectedOutput][1]}
              minRange={0.1}
              step={0.1}
              marks={[
                {
                  label: outputMinMax[selectedOutput][0],
                  value: outputMinMax[selectedOutput][0],
                },
                {
                  label: outputMinMax[selectedOutput][1],
                  value: outputMinMax[selectedOutput][1],
                },
              ]}
            />
          </>
        )}
      </Sidebar>
      <ChartContainer>
        <ResponsiveBar
          data={data}
          keys={[...INPUTS]}
          indexBy="timestamp"
          margin={{ top: 50, right: 180, bottom: 80, left: 60 }}
          padding={0.2}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "category10" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Input quantity",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
            },
          ]}
        />
      </ChartContainer>
    </Container>
  );
}
const Container = styled(Center)`
  align-items: flex-start;
`;

const ChartContainer = styled.div`
  height: 86vh;
  width: 80vw;
`;

const Sidebar = styled.div`
  margin-top: 3rem;
  margin-right: 2rem;

  & > * {
    margin-bottom: 1rem;
  }
`;

const SliderLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 0.8rem;
  display: block;
`;

export default HistogramView;
