import { Table } from "@mantine/core";
import RAW_DATA from "../data.json";
import { INPUTS, OUTPUTS } from "../constants/data";

function TableView() {
  return (
    <Table>
      <thead>
        <tr>
          <th>Timestamp</th>
          {INPUTS.map((input) => (
            <th key={input}>{input}</th>
          ))}
          {OUTPUTS.map((output) => (
            <th key={output}>{output}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(RAW_DATA).map(([timestamp, data]) => (
          <tr key={timestamp}>
            <td>{timestamp}</td>
            {INPUTS.map((input) => (
              <td key={input}>{data.inputs[input]}</td>
            ))}
            {OUTPUTS.map((output) => (
              <td key={output}>{data.outputs[output]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableView;
