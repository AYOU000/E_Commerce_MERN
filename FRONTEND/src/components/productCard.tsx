import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/cart/cartContext";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth/AuthContext";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
interface props {
  image: string;
  title: string;
  price: string;
  _id: string;
}

const ProductCard = ({ _id, image, title, price }: props) => {
  const navigate = useNavigate();
  const { isauthenticated } = useAuth();
  const { cartItems, addItemToCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const [hovered, setHovered] = useState(false);
  const isFree = Number(price) === 0;
  const cartItem = cartItems.find((item) => item.ProductId === _id);
  const isInCart = !!cartItem;

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "460/215",
        width: "100%",
        background: "#1a1a1a",
        border: hovered
          ? "2px solid rgba(255,230,0,0.65)"
          : "2px solid rgba(255,255,255,0.06)",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.5), 0 0 12px rgba(255,230,0,0.2)"
          : "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* Cover image */}
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          transition: "transform 0.35s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Bottom gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 40%, transparent 70%)",
        }}
      />

      {/* Title + price */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: "8px 10px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Orbitron", monospace',
            fontWeight: 700,
            fontSize: "10px",
            color: "#fff",
            letterSpacing: "0.04em",
            lineHeight: 1.3,
            textShadow: "0 1px 4px rgba(0,0,0,0.9)",
            flex: 1,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Orbitron", monospace',
            fontSize: "11px",
            fontWeight: 900,
            color: isFree ? "#4caf50" : "#FFE600",
            lineHeight: 1.2,
            flexShrink: 0,
            textShadow: isFree
              ? "0 0 8px rgba(76,175,80,0.6)"
              : "0 0 8px rgba(255,230,0,0.5)",
          }}
        >
          {isFree ? "FREE" : `$${price}`}
        </Typography>
      </Box>

      {/* Add to cart — appears on hover */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isInCart || hovered ? 1 : 0, 
          transition: "opacity 0.2s",
          pointerEvents: isInCart || hovered ? "auto" : "none", 
        }}
      >
        {isInCart ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1,  background: "rgba(0,0,0,0.75)", borderRadius: "4px" }}>
            <IconButton
              size="small"
              onClick={() => decreaseQuantity(_id)}
              sx={{
                border: "1px solid rgba(255,230,0,0.3)",
                borderRadius: "4px",
                color: "#FFE600",
                "&:hover": {
                  background: "rgba(255,230,0,0.1)",
                  borderColor: "#FFE600",
                },
                transition: "all 0.2s",
              }}
            >
              <RemoveIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <Typography
              sx={{
                minWidth: 28,
                textAlign: "center",
                fontFamily: '"Orbitron", monospace',
                fontWeight: 700,
                fontSize: "13px",
                color: "#FFE600",
              }}
            >
              {cartItem?.quantity}
            </Typography>
            <IconButton
              size="small"
              onClick={() => increaseQuantity(_id)}
              sx={{
                border: "1px solid rgba(255,230,0,0.3)",
                borderRadius: "4px",
                color: "#FFE600",
                "&:hover": {
                  background: "rgba(255,230,0,0.1)",
                  borderColor: "#FFE600",
                },
                transition: "all 0.2s",
              }}
            >
              <AddIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        ) : (
          <Box
            onClick={
              !isauthenticated
                ? () => navigate("/login")
                : (e) => {
                    e.stopPropagation();
                    addItemToCart(_id);
                  }
            }
            sx={{
              background: "#FFE600",
              color: "#000",
              fontFamily: '"Orbitron", monospace',
              fontWeight: 700,
              fontSize: "10px",
              letterSpacing: "0.12em",
              px: 2.5,
              py: 1,
              borderRadius: "6px",
              cursor: "pointer",
              textTransform: "uppercase",
              "&:hover": {
                background: "#fff200",
                boxShadow: "0 0 20px rgba(255,230,0,0.6)",
              },
              transition: "all 0.2s",
            }}
          >
            ADD TO CART
          </Box>
        )}
      </Box>
      {/* Hover yellow shine */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg,rgba(255,230,0,0.06) 0%,transparent 50%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
};
export default ProductCard;
