import {
  Card,
  CardContent,
  Button,
  ButtonGroup,
  Divider,
  Typography,
  styled,
  Tabs,
  Tab,
  Box,
  Paper
} from "@mui/material";
import React, { useState } from "react";

import { getFlagColor } from "../lib/helpers";

import CardTitle from "./modal/CardTitle";
import CardBadge from "./modal/CardBadge";
import CardInfo from "./modal/CardInfo";
import CardStage from "./modal/CardStage";
import CardProbability from "./modal/CardProbability";
import FactorsChart from "../charts/FactorsChart";
import ProbabilityHistory from "../charts/ProbabilityHistory";

const StyledCard = styled(Card)`
  position: absolute;
  top: calc(50% - 369px);
  left: calc(50% - 400px);
  width: 800px;

  @media only screen and (max-width: 900px) {
    width: 550px;
    left: calc(50% - 275px);
  }

  @media only screen and (max-width: 600px) {
    top: 0;
    width: 100%;
    left: 0;
  }

  && .full-barchart {
    display: none;
  }

  && .button-group {
    margin-left: calc(50% - 100px);
    margin-top: 25px;

    @media only screen and (max-width: 600px) {
      margin-top: 10px;
    }
  }
`;

function TabPanel({ children, value, index, ...others }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...others}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

// Accessibility
function a11yProps(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
}

export default function Modal({ opportunity, modalAction }) {
  const [tab, setTab] = useState(0);

  const [oppType, oppYear, oppName] = opportunity.oppName.split(" - ");
  const tier = +opportunity.pilytixTier.split(" ")[0];
  const stageNum = +opportunity.stage.split(". ")[0];
  const stageTitle = opportunity.stage.split(". ")[1];
  const {
    oppId,
    pilytixFactorsIncreasingWin,
    pilytixFactorsDecreasingWin,
    probabilityHistory,
    product,
    amount,
    salesRepName,
    pilytixProbability,
    repProbability
  } = opportunity;

  const flagColor = getFlagColor(stageNum);

  const handleTabSwitch = (_, newValue) => setTab(newValue);

  const handleCloseModal = () => modalAction(null);
  const handlePrevModal = () => modalAction(oppId - 1);
  const handleNextModal = () => modalAction(oppId + 1);

  return (
    <StyledCard elevation={3}>
      <CardTitle title={oppName} />

      <CardStage
        color={flagColor}
        stageNum={stageNum}
        stageTitle={stageTitle}
      />

      <Typography
        sx={{
          textAlign: "center",
          color: "var(--gray)",
          marginTop: "10px",
          fontStyle: "italic"
        }}
      >
        {salesRepName}
      </Typography>

      <CardBadge type={oppType} year={oppYear} />

      <CardContent>
        <CardInfo product={product} amount={amount} tier={tier} />

        <CardProbability
          pilytixProbability={pilytixProbability}
          repProbability={repProbability}
        />

        <br />

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            value={tab}
            onChange={handleTabSwitch}
            aria-label="Opportunity Charts"
          >
            <Tab label="Win Factors" {...a11yProps(0)} />
            <Tab label="Probability History" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Paper>
          <TabPanel value={tab} index={0}>
            <FactorsChart
              increasingWin={pilytixFactorsIncreasingWin}
              decreasingWin={pilytixFactorsDecreasingWin}
            />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <ProbabilityHistory data={probabilityHistory} />
          </TabPanel>
        </Paper>
        <ButtonGroup
          className="button-group"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button onClick={handlePrevModal}>Prev</Button>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button onClick={handleNextModal}>Next</Button>
        </ButtonGroup>
      </CardContent>
    </StyledCard>
  );
}
