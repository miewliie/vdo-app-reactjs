import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import { demoChannelTitle, demoProfilePicture } from "../utils/constants";

const ChannelCard = ({channelDetail, hasHTTPS, marginTop}) => {

  let channelThumbnail = '';

  if(hasHTTPS === 'true'){
    channelThumbnail = channelDetail?.thumbnail[0]?.url;
  } else {
    channelThumbnail = 'https:' + channelDetail?.thumbnail[0]?.url;
  }

  return  (

    <Box
      data-test-id='channelCard'
      sx={{
        boxShadow: 'none',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: { xs: '356px', md: '320px' },
        height: '326px',
        margin: 'auto',
        marginTop
      }}>
        
        <Link to={`/channel/${channelDetail?.channelId}`} data-test-id='channelLink'>
            <CardContent 
              data-test-id='cardContent'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#FFF'
              }}>
                <CardMedia 
                  data-test-id='channelThumbnail'
                  image={channelThumbnail || demoProfilePicture}
                  alt={channelDetail?.channelTitle || channelDetail?.title || demoChannelTitle}
                  sx={{ borderRadius: '50%', height: '180px',
                    width: '180px', mb: 2, border: '1px solid'}}
                />
                <Typography data-test-id='channelTitle' variant="h6">
                  {channelDetail?.channelTitle || channelDetail?.title || demoChannelTitle}
                  <CheckCircle data-test-id='CheckCircleIcon' sx={{ fontSize: 14, color: 'gray', ml: '5px'}} />
                </Typography>
                
                <Typography data-test-id='subscriberCount'>
                {channelDetail?.subscriberCount}
                </Typography>
  
            </CardContent>
        </Link>
  
    </Box>
   
  )}

export default ChannelCard
