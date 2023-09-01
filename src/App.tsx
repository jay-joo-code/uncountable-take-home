import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import RAW_DATA from "./data.json";
import styled from "styled-components";
import { Button, Title } from "@mantine/core";
import { useState } from "react";

const INPUTS = [
  "Antioxidant",
  "Carbon Black High Grade",
  "Carbon Black Low Grade",
  "Co-Agent 1",
  "Co-Agent 2",
  "Co-Agent 3",
  "Coloring Pigment",
  "Curing Agent 1",
  "Curing Agent 2",
  "Oven Temperature",
  "Plasticizer 1",
  "Plasticizer 2",
  "Plasticizer 3",
  "Polymer 1",
  "Polymer 2",
  "Polymer 3",
  "Polymer 4",
  "Silica Filler 1",
  "Silica Filler 2",
] as const;

type Inputs = (typeof INPUTS)[number];

const OUTPUTS = [
  "Viscosity",
  "Cure Time",
  "Elongation",
  "Tensile Strength",
  "Compression Set",
] as const;

type Outputs = (typeof OUTPUTS)[number];

function App() {
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
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
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

const Center = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Toolbar = styled.div``;

const ChartContainer = styled.div`
  height: 80vh;
  width: 80vw;
`;

const ButtonContainer = styled.div`
  margin: 0.25rem 0;
`;

export default App;
