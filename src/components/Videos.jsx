import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction }) => {

    if(!videos?.length) return <Loader />;

    if(videos){
        return (
            <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
            {videos.map((item, idx) => (
                <Box key={idx}>
                {item.videoId && <VideoCard video={item} channelTitle={item.channelTitle}/> }
                {item.type === 'channel' && <ChannelCard channelDetail={item} hasHTTPS='false' />}
                </Box>
            ))}
            </Stack>
        );
    }
}

export default Videos;