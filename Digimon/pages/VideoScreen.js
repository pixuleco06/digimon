import React from 'react';
import { WebView } from 'react-native-webview';

const VideoScreen = () => {
  return (
    <WebView
      source={{ uri: 'https://www.youtube.com/watch?v=GF6BfgZW-QE' }}
      style={{
        width: 500, 
        height: 400, 
        backgroundColor: 'black', 
      }}
    />
  );
};

export default VideoScreen;
