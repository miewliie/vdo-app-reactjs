import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from './index';
import { fetchFromAPI } from "../utils/fetchFromAPI";


const ChannelDetail = () => {
  const { id } = useParams();
  const [ channelDetail, setChannelDetail ] = useState(null);
  const [ videos, setVideos ] = useState([]);

  useEffect(() => {
    fetchFromAPI(`channel?id=${id}`).then((data) => 
    setChannelDetail(data.meta))

    fetchFromAPI(`channel?id=${id}&sort_by=newest`).then((data) => 
    setVideos(data.data))
  }, [id])

  return (
    <Box data-test-id='channelDetail' minHeight="95vh">
      <Box>
        <div 
        data-test-id='channelDetail-cover'
        style={{
          background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
          zIndex: 10,
          height: '300px'
        }} />

        <ChannelCard channelDetail={channelDetail} hasHTTPS='true' marginTop='-110px' />
      </Box>
      <Box data-test-id='channelDetail-videoList' display="flex" p="2">
        <Box sx={{mr: { sm: '100px' }}} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail
