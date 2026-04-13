import { Box } from "@mui/material";

interface PagintionPrams
{
  totalPosts: number;
  postsForpage:number;
  setCurrentPage: (page: number) => void;
  currentPage: number;

}
 const Pagintion = ({totalPosts,postsForpage, setCurrentPage, currentPage}: PagintionPrams) =>
 {
  let Pages = [];
   for(let i  = 1; i <=  Math.ceil( totalPosts/postsForpage ); i++)
   {
    Pages.push(i)
   }
return (
  <><Box sx={{display:"flex",gap:1}}>
    {Pages.map((page: number, index: number) => (
      <button
        key={index}
        style={{
          fontFamily: '"Orbitron", monospace',
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
          color: currentPage === page ? "#000" : "rgba(255,255,255,0.75)",
          background: currentPage === page ? "#FFE600" : "transparent",
          border: "1.5px solid",
          borderColor: currentPage === page ? "#FFE600" : "rgba(255,230,0,0.35)",
          borderRadius: "4px",
          width: 36,
          height: 36,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          if (currentPage !== page) {
            e.currentTarget.style.borderColor = "#FFE600";
            e.currentTarget.style.color = "#FFE600";
          }
        }}
        onMouseLeave={(e) => {
          if (currentPage !== page) {
            e.currentTarget.style.borderColor = "rgba(255,230,0,0.35)";
            e.currentTarget.style.color = "rgba(255,255,255,0.75)";
          }
        }}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button> 
    ))}
    </Box> 
  </>
);
}

 export default Pagintion