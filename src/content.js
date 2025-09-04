// Default

let isTranslationEnabled = true;
let Tolanguagevalue = 'ckb';
let Fromlanguagevalue = 'auto'
let subtitleIntervalId = null;  // To Stop old setInterval

// The injectScript Working Like Bridge Btween The Site and This Code To Get Data Like window._bs
function injectScript() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('src/injector.js');
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}

function StopACleanup() {
  if (subtitleIntervalId) {
    clearInterval(subtitleIntervalId);
    subtitleIntervalId = null;
  }
  const oldBox = document.getElementById("ckb-subtitle");
  if (oldBox) oldBox.remove();
  console.log("Stoped & clean up");
}

// Listeneing to the messsges
window.addEventListener('message', (event) => {
  if (event.source !== window || event.data.type !== 'FROM_PAGE_SCRIPT') {
    return;
  }
  const { courseSlug, pathname } = event.data.payload;
  if (courseSlug && pathname) {
    main(courseSlug, pathname); // Calling main function
  } else {
    console.error('Unable to get course data from this page');
  }
}, false);

// TOGGLE ON & OFF & Calling injectScript function
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOGGLE_IS') {
    isTranslationEnabled = message.enabled;
    if (isTranslationEnabled) {
      injectScript();  //  Calling injectScript 
    } else {
      StopACleanup();
    }
  } else if (message.type === 'LANGUAGE_IS') {
    Tolanguagevalue = message.language;
    console.log(`Language Changed to: ${Tolanguagevalue}`);
  }
});


