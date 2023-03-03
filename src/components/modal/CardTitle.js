import CardHeader from "@mui/material/CardHeader";
import styled from "@emotion/styled";

const StyledHeader = styled(CardHeader)`
  background-color: var(--dark-blue);
  padding-left: 100px;
  min-height: 50px;

  @media (max-width: 600px) {
    min-height: 40px;
  }

  && * {
    color: var(--white);
    font-size: 28px;

    @media (max-width: 600px) {
      font-size: 18px;
    }
  }
`;

export default function CardTitle({ title }) {
  return <StyledHeader title={title} />;
}
