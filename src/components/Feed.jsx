import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import spinner from "../assets/netflix_spinner.gif";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
        setVideos(
          data.items?.filter((item) => item.id.channelId || item.id.videoId)
        );
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2024 viDHive Media
        </Typography>
      </Box>

      {loading ? (
        <div className="login-spinner">
          <img src={spinner} alt="spinner" />
        </div>
      ) : (
        <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "white" }}
          >
            {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
          </Typography>
          <Videos videos={videos} justifyContent="start" />
        </Box>
      )}
    </Stack>
  );
};

export default Feed;
