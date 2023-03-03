import Box from "@mui/material/Box";

import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  position: absolute;
  bottom: 50px;
  background-color: var(--gray);
  color: white;
  padding: 5px;
  display: none;
  border-radius: 5px;
`;

export default function Tooltip() {
  return <StyledBox></StyledBox>;
}
