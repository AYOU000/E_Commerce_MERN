import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import CircularProgress from "@mui/material/CircularProgress";
import ProductCard from "../components/productCard";
import { BoxError } from "../components/error";
import { baseURL } from "../constants/baseURL";

interface Product {
  _id: string;
  title: string;
  price: string;
  image: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <BoxError />;

  const dealsProducts = products.slice(0, 8);

  return (
    <>
      <GlobalStyles styles={`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `} />

      <Box sx={{ background: "#111", minHeight: "100vh", color: "#fff" }}>

        {/* ══ HERO ══ */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          minHeight: "calc(100vh - 62px)",
        }}>

          {/* Left — headline */}
          <Box sx={{
            background: "#1a1a1a",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 4, md: 7 },
            py: 8,
            position: "relative",
            overflow: "hidden",
            animation: "fadeInUp 0.7s ease both",
          }}>
            {/* Yellow slash accent */}
            <Box sx={{
              position: "absolute",
              right: -40, top: 0, bottom: 0,
              width: 90,
              background: "#1a1a1a",
              transform: "skewX(-3deg)",
              zIndex: 2,
            }} />
            <Box sx={{
              position: "absolute",
              right: -35, top: 0, bottom: 0,
              width: 4,
              background: "#FFE600",
              boxShadow: "0 0 16px #FFE600, 0 0 40px rgba(255,230,0,0.4)",
              transform: "skewX(-3deg)",
              zIndex: 3,
            }} />

            <Typography sx={{
              fontFamily: '"Orbitron", monospace',
              fontSize: "10px",
              color: "rgba(255,230,0,0.65)",
              letterSpacing: "0.22em",
              mb: 2,
              textTransform: "uppercase",
            }}>
              ⚡ New arrivals
            </Typography>

            <Typography component="h1" sx={{
              fontFamily: '"Orbitron", monospace',
              fontWeight: 900,
              fontSize: { xs: "28px", md: "42px" },
              lineHeight: 1.15,
              letterSpacing: "0.04em",
              mb: 2,
            }}>
              YOUR NEXT<br />
              <Box component="span" sx={{
                color: "#FFE600",
                textShadow: "0 0 20px rgba(255,230,0,0.55)",
              }}>
                GAME
              </Box>
              <br />
              AWAITS
            </Typography>

            <Typography sx={{
              fontFamily: "sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.85,
              maxWidth: 340,
              mb: 4.5,
              letterSpacing: 0,
            }}>
              Explore hundreds of titles across all genres. From indie gems to
              AAA blockbusters — find your next adventure today.
            </Typography>

            <Box sx={{ display: "flex", gap: 1.75, flexWrap: "wrap" }}>
              <Button
                onClick={() => navigate("/Games")}
                sx={{
                  background: "#FFE600",
                  color: "#000",
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  px: 3.5, py: 1.25,
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  "&:hover": {
                    background: "#fff200",
                    boxShadow: "0 0 20px rgba(255,230,0,0.6)",
                  },
                  transition: "all 0.2s",
                }}
              >
                Shop Now
              </Button>
              <Button
                onClick={() => navigate("/Games")}
                sx={{
                  background: "transparent",
                  color: "#fff",
                  fontFamily: '"Orbitron", monospace',
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  px: 3.5, py: 1.25,
                  borderRadius: "6px",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  "&:hover": { borderColor: "#FFE600", color: "#FFE600" },
                  transition: "all 0.2s",
                }}
              >
                Browse All
              </Button>
            </Box>
          </Box>

          {/* Right — scrolling image rows */}
          <Box sx={{
            background: "#161616",
            p: "12px",
            pl: { md: "48px" },
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <CircularProgress sx={{ color: "#FFE600" }} />
              </Box>
            ) : (
              <Box sx={{ width: "100%", overflow: "hidden" }}>
                {[0, 1, 2].map((row) => (
                  <Box
                    key={row}
                    sx={{
                      display: "flex",
                      gap: "8px",
                      mb: "8px",
                      width: "max-content",
                      animation: `${row % 2 === 0 ? "scrollLeft" : "scrollRight"} ${18 + row * 3}s linear infinite`,
                    }}
                  >
                    {[
                      ...products.slice(row * 7, row * 7 + 7),
                      ...products.slice(row * 7, row * 7 + 7),
                    ].map((p, i) => (
                      <Box
                        key={`${p._id}-${i}`}
                        component="img"
                        src={p.image}
                        alt={p.title}
                        sx={{
                          width: "500px",
                          aspectRatio: "460/215",
                          objectFit: "cover",
                          borderRadius: "6px",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* ══ FEATURED GAMES ══ */}
        <Box sx={{ px: { xs: 3, md: 7 }, py: 7, background: "#0e0e0e" }}>
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}>
            <Typography sx={{
              fontFamily: '"Orbitron", monospace',
              fontWeight: 900,
              fontSize: { xs: "16px", md: "20px" },
              color: "#fff",
              letterSpacing: "0.08em",
            }}>
              FEATURED{" "}
              <Box component="span" sx={{ color: "#FFE600" }}>GAMES</Box>
            </Typography>
            <Button
              onClick={() => navigate("/Games")}
              sx={{
                fontFamily: '"Orbitron", monospace',
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                px: 2.5, py: 0.9,
                borderRadius: "8px",
                color: "#FFE600",
                background: "rgba(0,8,63,0.55)",
                border: "1px solid rgba(255,230,0,0.35)",
                boxShadow: "0 0 10px rgba(255,230,0,0.18)",
                "&:hover": {
                  background: "rgba(255,230,0,0.07)",
                  boxShadow: "0 0 20px rgba(255,230,0,0.5)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.25s ease",
              }}
            >
              View All
            </Button>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress sx={{ color: "#FFE600" }} />
            </Box>
          ) : (
            <Box sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1,1fr)",
                sm: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              },
              gap: "12px",
            }}>
              {dealsProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  _id={p._id}
                  title={p.title}
                  image={p.image}
                  price={p.price}
                />
              ))}
            </Box>
          )}
        </Box>

      </Box>
    </>
  );
}