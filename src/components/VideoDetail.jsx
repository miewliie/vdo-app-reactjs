import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from './index';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const { id } = useParams();

  const { title, channelId, channelTitle, viewCount, uploadDate} = videoDetail;

  useEffect(() => {
    fetchFromAPI(`video?id=${id}`).then((data) => setVideoDetail(data))
    fetchFromAPI(`related?id=${id}`).then((data) => setRelatedVideos(data.data))
  }, [id]);
  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>

        <Box flex={1}>
          <Box data-test-id='playerBox' sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer data-test-id='videoPlayer' url={`https://www.youtube.com/watch?v=${id}`} 
            className="react-player" controls />

            <Typography data-test-id='videoPlayerTitle' color='#FFF' variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>

            <Stack direction='row' justifyContent='space-between' sx={{
              color: '#FFF'}} py={1} px={2} >
                <Link to={`/channel/${channelId}`}>
                  <Typography variant={{ sm: 'subtitle1', md: 'h6' }}
                    color='#FFF'>
                      {channelTitle}
                      <CheckCircle sx={{
                        fontSize: '12px', color: 'gray', ml: '5px', mr: '5px' }} />
                      {uploadDate}
                    </Typography>
                </Link>
                <Stack>
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                </Stack>
            </Stack>
          </Box>

        </Box>

        <Box px={2} py={{md: 1, xs: 5}} justifyContent='center'
          alignItems='center' >
            <Videos videos={relatedVideos} direction='column' />
        </Box>

      </Stack>
    </Box>
  )
}

export default VideoDetail
