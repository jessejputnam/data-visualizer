import Card from "@mui/material/Card";

import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  position: absolute;
  max-width: 300px;
  top: -50px;
  background-color: white;
  color: var(--gray);
  padding: 5px 10px;
  display: none;
  border: solid 2px var(--gray);

  && p {
    margin: 5px 0;
  }
`;

export default function Tooltip() {
  return (
    <StyledCard>
      <p></p>
      <p></p>
      <strong></strong>
    </StyledCard>
  );
}
