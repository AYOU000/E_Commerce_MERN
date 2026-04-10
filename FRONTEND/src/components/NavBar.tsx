import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const LightningBg = () => (
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 64"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="580,4 558,32 572,32 548,60 600,28 582,28 610,4"
        fill="#FFE600"
        opacity="0.18"
      />

      <polygon
        points="180,6 163,28 173,28 154,58 198,26 184,26 204,6"
        fill="#FFE600"
        opacity="0.1"
      />

      <polygon
        points="980,8 964,30 974,30 956,58 998,28 984,28 1002,8"
        fill="#FFE600"
        opacity="0.1"
      />

      <polygon
        points="60,10 50,26 57,26 44,54 74,24 64,24 76,10"
        fill="#FFE600"
        opacity="0.07"
      />

      <polygon
        points="1130,10 1120,26 1127,26 1114,54 1144,24 1134,24 1146,10"
        fill="#FFE600"
        opacity="0.07"
      />

      <polyline
        points="0,40 80,38 110,22 160,36 230,20 280,40 360,28 440,42 520,18 580,32"
        fill="none"
        stroke="#FFE600"
        strokeWidth="0.6"
        opacity="0.14"
      />

      <polyline
        points="580,32 640,20 720,44 800,24 870,40 950,18 1030,38 1100,22 1200,34"
        fill="none"
        stroke="#FFE600"
        strokeWidth="0.6"
        opacity="0.14"
      />

      <rect
        x="0"
        y="30"
        width="1200"
        height="1.5"
        fill="#FFE600"
        opacity="0.06"
        rx="1"
      />

      {/* Spark dots */}
      {[90, 260, 430, 600, 770, 940, 1100].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={i % 2 === 0 ? 14 : 50}
          r="1.5"
          fill="#FFE600"
          opacity="0.22"
        />
      ))}
    </svg>
  </Box>
);

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const navigate = useNavigate();
  const { username, isauthenticated, logout } = useAuth();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleLogin = () => navigate("/login");
  return (
    <AppBar
      position="static"
      sx={{
        background: "#000000",
        borderBottom: "1.5px solid rgba(255,230,0,0.35)",
        boxShadow: "0 2px 24px rgba(255,230,0,0.12)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <LightningBg />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Toolbar disableGutters>
          {/* Desktop: Icon + Logo */}
          <VideogameAssetIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#FFE600",
              fontSize: 28,
              filter: "drop-shadow(0 0 5px #FFE600)",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              cursor: "pointer",
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: '"Orbitron", monospace',
              fontWeight: 900,
              letterSpacing: "0.12em",
              color: "#FFE600",
              textDecoration: "none",
              textShadow: "0 0 8px #FFE600, 0 0 18px rgba(255,230,0,0.4)",
            }}
          >
            1UP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: "#FFE600" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: "#0d0d0d",
                  border: "1px solid rgba(255,230,0,0.3)",
                  boxShadow: "0 0 20px rgba(255,230,0,0.2)",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    color: "#FFE600",
                    fontFamily: '"Orbitron", monospace',
                    fontSize: "0.78rem",
                    "&:hover": { backgroundColor: "rgba(255,230,0,0.08)" },
                  }}
                >
                  <Typography>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <VideogameAssetIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#FFE600",
              filter: "drop-shadow(0 0 5px #FFE600)",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: '"Orbitron", monospace',
              fontWeight: 900,
              color: "#FFE600",
              textDecoration: "none",
              textShadow: "0 0 8px #FFE600",
            }}
          >
            1UP
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 0.5 }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  px: 2,
                  position: "relative",
                  transition: "all 0.2s",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: "1.5px",
                    background: "#FFE600",
                    transition: "width 0.25s",
                    boxShadow: "0 0 6px #FFE600",
                  },
                  "&:hover": {
                    color: "#FFE600",
                    background: "rgba(255,230,0,0.04)",
                    "&::after": { width: "60%" },
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "row", flexGrow: 0 }}
            gap={4}
            alignItems={"center"}
          >
            {isauthenticated ? (
              <>
                <IconButton aria-label="cart">
                  <Badge badgeContent={1} color="secondary">
                    <ShoppingCartIcon
                      onClick={() => navigate("/cart")}
                      sx={{
                        mr: 1,
                        color: "#FFE600",
                        cursor: "pointer",
                        filter: "drop-shadow(0 0 5px #FFE600)",
                        transition: "filter 0.2s",
                        "&:hover": {
                          filter:
                            "drop-shadow(0 0 12px #FFE600) drop-shadow(0 0 20px rgba(255,230,0,0.6))",
                        },
                      }}
                    />
                  </Badge>
                </IconButton>{" "}
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
                    <Avatar
                      alt={username || ""}
                      src="/static/images/avatar/2.jpg"
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#0d0d0d",
                      border: "1px solid rgba(255,230,0,0.3)",
                      boxShadow: "0 0 20px rgba(255,230,0,0.2)",
                    },
                  }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting === "Logout") {
                          logout();
                          navigate("/");
                        }
                      }}
                      sx={{
                        color: "rgba(255,255,255,0.75)",
                        fontFamily: '"Orbitron", monospace',
                        fontSize: "0.75rem",
                        "&:hover": {
                          backgroundColor: "rgba(255,230,0,0.08)",
                          color: "#FFE600",
                        },
                      }}
                    >
                      <Typography>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button
                onClick={handleLogin}
                variant="outlined"
                sx={{
                  color: "#FFE600",
                  borderColor: "#FFE600",
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  px: 2.5,
                  py: 0.75,
                  boxShadow: "0 0 8px rgba(255,230,0,0.35)",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#FFE600",
                    backgroundColor: "rgba(255,230,0,0.08)",
                    boxShadow: "0 0 16px rgba(255,230,0,0.65)",
                  },
                }}
              >
                LOG IN
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');`}</style>
    </AppBar>
  );
}

export default NavBar;
