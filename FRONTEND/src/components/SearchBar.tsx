import { useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import type { Product } from "../types/product";
import { baseURL } from "../constants/baseURL";

interface SearchBarProps
{
    onSearch: (val: string) => void;
}
export const SearchBar = ({onSearch}:SearchBarProps) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/product`);
        const data: Product[] = await response.json();
        setSuggestions(data.map((p) => p.title));
      } catch {}
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ position: "relative", width: 700, maxWidth: "100%" }}>
      <Box
        sx={{ 
          display: "flex",
          alignItems: "stretch",
          border: "1.5px solid",
          borderColor: open ? "#FFE600" : "rgba(255,230,0,0.35)",
          borderRadius: "4px",
          background: "rgba(255,230,0,0.04)",
          pl: 2,                        
          overflow: "hidden",           
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: open ? "0 0 0 2px rgba(255,230,0,0.15)" : "none",
        }}
      >
        <InputBase
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(e.target.value.length > 0);
            if(e.target.value ==="")
            {
                onSearch("");
            }
          }}
          onFocus={() => {
            if (value.length > 0) setOpen(true);
          }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="SEARCH GAMES..."
          sx={{
            flex: 1,
            fontFamily: '"Orbitron", monospace',
            fontSize: "0.92rem",
            letterSpacing: "0.08em",
            color: "#fff",
            py: 1,
            "& input::placeholder": { color: "rgba(255,230,0,0.35)" },
          }}
        />
        <IconButton
          size="small"
        onClick={() => {onSearch(value)}}
          sx={{
            background: "#FFE600",
            borderRadius: 0, 
            width: 56,     
            flexShrink: 0,
            "&:hover": {
              background: "#FFE600",
              boxShadow: "0 0 12px rgba(255,230,0,0.65)",
            },
          }}
        >
          <SearchIcon sx={{ color: "rgba(0,0,0,0.6)", fontSize: 20 }} />
        </IconButton>
      </Box>

      {open && (
        <Paper
          sx={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#0d0d0d",
            border: "1px solid rgba(255,230,0,0.3)",
            borderRadius: "4px",
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              px: 2,
              pt: 1,
              pb: 0.5,
              fontSize: "0.62rem",
              fontFamily: '"Orbitron", monospace',
              color: "rgba(255,230,0,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            suggestions
          </Box>
          {suggestions
            .filter((s) => s.toLowerCase().includes(value.toLowerCase()))
            .map((s) => (
              <Box
                key={s}
                onMouseDown={() => {
                  setValue(s);
                  setOpen(false);
                }}
                sx={{
                  px: 2,
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  fontFamily: '"Orbitron", monospace',
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.75)",
                  cursor: "pointer",
                  "&:hover": {
                    background: "rgba(255,230,0,0.08)",
                    color: "#FFE600",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgba(255,230,0,0.4)",
                    flexShrink: 0,
                  }}
                />
                {s}
              </Box>
            ))}
        </Paper>
      )}
    </Box>
  );
};
