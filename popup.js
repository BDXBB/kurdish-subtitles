
// Control HTML & Send Data or changes to Content.js

document.addEventListener('DOMContentLoaded', () => {
  const Switch = document.getElementById('toggles-tr');
  const Fromlanguage = document.getElementById('language-select');
  const header = document.getElementById('settings-header');
  const accordion = document.getElementById('settings');

  if (header && accordion) {
    header.addEventListener('click', () => {
      accordion.classList.toggle('open');
    });
  }
  
  const apiKeyInput = document.getElementById('api-key-input');
  const saveButton = document.getElementById('save-api-key');
  const deleteButton = document.getElementById('delete-api-key');
  const statusSpan = document.getElementById('api-key-status');

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

  chrome.storage.sync.get("PAG_API_KEY", (result) => {
    if (result.PAG_API_KEY) {
      apiKeyInput.value =  result.PAG_API_KEY;
    }
  });

    // Save Api key
  saveButton.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
      chrome.storage.sync.set({ PAG_API_KEY: key });
      statusSpan.textContent = 'Key saved ✅';
      MsgToContent({ type: 'PAG_API_KEY', Enabled: true, PAG_API_KEY: key});
    } else {
      statusSpan.textContent = 'Please Enter a Valid Key';
    }
  });

  // Delete Api key
  deleteButton.addEventListener('click', () => {
  chrome.storage.sync.remove("PAG_API_KEY", () => {
    apiKeyInput.value = '';
    MsgToContent({ type: 'PAG_API_KEY', Enabled: false });
    statusSpan.textContent = 'Key deleted ❌';
});
  });

});

