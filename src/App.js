import { useState } from "react";

import { Backdrop, Box } from "@mui/material";
import styled from "@emotion/styled";

import BasicTable from "./components/Table";
import Modal from "./components/Modal";

import "./styles.css";

import * as opportunities from "./opportunities.json";

const Header = styled(Box)`
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  column-gap: 25px;
  padding: 25px 10px;
  box-shadow: 0 0 3px 0 var(--light-gray);
  margin-bottom: 10px;
`;

export default function App() {
  const [data, setData] = useState(opportunities.default);
  const [selectedData, setSelectedData] = useState(null);

  const modalAction = (opportunity) => {
    // Close Modal
    if (opportunity === null) return setSelectedData(null);

    // Get chosen opportunity ID
    const oppId =
      opportunity === data.length + 1
        ? 1
        : opportunity === 0
        ? data.length
        : opportunity;

    const result = data.filter((opp) => opp.oppId === oppId)[0];

    // Latest Probability Readings
    const latestData = {
      daysAgo: 0,
      pilytixProb: result.pilytixProbability,
      repProb: result.repProbability
    };

    // Add latest data if not currently represented
    if (
      result.probabilityHistory &&
      result.probabilityHistory.at(-1).daysAgo !== 0
    )
      result.probabilityHistory.push(latestData);

    setSelectedData(result);

    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <Backdrop open={selectedData ? true : false} />
      <Header>
        <img
          src="https://pilytix.ai/wp-content/themes/pilytix/dist/images/logo.svg"
          alt="Pilytix Logo"
        ></img>
        <h2>Scored Opportunities</h2>
      </Header>

      <BasicTable selectedOpp={modalAction} data={data} />

      {selectedData && (
        <Modal opportunity={selectedData} modalAction={modalAction} />
      )}
    </div>
  );
}
