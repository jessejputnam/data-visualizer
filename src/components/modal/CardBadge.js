import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";

const StyledBadge = styled(Stack)`
  position: absolute;
  top: 7px;
  left: 10px;
  border-radius: 10px;
  width: 75px;
  text-align: center;
  background-color: var(--light-blue);
  color: white;
  text-shadow: 1px 1px 1px var(--gray);

  && p {
    margin: 7px 0;

    @media only screen and (max-width: 600px) {
      font-size: 0.7rem;
    }
  }
`;

export default function CardBadge({ type, year }) {
  return (
    <StyledBadge component={Paper}>
      <p>{type}</p>
      <Divider />
      <p>{year}</p>
    </StyledBadge>
  );
}
