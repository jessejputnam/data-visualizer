import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

import { formatCurrency } from "../../lib/helpers";

const StyledInfo = styled(Box)`
  padding-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-around;

  && .left-shift {
    margin-left: 5px;
    color: var(--gray);
  }

  && .info {
    font-size: 1.5rem;

    @media only screen and (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`;

export default function CardInfo({ product, amount, tier }) {
  return (
    <StyledInfo>
      <div>
        <Typography className="left-shift" variant="subtitle2">
          Product:
        </Typography>
        <Typography className="info">{product}</Typography>
      </div>

      <div>
        <Typography className="left-shift" variant="subtitle2">
          Amount:
        </Typography>
        <Typography className="info">
          {formatCurrency.format(amount / 100)}
        </Typography>
      </div>
      <div>
        <Typography className="left-shift" variant="subtitle2">
          Tier:
        </Typography>
        <Rating readOnly={true} size={"medium"} value={tier}></Rating>
      </div>
    </StyledInfo>
  );
}
