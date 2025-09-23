//  Our content.js Can't Access Data in Site Window Soo We Will Use This To Send Data To our content.js
try {
  const hostname = window.location.hostname;
  const getFmData = () => {
    if (hostname.includes('frontendmasters.com') && window._bs && window._bs.courseSlug) {
      // Sendinf Data To content.js Using window.postMessage
      window.postMessage({
        type: 'FROM_PAGE_SCRIPT', // Singh
        payload: {
          courseSlug: window._bs.courseSlug,
          pathname: window.location.pathname
        }
      }, '*');
      // Well We Will Use The Video id From The URL Bur In CASE May You Can Use it idk Just My first Was That
    } else if (hostname.includes('youtube.com') && window.ytplayer && window.ytplayer.config && window.ytplayer.config.args && window.ytplayer.config.args.raw_player_response) {
        // Sendinf Data To content.js Using window.postMessage
      const playerResponse = window.ytplayer.config.args.raw_player_response;
      const captionTracks = playerResponse.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      window.postMessage({
        type: 'FROM_PAGE_SCRIPT', // Singh
        payload: {
          videoID: window.ytplayer.config.args.video_id, // video ID
          captionTracks: captionTracks, // Send the full player response object
          pathname: window.location.pathname
        }
      }, '*');
    } else {
      // if Not Found Data it Wait For it
      // console.log("Waiting for WebSites ...");
      setTimeout(getFmData, 500);
    }
  };
  getFmData();
} catch (e) {
  console.error('Error in injected script:', e);
}