// main
async function main(courseSlug, pathname) {

// Clearing Out SetInterval 
if (subtitleIntervalId !== null) {
  clearInterval(subtitleIntervalId);
  subtitleIntervalId = null;
}

// Removing old Subtitle
const oldBox = document.getElementById("ckb-subtitle");
if (oldBox) oldBox.remove();


  // Text and Subtitle Will Be in varibles
  let subtitles = [];
  let lastText = null;

  async function getDynamicVttUrl() {
  try {
    console.log("Trying to get VTT URL...");
    const pathParts = pathname.split('/').filter(p => p);
    const lessonSlug = pathParts[pathParts.length - 1];

    if (!courseSlug || !lessonSlug) {
      console.error("No courseSlug or lessonSlug found on this page");
      return null;
    }

    const courseApiUrl = `https://api.frontendmasters.com/v2/kabuki/courses/${courseSlug}`;
    const response = await fetch(courseApiUrl, { credentials: 'include' });

    if (!response.ok) {
      throw new Error(`Error geting Subtitles course: ${response.status} ${response.statusText}`);
    }

    const courseData = await response.json();

    const lessonData = courseData.lessonData;
    // console.log("lessonData:", lessonData);

    // Convert object to array
    const lessonList = Object.values(lessonData);
    const lesson = lessonList.find(l => l.slug === lessonSlug);

    if (!lesson) {
      console.error("The current lesson was not found in the course data");
      return null;
    }

    const lessonIndex = lesson.index;
    const datePublished = courseData.datePublished;

    if (datePublished === undefined || lessonIndex === undefined) {
      console.error("No datePublished or lessonIndex found in the API res");
      return null;
    }

    const captionsRoot = "https://captions.frontendmasters.com/assets/courses/";
    const captionsPath = `${datePublished}-${courseSlug}/${lessonIndex}-${lessonSlug}.vtt`;

    return captionsRoot + captionsPath;

  } catch (error) {
    console.error("Error to get VTT link:", error);
    return null;
  }
}


  async function GetpsVTT(url) {
    const res = await fetch(url);
    const text = await res.text();
    return PsTTV(text);
  }

  function PsTTV(vtt) {
    const blocks = vtt.split('\n\n');
    return blocks
      .map(block => {
        const lines = block.split('\n');
        if (lines.length >= 2 && lines[1].includes('-->')) { // Start To End
          const [start, end] = lines[1].split('-->').map(t => ToSeconds(t.trim()));
          const text = lines.slice(2).join(' ').trim();
          return { start, end, text };
        }
      }).filter(Boolean); // If Output is undefined 
  }

  function ToSeconds(timeStr) {
    if (typeof timeStr !== 'string' || !timeStr.includes(':')) {
        console.error(`Invalid time format: ${timeStr}`);
        return 0;
    }
    const parts = timeStr.split(':');
    const h = parseFloat(parts[0]) || 0;
    const m = parseFloat(parts[1]) || 0;
    const s = parseFloat(parts[2].replace(',', '.')) || 0;
    return h * 3600 + m * 60 + s;
  }

  // Not Tested But Shoud Work It use Google Translation Api NEED GOOGLE Cloud Console Sine i am in Iraq i Can't Use it WOW Whyy??? 
  // const API_KEY = "" 
  // async function PAGItranslate(text, targetLang = 'ckb', sourceLang = 'auto') {
  //   try {
  //     const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         q: text,
  //         source: sourceLang,
  //         target: targetLang,
  //         format: "text"
  //       }),
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     const data = await res.json();
  //     const translated = data.data.translations[0].translatedText;
  //     showSubtitle(translated);
  //   } catch (error) {
  //     console.error("Translation error:", error);
  //   }
  // }

 // So I extracted Used API from a program APK in Android Using Nox emulator and BurbSuite And Create PHP Code To Use It On My WEB SERVER
 // & YA It Worked Until The SERVER was banned by Google
 // Honasly it wasn't banned, but it needed a captcha because I used or I mean sent, a lot of translation requests
 // & Yes Since it is server & Have direct Public IP a captcha like applied
 // & So My Code Can't bypass Captcha

// This PHP Code API & Function to Use

// <?php
// header('Content-Type: application/json');

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: GET, POST");
// header("Access-Control-Allow-Headers: Content-Type");


//     if (isset($_GET['to'])) {
//         if (isset($_GET['text'])) {
//             $from = isset($_GET['from']) && !empty($_GET['from']) ? $_GET['from'] : 'auto'; // auto detect lang...
//             $fields = array('sl' => urlencode($from), 'tl' => urlencode($_GET['to']), 'q' => urlencode($_GET['text']));

//             $fields_string = '';
//             foreach ($fields as $key => $value) {
//                 $fields_string .= '&' . $key . '=' . $value;
//             }
//             $ch = curl_init();
//             curl_setopt_array($ch, [
//                 CURLOPT_URL => 'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t',
//                 CURLOPT_POSTFIELDS => $fields_string,
//                 CURLOPT_RETURNTRANSFER => true,
//                 CURLOPT_ENCODING => 'UTF-8',
//                 CURLOPT_SSL_VERIFYPEER => false,
//                 CURLOPT_SSL_VERIFYHOST => false,
//                 CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36(KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
//             ]);
//             $result = json_decode(curl_exec($ch), true);
//             $translatedText = $result[0][0][0];
//             if ($translatedText) {
//               $response = [
//     'status' => 'true',
//     'text' => $translatedText
// ];
//               echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
//             } else {
//                   $response = [
//     'status' => 'false',
//     'error' => 'Maybee server ip bannded'
// ];
//               echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
//             }
 
//         } else {
//             // print 'Enter the text to translate it';
//             echo json_encode([ 'status' => 'false','error' => 'Enter the text to translate it'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
//         }
//     } else {
//         // print 'Enter the language to translate to';
//         echo json_encode([ 'status' => 'false','error' => 'Enter the language to translate to'], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
//     }

/// *** Funcion To Use *** ///

// Adding Support For API's ... Soon & I Think i have use OOP ? Maybeeeee...

//  async function MYAPI(text, targetLang = 'ckb', sourceLang = 'auto') {
//   try {
//     const res = await fetch(`https://silverbase.site/api/trans.php?from=${sourceLang}&to=${targetLang}&text=${encodeURIComponent(text)}`);
//     const data = await res.json();

//     if (data.status === "true") {
//       showSubtitle(data.text);
//     } else if (data.status === "false" && data.error == "Maybee server ip bannded") {
//       console.error("Server Error:", data.error);
//     } else {
//       console.error('Translation failed Parameter required:',  data.error);
//     }

//   } catch (e) {
//     console.error('Network or translation error:', e);
//   }
// }



  async function FAGtranslate(text, targetLang = 'ckb', sourceLang = 'auto') {
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await response.json();
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        const translatedText = data[0][0][0];
        showSubtitle(translatedText);
      } else {
        console.error('Translation failed: Maybe Your IP bannded');
      }
    } catch (error) {
      console.error('Network Translation error:', error);
    }
  }

  function showSubtitle(text) {
    let subtitleBox = document.getElementById("ckb-subtitle");
    if (!subtitleBox) {
      subtitleBox = document.createElement("div");
      subtitleBox.id = "ckb-subtitle";
      subtitleBox.style.position = "absolute";
      subtitleBox.style.bottom = "10%";
      subtitleBox.style.left = "50%";
      subtitleBox.style.transform = "translateX(-50%)"; // Smoth Change Between Subtitles
      subtitleBox.style.background = "rgba(0,0,0,0.7)";
      subtitleBox.style.color = "#fff";
      subtitleBox.style.padding = "8px 16px";
      subtitleBox.style.fontSize = "18px";
      subtitleBox.style.borderRadius = "6px";
      subtitleBox.style.zIndex = "9999"; // to be always top
      subtitleBox.style.maxWidth = "90%";
      subtitleBox.style.textAlign = "center";
      if (Tolanguagevalue == 'ku' || Tolanguagevalue == 'fr' || Tolanguagevalue == 'ar') {
      subtitleBox.style.direction = "rtl";        // Kurdish & Arabic & Farsi has to be rtl
      } else {
      subtitleBox.style.direction = "ltr";        // Russian & Turkish so it has to be ltr
      }
      subtitleBox.style.unicodeBidi = "embed";
      subtitleBox.style.pointerEvents = "none";
      const container = document.querySelector(".FMPlayer2-VideoContainer") || document.body; // FrontEnd Master only
      container.style.position = "relative";
      container.appendChild(subtitleBox);
    }
    subtitleBox.innerText = text;
  }

  // Start and Control Subtitle based on video
  const video = document.querySelector("video"); // I Think it Will Work With all Web Sites ?
  if (!video) return;

  const VTT_URL = await getDynamicVttUrl();
  
  if (!VTT_URL) {
    console.error("Failed to get VTT link");
    return;
  }
  subtitles = await GetpsVTT(VTT_URL);

// Recalling setInterval every 500 seconds
subtitleIntervalId = setInterval(() => {
  const currentTime = video.currentTime;
  const current = subtitles.find(s => currentTime >= s.start && currentTime <= s.end);
  if (current && current.text !== lastText) {
    lastText = current.text;
    FAGtranslate(current.text, Tolanguagevalue, Fromlanguagevalue);
    console.log(Tolanguagevalue)
  }
}, 500); // 500 seconds
}

let currentPath = window.location.pathname;
// Thank You Stackoverflow https://stackoverflow.com/questions/56889759/how-javascript-engine-detects-dom-changes
const observer = new MutationObserver(() => {
  if (window.location.pathname !== currentPath) {
    currentPath = window.location.pathname;
    // console.log("Change in the videos link wich meain the video has changed", currentPath);

    // Callind and Reinjecting Script
    // To Get New Data Like window._bs
    injectScript();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
