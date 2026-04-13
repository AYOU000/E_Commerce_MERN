import Container from "@mui/material/Container";
import { Box, Button, Typography } from "@mui/material";
import { useCart } from "../context/cart/cartContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const CartPage = () => {
  const {cartItems , totalAmount} = useCart();
 

  
return (
    <Box sx={{ background: "#111", minHeight: "100vh" }}>
      <Container sx={{ pt: 12, pb: 8 }}>

        {/* Title */}
        <Typography sx={{
          fontFamily: '"Orbitron", monospace',
          fontWeight: 900,
          fontSize: { xs: "20px", md: "28px" },
          color: "#fff",
          letterSpacing: "0.08em",
          mb: 4,
        }}>
          YOUR{" "}
          <Box component="span" sx={{ color: "#FFE600" }}>CART</Box>
        </Typography>

        {cartItems.length === 0 ? (
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 12,
            gap: 2,
          }}>
            <Typography sx={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "14px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
            }}>
              YOUR CART IS EMPTY
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>

            {/* Cart items */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              {cartItems.map((p) => (
                <Box
                  key={p.ProductId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    background: "#1a1a1a",
                    border: "1.5px solid rgba(255,255,255,0.06)",
                    borderRadius: "8px",
                    p: 2,
                    transition: "border-color 0.2s",
                    "&:hover": { borderColor: "rgba(255,230,0,0.35)" },
                  }}
                >
                  {/* Image */}
                  <Box
                    component="img"
                    src={p.image}
                    alt={p.title}
                    sx={{
                      width: { xs: "80px", md: "140px" },
                      aspectRatio: "460/215",
                      objectFit: "cover",
                      borderRadius: "6px",
                      flexShrink: 0,
                    }}
                  />

                  {/* Info */}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{
                      fontFamily: '"Orbitron", monospace',
                      fontWeight: 700,
                      fontSize: { xs: "10px", md: "13px" },
                      color: "#fff",
                      letterSpacing: "0.04em",
                      mb: 0.5,
                    }}>
                      {p.title}
                    </Typography>
                    <Typography sx={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "12px",
                      fontWeight: 900,
                      color: Number(p.unitPrice) === 0 ? "#4caf50" : "#FFE600",
                      textShadow: Number(p.unitPrice) === 0
                        ? "0 0 8px rgba(76,175,80,0.5)"
                        : "0 0 8px rgba(255,230,0,0.4)",
                    }}>
                      {Number(p.unitPrice) === 0 ? "FREE" : `$${p.unitPrice}`}
                    </Typography>
                  </Box>

                  {/* Delete button */}
                  <Box
                    sx={{
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.25)",
                      transition: "color 0.2s",
                      "&:hover": { color: "#ff4444" },
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Summary */}
            <Box sx={{
              width: { xs: "100%", md: "300px" },
              flexShrink: 0,
              height: "fit-content",
              background: "#0d0d0d",
              border: "1.5px solid rgba(255,230,0,0.35)",
              borderRadius: "8px",
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}>
              <Typography sx={{
                fontFamily: '"Orbitron", monospace',
                fontWeight: 900,
                fontSize: "12px",
                color: "#FFE600",
                letterSpacing: "0.12em",
              }}>
                ORDER SUMMARY
              </Typography>

              <Box sx={{ borderTop: "1px solid rgba(255,230,0,0.12)", pt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontFamily: '"Orbitron", monospace', fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
                    ITEMS
                  </Typography>
                  <Typography sx={{ fontFamily: '"Orbitron", monospace', fontSize: "10px", color: "#fff" }}>
                    {cartItems.length}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontFamily: '"Orbitron", monospace', fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
                    SUBTOTAL
                  </Typography>
                  <Typography sx={{ fontFamily: '"Orbitron", monospace', fontSize: "10px", color: "#fff" }}>
                    ${totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ borderTop: "1px solid rgba(255,230,0,0.12)", pt: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontFamily: '"Orbitron", monospace', fontWeight: 900, fontSize: "13px", color: "#fff", letterSpacing: "0.08em" }}>
                  TOTAL
                </Typography>
                <Typography sx={{ fontFamily: '"Orbitron", monospace', fontWeight: 900, fontSize: "18px", color: "#FFE600", textShadow: "0 0 10px rgba(255,230,0,0.4)" }}>
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                sx={{
                  mt: 1,
                  background: "#FFE600",
                  color: "#000",
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: 900,
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  py: 1.5,
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  "&:hover": {
                    background: "#fff200",
                    boxShadow: "0 0 20px rgba(255,230,0,0.6)",
                  },
                  transition: "all 0.2s",
                }}
              >
                Checkout
              </Button>

              <Button
                fullWidth
                onClick={() => window.history.back()}
                sx={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  "&:hover": { color: "#FFE600" },
                  transition: "color 0.2s",
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
