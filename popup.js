
//
const translations = {
  en: {
    "label-translate": "Enable Translation",
    "label-language": "Translate To",
    "change-language": "Language",
    "label-font-size": "Font Size",
    "settings": "Settings",
    "api-key-descrip": "In Case Your IP Got Banned You Can Use Your Own Api Key For Google translation",
    "delete-btn": "Delete",
    "save-btn": "Save"
  },
  ckb: {
    "label-translate": "چالاککردنی وەرگێڕان",
    "label-language": "وەرگێڕان بۆ",
    "change-language": "زمان",
    "label-font-size": "گەورەیی فۆنت ",
    "settings": "ڕێکخستنەکان",
    "api-key-descrip": "ئەگەر IP ـەکەت بلۆک کرا دەتوانی کلیلەکەی خۆت بەکاربەیت بۆ وەرگێڕانی لە گووگڵ",
    "delete-btn": "سڕینەوە",
    "save-btn": "پاشەکەوتکردن"
  },
  ar: {
    "label-translate": "تفعيل الترجمة",
    "label-language": "ترجمة الى",
    "change-language": "اللغة",
    "label-font-size": "حجم خط الترجمة",
    "settings": "الإعدادات",
    "api-key-descrip": "في حال تم حظر عنوان IP الخاص بك يمكنك استخدام مفتاح API الخاص بك لترجمة Google",
    "delete-btn": "حذف",
    "save-btn": "حفظ"
  }
};

function updateUILabels(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((elment) => {
    const key = elment.getAttribute("data-i18n");
    if (dict[key]) {
      elment.textContent = dict[key];
    }
  });

  const rtlLans = ["ar", "ckb"];
  const dir = rtlLans.includes(lang) ? "rtl" : "ltr";
  document.body.setAttribute("dir", dir);
}



// Control HTML & Send Data or changes to Content.js

document.addEventListener('DOMContentLoaded', () => {
  const Switch = document.getElementById('toggles-tr');
  const Fromlanguage = document.getElementById('language-select');
  const header = document.getElementById('settings-header');
  const accordion = document.getElementById('settings');
  const Changelanguage = document.getElementById("change-language");

  if (header && accordion) {
    header.addEventListener('click', () => {
      accordion.classList.toggle('open');
    });
  }
  
  const apiKeyInput = document.getElementById('api-key-input');
  const saveButton = document.getElementById('save-api-key');
  const deleteButton = document.getElementById('delete-api-key');
  const statusSpan = document.getElementById('api-key-status');
  const fontSize = document.getElementById('font-size');

  // Default Settings & Saved Settings Based On Storage 
  chrome.storage.sync.get(['translationEnabled', 'Tolanguagevalue', 'MNLANGUAGE'], (result) => {
    const translationEnabled = result?.translationEnabled ?? true; // Default
    Switch.checked = translationEnabled;
    if (result?.Tolanguagevalue) {
      Fromlanguage.value = result.Tolanguagevalue;
    }
    if (result?.MNLANGUAGE) {
      updateUILabels(result.MNLANGUAGE);
      Changelanguage.value = result.MNLANGUAGE;
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
    if (result?.PAG_API_KEY) {
      apiKeyInput.value =  result.PAG_API_KEY;
    }
  });

    // Save Api key
  saveButton.addEventListener('click', () => {
    const key = apiKeyInput.value.trim();
    if (key) {
      chrome.storage.sync.set({ PAG_API_KEY: key });
      statusSpan.textContent = 'Key saved ✅';
      MsgToContent({ type: 'PAG_API_KEY', enabled: true, PAG_API_KEY: key});
    } else {
      statusSpan.textContent = 'Please Enter a Valid Key';
    }
  });

  // Delete Api key
  deleteButton.addEventListener('click', () => {
  chrome.storage.sync.remove("PAG_API_KEY", () => {
    apiKeyInput.value = '';
    MsgToContent({ type: 'PAG_API_KEY', enabled: false });
    statusSpan.textContent = 'Key deleted ❌';
});
  });

  fontSize.addEventListener('input', (fonts) => {
    const Value = fonts.target.value;
    chrome.storage.sync.set({ FONT_SIZE: Value });
    MsgToContent({ type: 'FONT_SIZE', Value: Value });
  })

  chrome.storage.sync.get("FONT_SIZE", (result) => {
    if (result?.FONT_SIZE) {
      fontSize.value =  result.FONT_SIZE;
    }
  });

Changelanguage.addEventListener("change", () => {
  const lang = Changelanguage.value;
  updateUILabels(lang);
  chrome.storage.sync.set({ MNLANGUAGE: lang });
});


});