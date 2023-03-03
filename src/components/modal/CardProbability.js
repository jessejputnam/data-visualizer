import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  gap: 8%;

  && .pilytix {
    & .probability {
      color: var(--chart-green);
    }
  }

  && .rep {
    & .probability {
      color: var(--chart-orange);
    }
  }

  && .probability-box {
    background-color: #e1e1e1;
    padding: 10px 15px;
    width: 100px;
    // height: 65px;
    text-align: center;
    display: flex;
    flex-direction: column;

    > .type {
      font-size: 0.7rem;
      font-weight: bold;
    }

    > .probability {
      font-size: 2rem;
      font-weight: bold;
      text-shadow: 1px 1px 1px #515151;

      @media only screen and (max-width: 600px) {
        font-size: 1.4rem;
      }
    }
  }
`;

export default function CardProbability({
  pilytixProbability,
  repProbability
}) {
  return (
    <StyledContainer>
      <Paper className="probability-box pilytix">
        <Typography className="type">Pilytix Probability</Typography>
        <Typography className="probability">{pilytixProbability}</Typography>
      </Paper>
      <Paper className="probability-box rep">
        <Typography className="type">Rep Probability</Typography>
        <Typography className="probability">{repProbability}</Typography>
      </Paper>
    </StyledContainer>
  );
}
