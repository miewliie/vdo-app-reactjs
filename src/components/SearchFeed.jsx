import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();
  
  useEffect(() => {
    setVideos(null);
    fetchFromAPI(`search?query=${searchTerm}`).then((data) => setVideos(data.data))
    }, [searchTerm]);

  return (
      <Box data-test-id="searchResult" p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography data-test-id="searchResultTitle" variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          Search results for: <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
        </Typography>

        <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;