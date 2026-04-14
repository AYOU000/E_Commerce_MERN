import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { baseURL } from "../constants/baseURL";
import { useAuth } from "../context/auth/AuthContext";

interface OrderItem {
  productTitle: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  _id: string;
  orderitem: OrderItem[];
  total: number;
}

const OrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${baseURL}/order`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const {data} = await response.json();
        setOrders(Array.isArray(data) ? data : []);    
      } catch {
        console.error("failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <Box
        sx={{
          background: "#111",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "rgba(255,255,255,0.3)",
            fontFamily: '"Orbitron", monospace',
            fontSize: "12px",
            letterSpacing: "0.1em",
          }}
        >
          LOADING ORDERS...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#111", minHeight: "100vh" }}>
      <Container sx={{ pt: 12, pb: 8 }}>
        <Typography
          sx={{
            fontFamily: '"Orbitron", monospace',
            fontWeight: 900,
            fontSize: { xs: "20px", md: "28px" },
            color: "#fff",
            letterSpacing: "0.08em",
            mb: 4,
          }}
        >
          YOUR{" "}
          <Box component="span" sx={{ color: "#FFE600" }}>
            ORDERS
          </Box>
        </Typography>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <Typography
              sx={{
                fontFamily: '"Orbitron", monospace',
                fontSize: "14px",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.1em",
              }}
            >
              NO ORDERS YET
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {orders.map((order) => (
              <Box
                key={order._id}
                sx={{
                  background: "#1a1a1a",
                  border: "1.5px solid rgba(255,255,255,0.06)",
                  borderRadius: "8px",
                  p: 3,
                  "&:hover": { borderColor: "rgba(255,230,0,0.35)" },
                  transition: "border-color 0.2s",
                }}
              >
                {/* Order header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: '"Orbitron", monospace',
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.4)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      ORDER ID
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"Orbitron", monospace',
                        fontSize: "11px",
                        color: "#fff",
                        letterSpacing: "0.04em",
                      }}
                    >
                      #{order._id.slice(-8).toUpperCase()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "0.55rem",
                      color: "#FFE600",
                      border: "1px solid rgba(255,230,0,0.3)",
                      background: "rgba(255,230,0,0.1)",
                      borderRadius: "3px",
                      px: 1,
                      py: 0.4,
                      letterSpacing: "0.08em",
                    }}
                  >
                    COMPLETED
                  </Box>
                </Box>

                {/* Order items */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mb: 2,
                  }}
                >
                  {order.orderitem.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        pt: 1.5,
                        gap: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src={item.productImage}
                        alt={item.productTitle}
                        sx={{
                          width: "100px",
                          aspectRatio: "460/215",
                          objectFit: "cover",
                          borderRadius: "4px",
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: '"Orbitron", monospace',
                            fontWeight: 700,
                            fontSize: "10px",
                            color: "#fff",
                            letterSpacing: "0.04em",
                            mb: 0.5,
                          }}
                        >
                          {item.productTitle}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"Orbitron", monospace',
                            fontSize: "10px",
                            color: "rgba(255,255,255,0.4)",
                          }}
                        >
                          QTY: {item.quantity}
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: '"Orbitron", monospace',
                          fontWeight: 900,
                          fontSize: "11px",
                          color: "#FFE600",
                          textShadow: "0 0 8px rgba(255,230,0,0.4)",
                          flexShrink: 0,
                        }}
                      >
                        ${Number(item.unitPrice).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Order total */}
                <Box
                  sx={{
                    borderTop: "1px solid rgba(255,230,0,0.12)",
                    pt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Orbitron", monospace',
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    TOTAL
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Orbitron", monospace',
                      fontWeight: 900,
                      fontSize: "16px",
                      color: "#FFE600",
                      textShadow: "0 0 10px rgba(255,230,0,0.4)",
                    }}
                  >
                    ${Number(order.total).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default OrdersPage;
