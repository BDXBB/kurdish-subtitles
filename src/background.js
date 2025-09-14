// We Need Something Make Our Extension Working When We Load & Reload The Pages

// We Don't needed any more myabee 

// function MsgToContent(message) {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         if (tabs[0] && tabs[0].id) {
//         chrome.tabs.sendMessage(tabs[0].id, message);
//         }
//     });
//     }

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     // console.log("Rs") Debagging I know But It Working < ` _ ` > 
//   if (changeInfo.status === "complete") {
//     // console.log("Rss")
//     chrome.storage.sync.get(['translationEnabled', 'Tolanguagevalue'], (result) => {
//       const isEnabled = result.translationEnabled === true;
//       const lang = result.Tolanguagevalue || 'ckb';

//       if (isEnabled) {
//         //   console.log("Rssssas")
//          MsgToContent({ type: 'LANGUAGE_IS', language: lang });
//          MsgToContent({ type: 'TOGGLE_IS', enabled: isEnabled });
//       }
//     });
//   }
// });


/// Just Default settings & notifications 

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    translationEnabled: true,
    Tolanguagevalue: 'ckb'
  }, () => {
    console.log("Default settings saved");
  });
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/128.png',
      title: 'Kurdish Subtitles Installed',
      message: 'Thanks for installing Kurdish Subtitles'
    });
  } else if (details.reason === "update") {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/128.png',
      title: 'Kurdish Subtitles Updated',
      message: `The extension has been updated to version ${chrome.runtime.getManifest().version}`
    });
  }
});

