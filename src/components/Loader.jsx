import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

// a loader from material UI
function Loader() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}

export default Loader;
