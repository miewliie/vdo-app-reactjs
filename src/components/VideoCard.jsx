import React from 'react'
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoVideoUrl, demoVideoTitle, 
  demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video, channelTitle }) => {

  return (
    <Card 
      data-test-id='videoContent'
      sx={{ width: { xs: '100%', sm: '358px', md: '320px' },
      boxShadow: 'none', borderRadius: 0}}>

      <Link to={video.videoId ? `/video/${video.videoId}` : demoVideoUrl } data-test-id='videoUrl'>
        <CardMedia
          data-test-id='video-card'
          image={video?.thumbnail[0]?.url}
          alt={video?.title}
          sx={{ width: {
            xs: '100%', sm: '358px', md: '320px'
          }, height: 180}}
        />
      </Link>
      
      <CardContent 
        data-test-id='videoInfo'
        sx={{ backgroundColor: '#1E1E1E',
        height: '106px' }} >

        <Link to={video?.videoId ? `/video/${video?.videoId}` : demoVideoUrl }>
          <Typography variant='subtitle1' fontWeight='bold' color='#FFF' data-test-id='videoTitle'>
            {video?.title.slice(0, 60) || 
            demoVideoTitle.slice(0,60)}
          </Typography>
        </Link>

        { channelTitle &&
          <Link to={video?.channelId ? `/channel/${video?.channelId}` : demoChannelUrl } data-test-id='channelTitle'>
            <Typography variant='subtitle2' fontWeight='bold' color='grey' data-test-id='channelTitle'>
              {channelTitle.slice(0, 60) || 
              demoChannelTitle.slice(0,60)}
              <CheckCircleIcon 
              data-test-id='checkIcon'
              sx={{
                fontSize: 12, color: 'grey', ml: '5px'
              }} />
            </Typography>
        </Link>
        }

      </CardContent>
    </Card>
  )
}

export default VideoCard