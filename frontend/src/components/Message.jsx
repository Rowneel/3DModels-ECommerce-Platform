import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const StyledAlert = styled(Alert)(({ theme, variant }) => ({
  backgroundColor: "grey",
  color:"white"
}));

export default function Message({ variant, children }) {
  return (
    <StyledAlert variant="standard"  severity={variant}>
      {children}
    </StyledAlert>
  );
}