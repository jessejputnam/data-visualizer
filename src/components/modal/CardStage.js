import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const StyledStage = styled(Paper)`
  margin: 0 auto;
  width: fit-content;
  text-align: center;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  color: #343434;
  padding: 0 20px 3px;

  @media (max-width: 600px) {
    width: unset;
    border-radius: 0;
  }
`;

export default function CardStage({ color, stageNum, stageTitle }) {
  return (
    <StyledStage elevation={0} sx={{ backgroundColor: color }}>
      <Typography variant="h2" sx={{ fontSize: "12px", fontWeight: "bold" }}>
        Stage {stageNum}
      </Typography>

      <Typography sx={{ fontSize: "13px" }}>{stageTitle}</Typography>
    </StyledStage>
  );
}
