import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRef, useState } from "react";
import { baseURL } from "../constants/baseURL";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router";

const loginPage = () => {
  const [error, setError] = useState("");
  const EmailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    const email = EmailRef.current?.value;
    const password = PasswordRef.current?.value;

    if (!email || !password) {
      setError("check submitted data!");
      return;
    }

    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 400) {
      setError("incorrect email or password.");
      return;
    }

    if (!response.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }
    const token = await response.json();
    if (!token) {
      setError("incorrect token");
      return;
    }
    login(email, token);
    console.log(token);
    navigate("/");
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      fontFamily: '"Orbitron", monospace',
      "& fieldset": { borderColor: "rgba(255,230,0,0.3)" },
      "&:hover fieldset": { borderColor: "#FFE600" },
      "&.Mui-focused fieldset": {
        borderColor: "#FFE600",
        boxShadow: "0 0 8px rgba(255,230,0,0.4)",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.45)",
      fontFamily: '"Orbitron", monospace',
      fontSize: "0.78rem",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#FFE600" },
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          component="form"
          sx={{
            background: "rgba(255,230,0,0.03)",
            border: "1px solid rgba(255,230,0,0.2)",
            borderRadius: 3,
            p: 4,
            width: "100%",
            maxWidth: 480,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Orbitron", monospace',
              fontWeight: 900,
              fontSize: "1.4rem",
              color: "#FFE600",
              textShadow: "0 0 10px rgba(255,230,0,0.4)",
              letterSpacing: "0.1em",
              textAlign: "center",
              mb: 1,
            }}
          >
            lOG IN
          </Typography>

          {/* ✅ Error message */}
          {error && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "rgba(255, 0, 0, 0.08)",
                border: "1px solid rgba(255, 0, 0, 0.3)",
                borderRadius: 2,
                px: 2,
                py: 1.2,
              }}
            >
              <ErrorOutlineIcon sx={{ color: "#ff4444", fontSize: 18 }} />
              <Typography
                sx={{
                  color: "#ff4444",
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "0.7rem",
                  letterSpacing: "0.06em",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          <TextField
            inputRef={EmailRef}
            fullWidth
            label="Email"
            type="email"
            sx={fieldSx}
          />
          <TextField
            inputRef={PasswordRef}
            fullWidth
            label="Password"
            type="password"
            sx={fieldSx}
          />

          <Button
            onClick={onSubmit}
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#FFE600",
              color: "#000",
              fontFamily: '"Orbitron", monospace',
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.12em",
              py: 1.5,
              "&:hover": {
                backgroundColor: "#fff",
                boxShadow: "0 0 16px rgba(255,230,0,0.6)",
              },
            }}
          >
            lOG IN
          </Button>
          <Typography
            onClick={() => navigate("/Register")}
            sx={{
              textAlign: "center",
              color: "rgba(255,255,255,0.4)",
              fontFamily: '"Orbitron", monospace',
              fontSize: "0.68rem",
              cursor: "pointer",
              "&:hover": { color: "#FFE600" },
              transition: "color 0.2s",
            }}
          >
            CREATE ACCOUNT
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default loginPage;
