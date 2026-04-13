import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAuth } from "../context/auth/AuthContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useRef, useState } from "react";
import { baseURL } from "../constants/baseURL";
import { useNavigate } from "react-router";

const ChangePasswordPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { username, token, logout } = useAuth();
  const navigate = useNavigate();

  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const verifyPasswordRef = useRef<HTMLInputElement>(null);

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      fontFamily: '"Orbitron", monospace',
      fontSize: "0.78rem",
      "& fieldset": { borderColor: "rgba(255,230,0,0.25)" },
      "&:hover fieldset": { borderColor: "rgba(255,230,0,0.5)" },
      "&.Mui-focused fieldset": { borderColor: "#FFE600" },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,230,0,0.4)",
      fontFamily: '"Orbitron", monospace',
      fontSize: "0.72rem",
    },
    "& .MuiInputLabel-root.Mui-focused": { color: "#FFE600" },
  };

  const handleSubmit = async () => {
    const currentPassword = currentPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const verifyPassword = verifyPasswordRef.current?.value;

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !verifyPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== verifyPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/users/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess("Password updated! Please log in again.");
      if (currentPasswordRef.current) currentPasswordRef.current.value = "";
      if (newPasswordRef.current) newPasswordRef.current.value = "";
      if (verifyPasswordRef.current) verifyPasswordRef.current.value = "";

      setTimeout(() => {
        logout();
        navigate("/login");
      }, 2000);

    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Box
          component="form"
          sx={{
            background: "#0d0d0d",
            border: "1.5px solid rgba(255,230,0,0.35)",
            borderRadius: 2,
            p: 4,
            width: "100%",
            maxWidth: 460,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Typography sx={{ fontFamily: '"Orbitron", monospace', fontWeight: 900, fontSize: "1.1rem", color: "#FFE600", letterSpacing: "0.12em", textAlign: "center" }}>
            CHANGE PASSWORD
          </Typography>

          {/* current user box */}
          <Box sx={{ background: "rgba(255,230,0,0.05)", border: "1px solid rgba(255,230,0,0.2)", borderRadius: "6px", px: 2, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontFamily: '"Orbitron", monospace', fontSize: "0.6rem", color: "rgba(255,230,0,0.45)", letterSpacing: "0.1em", mb: 0.5 }}>
                LOGGED IN AS
              </Typography>
              <Typography sx={{ fontFamily: '"Orbitron", monospace', fontSize: "0.78rem", color: "rgba(255,255,255,0.85)" }}>
                {username ?? "—"}
              </Typography>
            </Box>
            <Box sx={{ fontFamily: '"Orbitron", monospace', fontSize: "0.55rem", color: "#FFE600", border: "1px solid rgba(255,230,0,0.3)", background: "rgba(255,230,0,0.1)", borderRadius: "3px", px: 1, py: 0.4, letterSpacing: "0.08em" }}>
              ACTIVE
            </Box>
          </Box>

          {/* divider */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box sx={{ flex: 1, height: "1px", background: "rgba(255,230,0,0.12)" }} />
            <Typography sx={{ fontFamily: '"Orbitron", monospace', fontSize: "0.6rem", color: "rgba(255,230,0,0.3)", letterSpacing: "0.1em" }}>
              UPDATE PASSWORD
            </Typography>
            <Box sx={{ flex: 1, height: "1px", background: "rgba(255,230,0,0.12)" }} />
          </Box>

          <TextField fullWidth label="Current Password" type="password" inputRef={currentPasswordRef} sx={textFieldSx} />
          <TextField fullWidth label="New Password"     type="password" inputRef={newPasswordRef}     sx={textFieldSx} />
          <TextField fullWidth label="Verify Password"  type="password" inputRef={verifyPasswordRef}  sx={textFieldSx} />

          <Button fullWidth onClick={handleSubmit}
            sx={{ mt: 0.5, backgroundColor: "#FFE600", color: "#000", fontFamily: '"Orbitron", monospace', fontWeight: 900, fontSize: "0.78rem", letterSpacing: "0.12em", py: 1.5, borderRadius: "4px", "&:hover": { backgroundColor: "#FFE600", boxShadow: "0 0 16px rgba(255,230,0,0.5)" } }}
          >
            SAVE CHANGES
          </Button>

          <Typography onClick={() => navigate("/account")}
            sx={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontFamily: '"Orbitron", monospace', fontSize: "0.68rem", cursor: "pointer", "&:hover": { color: "#FFE600" }, transition: "color 0.2s" }}
          >
            back to account
          </Typography>

          {error && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "rgba(255,0,0,0.08)", border: "1px solid rgba(255,0,0,0.3)", borderRadius: 2, px: 2, py: 1.2 }}>
              <ErrorOutlineIcon sx={{ color: "#ff4444", fontSize: 18 }} />
              <Typography sx={{ color: "#ff4444", fontFamily: '"Orbitron", monospace', fontSize: "0.7rem", letterSpacing: "0.06em" }}>
                {error}
              </Typography>
            </Box>
          )}

          {success && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "rgba(255,230,0,0.06)", border: "1px solid rgba(255,230,0,0.3)", borderRadius: 2, px: 2, py: 1.2 }}>
              <Typography sx={{ color: "#FFE600", fontFamily: '"Orbitron", monospace', fontSize: "0.7rem", letterSpacing: "0.06em" }}>
                {success}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswordPage;