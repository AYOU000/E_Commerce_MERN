import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import GlobalStyles from "@mui/material/GlobalStyles";
import MenuIcon from "@mui/icons-material/Menu";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate, useLocation } from "react-router";

const pages = [
  { label: "HOME",  path: "/" },
  { label: "Games", path: "/Games" },
  { label: "Blog",  path: "/blog" },
];
const settings = ["Orders", "Account", "Logout"];

// ── Cyber button style ────────────────────────────────────────────────────────
const cyberButtonSx = (variant: "ghost" | "primary" = "ghost") => ({
  position: "relative",
  overflow: "hidden",
  fontFamily: '"Orbitron", monospace',
  fontWeight: 700,
  fontSize: "0.68rem",
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  px: 2.5,
  py: 0.9,
  borderRadius: "8px",
  color: "#FFE600",
  backdropFilter: "blur(8px)",
  transition: "all 0.25s ease",
  ...(variant === "ghost"
    ? {
        background: "rgba(0, 8, 63, 0.55)",
        border: "1px solid rgba(255, 230, 0, 0.35)",
        boxShadow: "0 0 10px rgba(255,230,0,0.18)",
      }
    : {
        background: "rgba(255, 230, 0, 0.1)",
        border: "1px solid rgba(255, 230, 0, 0.6)",
        boxShadow: "0 0 16px rgba(255,230,0,0.3)",
      }),
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "8px",
    padding: "1px",
    background: "linear-gradient(120deg, #FFE600, #00F0FF, #FFE600)",
    backgroundSize: "200% 100%",
    animation: "borderShift 4s linear infinite",
    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.22), transparent)",
    transition: "left 0.5s ease",
    pointerEvents: "none",
  },
  "&:hover": {
    background: variant === "primary" ? "rgba(255,230,0,0.18)" : "rgba(255,230,0,0.07)",
    boxShadow: variant === "primary"
      ? "0 0 28px rgba(255,230,0,0.7), 0 0 8px rgba(0,240,255,0.3)"
      : "0 0 20px rgba(255,230,0,0.5)",
    transform: "translateY(-2px)",
  },
  "&:hover::after": { left: "100%" },
  "&:active": { transform: "scale(0.96)", boxShadow: "0 0 10px rgba(255,230,0,0.4)" },
});

// ── Lightning SVG background ──────────────────────────────────────────────────
const LightningBg = () => (
  <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    <svg width="100%" height="100%" viewBox="0 0 1200 62" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <polygon points="580,4 558,28 572,28 548,56 600,26 582,26 610,4"   fill="#FFE600" opacity="0.13" />
      <polygon points="180,6 163,24 173,24 154,52 198,22 184,22 204,6"   fill="#FFE600" opacity="0.07" />
      <polygon points="980,6 964,24 974,24 956,52 998,22 984,22 1002,6"  fill="#FFE600" opacity="0.07" />
      <polygon points="60,8  50,22  57,22  44,48  74,20  64,20  76,8"    fill="#FFE600" opacity="0.05" />
      <polygon points="1130,8 1120,22 1127,22 1114,48 1144,20 1134,20 1146,8" fill="#FFE600" opacity="0.05" />
      <polyline points="0,36 80,34 110,20 160,32 230,18 280,36 360,26 440,40 520,16 580,30"
        fill="none" stroke="#FFE600" strokeWidth="0.55" opacity="0.12" />
      <polyline points="580,30 640,18 720,40 800,22 870,36 950,16 1030,34 1100,20 1200,30"
        fill="none" stroke="#FFE600" strokeWidth="0.55" opacity="0.12" />
      <rect x="0" y="30" width="1200" height="1" fill="#FFE600" opacity="0.05" rx="1" />
      {[90, 260, 430, 600, 770, 940, 1100].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 14 : 48} r="1.5" fill="#FFE600" opacity="0.2" />
      ))}
    </svg>
  </Box>
);

