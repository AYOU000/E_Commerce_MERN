import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReplayIcon from "@mui/icons-material/Replay";
export const BoxError = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 2,
      }}
    >
      <ErrorOutlineIcon
        sx={{
          fontSize: 64,
          color: "#FFE600",
          filter: "drop-shadow(0 0 10px #FFE600)",
        }}
      />

      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Orbitron", monospace',
          fontWeight: 700,
          color: "#FFE600",
          textShadow: "0 0 10px rgba(255,230,0,0.4)",
          letterSpacing: "0.08em",
        }}
      >
        SOMETHING WENT WRONG
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "rgba(255,255,255,0.45)",
          fontFamily: '"Orbitron", monospace',
        }}
      >
        Please check your connection and try again.
      </Typography>

      <Button
        startIcon={<ReplayIcon />}
        onClick={() => window.location.reload()}
        sx={{
          mt: 1,
          backgroundColor: "#FFE600",
          color: "#000",
          fontFamily: '"Orbitron", monospace',
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          px: 3,
          "&:hover": {
            backgroundColor: "#fff",
            boxShadow: "0 0 16px rgba(255,230,0,0.6)",
          },
        }}
      >
        TRY AGAIN
      </Button>
    </Box>
  );
};
