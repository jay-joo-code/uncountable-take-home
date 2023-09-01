import { useState } from "react";
import { View } from "./types/views";
import ScatterplotView from "./views/ScatterplotView";
import HistogramView from "./views/HistogramView";
import TableView from "./views/TableView";
import styled from "styled-components";
import { Button } from "@mantine/core";
import { VIEWS } from "./constants/views";

function App() {
  const [activeView, setActiveView] = useState<View>("scatterplot");
  const viewToComponent = {
    scatterplot: <ScatterplotView />,
    histogram: <HistogramView />,
    table: <TableView />,
  };

  return (
    <Container>
      <ViewSelector>
        {VIEWS.map((view: View) => (
          <Button
            key={view}
            size="xs"
            onClick={() => setActiveView(view)}
            color={activeView === view ? "dark" : "gray"}
          >
            {view}
          </Button>
        ))}
      </ViewSelector>
      <ViewContainer>{viewToComponent[activeView]}</ViewContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.05);
  padding: 1rem;
`;

const ViewSelector = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  background: white;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;

  & > button {
    margin-right: 0.5rem;
  }
`;

const ViewContainer = styled.div`
  padding: 1rem;
  background: white;
  max-height: 90vh;
  border-radius: 0.5rem;
  overflow: auto;
`;

export default App;
