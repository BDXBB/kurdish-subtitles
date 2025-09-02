
// Control HTML & Send Data or changes to Content.js

document.addEventListener('DOMContentLoaded', () => {
  const Switch = document.getElementById('toggles-tr');
  const Fromlanguage = document.getElementById('language-select');

  // Default Settings & Saved Settings Based On Storage 
  chrome.storage.sync.get(['translationEnabled', 'Tolanguagevalue'], (result) => {
    Switch.checked = result.translationEnabled  === true;; // Default
    if (result.Tolanguagevalue) {
      Fromlanguage.value = result.Tolanguagevalue;
    }
  });

    function MsgToContent(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, message);
        }
    });
    }

  // TOGGLE_IS ON ? OFF 
  Switch.addEventListener('change', () => {
    const isEnabled = Switch.checked;
    chrome.storage.sync.set({ translationEnabled: isEnabled });
    MsgToContent({ type: 'TOGGLE_IS', enabled: isEnabled });
  });

  // Change LANGUAGE
  Fromlanguage.addEventListener('change', () => {
    const lang = Fromlanguage.value;
    chrome.storage.sync.set({ Tolanguagevalue: lang });
    MsgToContent({ type: 'LANGUAGE_IS', language: lang });
  });
});

