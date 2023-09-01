import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import RAW_DATA from "../data.json";
import styled from "styled-components";
import { Button, Center, Title } from "@mantine/core";
import { useState } from "react";
import { INPUTS, OUTPUTS } from "../constants/data";

type Inputs = (typeof INPUTS)[number];

type Outputs = (typeof OUTPUTS)[number];

function ScatterplotView() {
  const [selectedInputs, setSelectedInputs] = useState<Inputs[]>([
    "Antioxidant",
  ]);
  const [selectedOutput, setSelectedOutput] = useState<Outputs>("Viscosity");

  const data = selectedInputs.map((input) => {
    const groupData = Object.values(RAW_DATA).map((data) => ({
      x: data.inputs[input],
      y: data.outputs[selectedOutput],
    }));
    return {
      id: input,
      data: groupData,
    };
  });

  const handleToggleInput = (input: Inputs) => {
    if (selectedInputs.includes(input)) {
      setSelectedInputs(
        selectedInputs.filter((existingInput) => existingInput !== input),
      );
    } else {
      setSelectedInputs([...selectedInputs, input]);
    }
  };

  const handleSelectOutput = (output: Outputs) => {
    setSelectedOutput(output);
  };

  return (
    <Center>
      <Toolbar>
        <Title order={6}>Inputs</Title>
        {INPUTS.map((input) => (
          <ButtonContainer>
            <Button
              key={input}
              color={selectedInputs.includes(input) ? "dark" : "gray"}
              size="xs"
              onClick={() => handleToggleInput(input)}
            >
              {input}
            </Button>
          </ButtonContainer>
        ))}

        <Title order={6}>Outputs</Title>
        {OUTPUTS.map((output) => (
          <ButtonContainer>
            <Button
              key={output}
              color={selectedOutput === output ? "dark" : "gray"}
              size="xs"
              onClick={() => handleSelectOutput(output)}
            >
              {output}
            </Button>
          </ButtonContainer>
        ))}
      </Toolbar>
      <ChartContainer>
        <ResponsiveScatterPlot
          data={data}
          colors={{ scheme: "category10" }}
          margin={{ top: 60, right: 180, bottom: 70, left: 90 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            legend: "Inputs",
            legendPosition: "middle",
            legendOffset: 46,
          }}
          axisLeft={{
            legend: selectedOutput,
            legendPosition: "middle",
            legendOffset: -60,
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 130,
              itemWidth: 100,
              itemHeight: 12,
              itemsSpacing: 5,
              symbolSize: 12,
              symbolShape: "circle",
            },
          ]}
        />
      </ChartContainer>
    </Center>
  );
}

const Toolbar = styled.div``;

const ChartContainer = styled.div`
  height: 86vh;
  width: 80vw;
`;

const ButtonContainer = styled.div`
  margin: 0.1rem 0;

  & > button {
    padding: 0.3rem 0.5rem;
    font-size: 0.65rem;
    height: unset;
  }
`;

export default ScatterplotView;
