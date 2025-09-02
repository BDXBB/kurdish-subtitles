// We Need Something Make Our Extension Working When We Load & Reload The Pages

function MsgToContent(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, message);
        }
    });
    }

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // console.log("Rs") Debagging I know But It Working < ` _ ` > 
  if (changeInfo.status === "complete") {
    // console.log("Rss")
    chrome.storage.sync.get(['translationEnabled', 'Tolanguagevalue'], (result) => {
      const isEnabled = result.translationEnabled === true;
      const lang = result.Tolanguagevalue || 'ckb';

      if (isEnabled) {
        //   console.log("Rssssas")
         MsgToContent({ type: 'LANGUAGE_IS', language: lang });
         MsgToContent({ type: 'TOGGLE_IS', enabled: isEnabled });
      }
    });
  }
});
