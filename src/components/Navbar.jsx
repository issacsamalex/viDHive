import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
        zIndex: 1,
      }}
    >
      <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />
        <Typography
          color="#fff"
          variant="body2"
          ml={1}
          fontWeight="bold"
          fontFamily="cursive"
        >
          viDHive
        </Typography>
      </Link>
      <SearchBar />
      <Box sx={{ display: { xs: "none", sm: "inline-block" } }}></Box>
    </Stack>
  );
};

export default Navbar;