// ── NavBar ────────────────────────────────────────────────────────────────────
function NavBar() {
  const [anchorElNav,  setAnchorElNav]  = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate  = useNavigate();
  const location  = useLocation();
  const { username, isauthenticated, logout } = useAuth();

  const handleOpenNavMenu  = (e: React.MouseEvent<HTMLElement>) => setAnchorElNav(e.currentTarget);
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElUser(e.currentTarget);
  const handleCloseNavMenu  = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <GlobalStyles styles={`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        @keyframes borderShift {
          0%   { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `} />

      {/* ── Nav container ── */}
      <Box
        component="nav"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          background: "#0a0a0a",
          borderBottom: "1.5px solid rgba(255,230,0,0.28)",
          boxShadow: "0 2px 24px rgba(255,230,0,0.1)",
          height: 62,
          px: { xs: 2, md: 5 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <LightningBg />

        {/* ── Logo ── */}
        <Box
          onClick={() => navigate("/")}
          sx={{ display: "flex", alignItems: "center", gap: 1, zIndex: 1, cursor: "pointer" }}
        >
          <VideogameAssetIcon sx={{ color: "#FFE600", fontSize: 26, filter: "drop-shadow(0 0 5px #FFE600)" }} />
          <Typography sx={{
            fontFamily: '"Orbitron", monospace',
            fontWeight: 900,
            fontSize: "17px",
            color: "#FFE600",
            letterSpacing: "0.14em",
            textShadow: "0 0 10px rgba(255,230,0,0.55)",
            userSelect: "none",
          }}>
            1UP
          </Typography>
        </Box>

        {/* ── Desktop nav links ── */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3.5, zIndex: 1 }}>
          {pages.map(({ label, path }) => {
            const active = isActive(path);
            return (
              <Typography
                key={label}
                onClick={() => navigate(path)}
                sx={{
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  fontWeight: active ? 700 : 600,
                  color: active ? "#FFE600" : "rgba(255,255,255,0.72)",
                  cursor: "pointer",
                  position: "relative",
                  pb: "2px",
                  transition: "color 0.2s",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "#FFE600",
                    boxShadow: "0 0 6px #FFE600",
                    opacity: active ? 1 : 0,
                    transition: "opacity 0.2s, width 0.25s",
                  },
                  "&:hover": {
                    color: "#FFE600",
                    "&::after": { opacity: 1 },
                  },
                }}
              >
                {label}
              </Typography>
            );
          })}
        </Box>

        {/* ── Right side ── */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, zIndex: 1 }}>

          {/* Mobile hamburger */}
          <IconButton
            onClick={handleOpenNavMenu}
            sx={{ display: { xs: "flex", md: "none" }, color: "#FFE600" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiPaper-root": {
                backgroundColor: "#0d0d0d",
                border: "1px solid rgba(255,230,0,0.3)",
                boxShadow: "0 0 20px rgba(255,230,0,0.2)",
                minWidth: 160,
              },
            }}
          >
            {pages.map(({ label, path }) => (
              <MenuItem
                key={label}
                onClick={() => { navigate(path); handleCloseNavMenu(); }}
                sx={{
                  color: isActive(path) ? "#FFE600" : "rgba(255,255,255,0.75)",
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  "&:hover": { backgroundColor: "rgba(255,230,0,0.08)", color: "#FFE600" },
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>

          {/* Authenticated */}
          {isauthenticated ? (
            <>
              <IconButton aria-label="cart" onClick={() => navigate("/cart")} sx={{ p: 0.5 }}>
                <Badge badgeContent={1} color="secondary">
                  <ShoppingCartIcon sx={{
                    color: "#FFE600",
                    filter: "drop-shadow(0 0 5px #FFE600)",
                    transition: "filter 0.2s",
                    "&:hover": { filter: "drop-shadow(0 0 12px #FFE600) drop-shadow(0 0 20px rgba(255,230,0,0.6))" },
                  }} />
                </Badge>
              </IconButton>

              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: "2px",
                    border: "1.5px solid #FFE600",
                    boxShadow: "0 0 8px rgba(255,230,0,0.35)",
                    transition: "box-shadow 0.2s",
                    "&:hover": { boxShadow: "0 0 16px rgba(255,230,0,0.65)" },
                  }}
                >
                  <Avatar alt={username || ""} src="/static/images/avatar/2.jpg" sx={{ width: 32, height: 32 }} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "48px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    backgroundColor: "#0d0d0d",
                    border: "1px solid rgba(255,230,0,0.3)",
                    boxShadow: "0 0 20px rgba(255,230,0,0.2)",
                    minWidth: 150,
                  },
                }}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      if (setting === "Logout") { logout(); navigate("/"); }
                      if (setting === "Account") navigate("/account");
                      if (setting === "Orders") navigate("/orders");
                    }}
                    sx={{
                      color: "rgba(255,255,255,0.75)",
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "0.72rem",
                      letterSpacing: "0.06em",
                      "&:hover": { backgroundColor: "rgba(255,230,0,0.08)", color: "#FFE600" },
                    }}
                  >
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            /* Guest buttons */
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button onClick={() => navigate("/Register")} sx={cyberButtonSx("ghost")}>
                Sign Up
              </Button>
              <Button onClick={() => navigate("/login")} sx={cyberButtonSx("primary")}>
                Log In
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default NavBar;