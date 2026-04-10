import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCart } from "../context/cart/cartcontext";

interface props {
  image: string;
  title: string;
  price: string;
  _id: string;
}
export default function productCard({ _id, image, title, price }: props) {
  const { addItemToCart } = useCart();
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          width: "100%",
          height: 130,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontFamily: '"Orbitron", monospace' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontFamily: '"Orbitron", monospace' }}
        >
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{
            background: "#FFE600",
            color: "#000000",
            fontFamily: '"Orbitron", monospace',
          }}
          onClick={() => addItemToCart(_id)}
        >
          add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
