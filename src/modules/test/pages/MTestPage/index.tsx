import { Example } from "@modules/test/components/MOrbitingCircles/Example";
import { Paper } from "@mui/material";

const MTestPage = () => {
  return (
    <Paper sx={{ p: 2, maxWidth: 700 }} className="test-page">
      <Example />
    </Paper>
  );
};
export default MTestPage;
