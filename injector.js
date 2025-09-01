//  Our content.js Can't Access Data in Site Window Soo We Will Use This To Send Data To our content.js
try {
  const getFmData = () => {
    if (window._bs && window._bs.courseSlug) {
      // Sendinf Data To content.js Using window.postMessage
      window.postMessage({
        type: 'FROM_PAGE_SCRIPT', // Singh
        payload: {
          courseSlug: window._bs.courseSlug,
          pathname: window.location.pathname
        }
      }, '*');
    } else {
      // if Not Found Data it Wait For it
      console.log("Waiting for Frontend Masters data...");
      setTimeout(getFmData, 500);
    }
  };
  getFmData();
} catch (e) {
  console.error('Error in injected script:', e);
}