// Default
// Object is clener
let settings = {
  translationEnabled: true,
  Tolanguagevalue: 'ckb',
  Fromlanguagevalue: 'auto',
  // Get The API_KEY it From GOOGLE Cloud Console > APIs & Services > Credentials > & Enable Google Translation Api 
  // PAG like Paid Api from Google > idk just a name I liked
  PAG_API_KEY: null
};
let subtitleIntervalId = null;  // To Stop old setInterval
let subtitles = null;


  // Not Tested But Shoud Work It use Google Translation Api NEED GOOGLE Cloud Console Sine i am in Iraq i Can't Use it WOW Whyy??? 
  async function PAGItranslate(text, targetLang = 'ckb', sourceLang = 'auto') {
    try {
      const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${PAG_API_KEY}`, {
        method: "POST",
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: "text"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      const translated = data.data.translations[0].translatedText;
      showSubtitle(translated);
    } catch (error) {
      console.error("Translation error:", error);
    }
  }

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

// Adding Support For API's ... Soon & I Think i have use OOP ? Maybeeeee... Nahh idk

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
      console.error('Error:', error);
    }
  }
 /// Show Subtitle & Style ///
function showSubtitle(text) {
  const hostname = window.location.hostname;
  let subtitleBox = document.getElementById("ckb-subtitle");

  // FRONTEND MASTERS Subtitle Style //
  if (hostname.includes('frontendmasters.com')) {
    if (!subtitleBox) {
      subtitleBox = document.createElement("div");
      subtitleBox.id = "ckb-subtitle";
      subtitleBox.style.position = "absolute";
      subtitleBox.style.bottom = "10%";
      subtitleBox.style.left = "50%";
      subtitleBox.style.transform = "translateX(-50%)";
      subtitleBox.style.background = "rgba(0,0,0,0.7)";
      subtitleBox.style.color = "#fff";
      subtitleBox.style.padding = "8px 16px";
      subtitleBox.style.fontSize = "18px";
      subtitleBox.style.borderRadius = "6px";
      subtitleBox.style.zIndex = "9999";
      subtitleBox.style.maxWidth = "90%";
      subtitleBox.style.textAlign = "center";
      subtitleBox.style.pointerEvents = "none";
      subtitleBox.style.unicodeBidi = "embed";

      if (settings.Tolanguagevalue === 'ku' || settings.Tolanguagevalue === 'fr' || settings.Tolanguagevalue === 'ar') {
        subtitleBox.style.direction = "rtl";
      } else {
        subtitleBox.style.direction = "ltr";
      }
    }

    const container = document.querySelector(".vjs-text-track-display") || document.querySelector(".FMPlayer2-VideoContainer") || document.body;
    if (!document.querySelector(".vjs-text-track-display")) {
      container.style.position = "relative";
    }

    container.appendChild(subtitleBox);
    subtitleBox.innerText = text;

  }
  // YOUTUBE Subtitle Style //
  else if (hostname.includes('youtube.com')) {
    const container = document.querySelector('.ytp-caption-window-container');
    if (!container) return;

    if (!subtitleBox) {
      subtitleBox = document.createElement('div');
      subtitleBox.id = 'ckb-subtitle';
      subtitleBox.className = 'caption-window ytp-caption-window-bottom';
      subtitleBox.setAttribute('tabindex', '0');
      subtitleBox.setAttribute('draggable', 'true');
      subtitleBox.style.touchAction = 'none';
      subtitleBox.style.textAlign = 'center';
      subtitleBox.style.left = '50%';
      subtitleBox.style.width = 'auto';
      subtitleBox.style.maxWidth = '90%';
      subtitleBox.style.marginLeft = '0';
      subtitleBox.style.transform = 'translateX(-50%)';
      subtitleBox.style.bottom = '2%';
      subtitleBox.style.zIndex = '10';
      subtitleBox.style.position = 'absolute';

      if (settings.Tolanguagevalue === 'ku' || settings.Tolanguagevalue === 'fr' || settings.Tolanguagevalue === 'ar') {
        subtitleBox.style.direction = "rtl";
      } else {
        subtitleBox.style.direction = "ltr";
      }
      // The Style Taked From Orginal YOUTUBE Subtitles
      const spanCaptionsText = document.createElement('span');
      spanCaptionsText.className = 'captions-text';
      spanCaptionsText.style.overflowWrap = 'normal';
      spanCaptionsText.style.display = 'block';

      const visualLine = document.createElement('span');
      visualLine.className = 'caption-visual-line';
      visualLine.style.display = 'block';

      const captionBox = document.createElement('span');
      captionBox.className = 'ytp-caption-segment';
      captionBox.style.display = 'inline-block';
      captionBox.style.whiteSpace = 'pre-wrap';
      captionBox.style.background = 'rgba(8, 8, 8, 0.75)';
      captionBox.style.fontSize = '15.8px';
      captionBox.style.color = '#ffffff';

      captionBox.innerText = text;

      visualLine.appendChild(captionBox);
      spanCaptionsText.appendChild(visualLine);
      subtitleBox.appendChild(spanCaptionsText);
      container.appendChild(subtitleBox);
    } else {
      const captionBox = subtitleBox.querySelector('.ytp-caption-segment');
      if (captionBox) {
        captionBox.innerText = text;
      }
    }
  } else if (hostname.includes('udemy.com')) {
  const container = document.querySelector('.captions-display--captions-container--PqdGQ') || document.body;

  if (!container) return;
  if (!subtitleBox) {
    subtitleBox = document.createElement('div');
    subtitleBox.id = 'ckb-subtitle';
    subtitleBox.setAttribute('data-purpose', 'custom-caption-text');

    subtitleBox.style.fontSize = "1.56rem";
    subtitleBox.style.opacity = "0.75";
    subtitleBox.style.color = "#fff";
    subtitleBox.style.background = "rgba(0,0,0,0.6)";
    subtitleBox.style.padding = "8px 16px";
    subtitleBox.style.borderRadius = "6px";
    subtitleBox.style.margin = "8px auto";
    subtitleBox.style.textAlign = "center";
    subtitleBox.style.maxWidth = "90%";
    subtitleBox.style.pointerEvents = "none";
    subtitleBox.style.unicodeBidi = "embed";

    if (settings.Tolanguagevalue === 'ku' || settings.Tolanguagevalue === 'fr' || settings.Tolanguagevalue === 'ar') {
      subtitleBox.style.direction = "rtl";
    } else {
      subtitleBox.style.direction = "ltr";
    }

    container.appendChild(subtitleBox);
  }

  subtitleBox.innerText = text;
}

}

/// Show Subtitle & Style ///

  async function GetpsVTT(url) {
    const res = await fetch(url);
    const text = await res.text();
    return PsTTV(text);
  }

function PsTTV(vtt) {
  const blocks = vtt
    .replace(/^WEBVTT\s*/i, '')   // Remove WEBVTT
    .trim()
    .split(/\n{2,}/);             // Divide texts with two or more line breaks

  return blocks
    .map(block => {
      const lines = block.trim().split('\n');

      // Time line it cloud be in lines[0] OR lines[1]
      let timingLineIndex = lines.findIndex(line => line.includes('-->'));
      if (timingLineIndex === -1) return null;

      const [start, end] = lines[timingLineIndex]
        .split('-->')
        .map(t => ToSeconds(t.trim()));

      const text = lines
        .slice(timingLineIndex + 1)
        .join(' ')
        .trim();
      return { start, end, text };
    })
    .filter(Boolean); // If Output is undefined
}


  function ToSeconds(timeStr) {
    if (typeof timeStr !== 'string' || !timeStr.includes(':')) {
        console.error(`Invalid time format: ${timeStr}`);
        return 0;
    }
    const parts = timeStr.split(':');
    let h = 0, m = 0, s = 0;
    if (parts.length === 3) {
        h = parseFloat(parts[0]) || 0;
        m = parseFloat(parts[1]) || 0;
        s = parseFloat(parts[2].replace(',', '.')) || 0;
  } else if (parts.length === 2) {
        m = parseFloat(parts[0]) || 0;
        s = parseFloat(parts[1].replace(',', '.')) || 0;}
    // const h = parseFloat(parts[0]) || 0;
    // const m = parseFloat(parts[1]) || 0;
    // const s = parseFloat(parts[2].replace(',', '.')) || 0;
    return h * 3600 + m * 60 + s;
  }

  /// /// 

 async function translateAndShow(text) {
  if (settings.PAG_API_KEY) {
    await PAGItranslate(text, settings.Tolanguagevalue, settings.Fromlanguagevalue);
  } else {
    await FAGtranslate(text, settings.Tolanguagevalue, settings.Fromlanguagevalue);
  }
}


function StopACleanup() {
  if (subtitleIntervalId) {
    clearInterval(subtitleIntervalId);
    subtitleIntervalId = null;
  }
  subtitles = null;
  const oldBox = document.getElementById("ckb-subtitle");
  if (oldBox) oldBox.remove();
  console.log("Stoped & clean up");
}


// TOGGLE ON & OFF & Calling injectScript function
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TOGGLE_IS') {
    settings.translationEnabled = message.enabled;
    if (settings.translationEnabled) {
        chrome.storage.sync.get("PAG_API_KEY", (result) => {
          if (result.PAG_API_KEY) {
            PAG_API_KEY =  result.PAG_API_KEY;
          }
        });
      Run();
    } else {
      StopACleanup();
    }
  } else if (message.type === 'LANGUAGE_IS') {
    settings.Tolanguagevalue = message.language;
    console.log(`Language Changed to: ${settings.Tolanguagevalue
      
    }`);
  } else if (message.type === 'PAG_API_KEY') {
    if (message.enabled){
      PAG_API_KEY =  message.PAG_API_KEY;
    } else {
      PAG_API_KEY = null;
    }
  }
});

/// FrontendMasters ///

// The injectScript Working Like Bridge Btween The Site and This Code To Get Data Like window._bs
function injectScriptForFM() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('src/injector.js');
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}

  async function getDynamicVttUrl(courseSlug, pathname) {
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

/// From https://github.com/devhims/youtube-caption-extractor/blob/main/src/index.ts ///
const INNERTUBE_API_BASE = 'https://www.youtube.com/youtubei/v1';
const INNERTUBE_API_KEY = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
const WEB_CLIENT_VERSION = '2.20250222.10.00';

class Subtitle {
  constructor(start, dur, text) {
    this.start = start;
    this.dur = dur;
    this.text = text;
  }
}

class VideoDetails {
  constructor(title, description, subtitles) {
    this.title = title;
    this.description = description;
    this.subtitles = subtitles;
  }
}

function generateVisitorData() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  for (let i = 0; i < 11; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getSessionData() {
  const visitorData = generateVisitorData();
  return {
    context: {
      client: {
        hl: 'en',
        gl: 'US',
        clientName: 'WEB',
        clientVersion: WEB_CLIENT_VERSION,
        visitorData: visitorData,
      },
      user: { enableSafetyMode: false },
      request: { useSsl: true },
    },
    visitorData: visitorData,
  };
}

async function fetchInnertube(endpoint, data) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'X-Youtube-Client-Version': WEB_CLIENT_VERSION,
    'X-Youtube-Client-Name': '1',
    'X-Goog-Visitor-Id': data.visitorData,
    'Origin': 'https://www.youtube.com',
    'Referer': 'https://www.youtube.com/',
  };
  const url = `${INNERTUBE_API_BASE}${endpoint}?key=${INNERTUBE_API_KEY}`;
  console.log('Calling',endpoint,url)
  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(data) });
  if (!response.ok) throw new Error(`Status Error ${response.status}`);
  return response.json();
}

async function getVideoInfo(videoId) {
  const sessionData = getSessionData();
  const payload = {
    ...sessionData,
    videoId,
    playbackContext: {
      contentPlaybackContext: { vis: 0, splay: false, lactMilliseconds: '-1' },
    },
    racyCheckOk: true,
    contentCheckOk: true,
  };
  const playerData = await fetchInnertube('/player', payload);

  if (playerData?.playabilityStatus?.status === 'LOGIN_REQUIRED') {
    console.log("LOGIN_REQUIRED status - trying next endpoint");
    const nextPayload = { ...sessionData, videoId };
    const nextData = await fetchInnertube('/next', nextPayload);
    console.log(`next API response: ${nextData}`);
    return [playerData, nextData];
  } else {
    console.log(`status: ${playerData?.playabilityStatus?.status}`);
    return [playerData, null];
  }
}

function extractTextFromRuns(runs) {
  if (!runs) return "";
  return runs.map(run => run.text || '').join('');
}

// In The XML There is HTML & XML Something like entities 
// So function decodes the common named entities back into their original characters
function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code));
}


function extractSubtitlesFromXml(xmlText) {
  const subtitles = [];
  const regex = /<text start="([\d.]+)" dur="([\d.]+)">(.*?)<\/text>/gs;
  let match;
  while ((match = regex.exec(xmlText)) !== null) {
    let [_, start, dur, htmlText] = match;
    let text = decodeHtmlEntities(htmlText.replace(/<[^>]+>/g, ''));
    if (text.trim()) {
      const startNum = parseFloat(start);
      const durNum = parseFloat(dur);
      const end = (startNum + durNum).toFixed(3); 
      subtitles.push({
        start: startNum,
        end: parseFloat(end),
        text: text.trim()
      });
    }
  }
  return subtitles;
}

async function getSubtitlesFromCaptions(videoId, playerData, lang = 'en') {
  const captionTracks = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks || []; // It Is Just orginal captionTracks Provided by Video owner OR Youtube ...YouTube also has automatic translation but it is not very good for Kurdish I think 
  if (!captionTracks.length) {
    console.warn("No caption tracks found in player data");
    return [];
  }

  let subtitleTrack = captionTracks.find(track => {
    const vssId = track.vssId || '';
    return vssId.includes(`.${lang}`) || vssId.includes(`a.${lang}`);
  }) || captionTracks[0];

  if (!subtitleTrack?.baseUrl) {
    console.log("No suitable caption track found");
    return [];
  }

  const captionUrl = subtitleTrack.baseUrl.replace('&fmt=srv3', '');

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Referer': `https://www.youtube.com/watch?v=${videoId}`,
  };

  const response = await fetch(captionUrl, { headers });
  if (!response.ok) throw new Error(`Failed to fetch captions: ${response.status}`);
  const xmlText = await response.text();

  if (!xmlText.trim() || !xmlText.includes('<text')) {
    throw new Error("Caption content is empty or invalid");
  }

  return extractSubtitlesFromXml(xmlText);
}

async function getYTSubtitles(videoId, lang = 'en') {
  try {
    console.log(`Getting subtitles for ${videoId}`);
    const [playerData] = await getVideoInfo(videoId);
    return await getSubtitlesFromCaptions(videoId, playerData, lang);
  } catch (e) {
    console.log(`Error getting subtitles: ${e}`);
    throw e;
  }
}

/// ///

async function getDynamicYouTubeSubtitles(videoID, targetLang = 'en'){
    try {
    const subtitles = await getYTSubtitles(videoID, targetLang);
    subtitles.forEach(sub => {
      console.log(`${sub.start}s - ${parseFloat(sub.end)}s: ${sub.text}`);
    });
    return subtitles;
  } catch (e) {
    console.error("Error ", e);
  }
};


// My First Test & Example usage of getSubtitles
// (async () => {
//   const videoId = 'V9PVRfjEBTI';
//   try {
//     const subtitles = await getSubtitles(videoId, 'en');
//     console.log("--- Subtitles ---");
//     subtitles.forEach(sub => {
//       console.log(`${sub.start}s - ${parseFloat(sub.end)}s: ${sub.text}`);
//     });
//   } catch (e) {
//     console.error("Error ", e);
//   }
// })();




async function getFrontendMastersSubtitles() {
  return new Promise(resolve => {
    const listener = event => {
      if (event.source === window && event.data.type === 'FROM_PAGE_SCRIPT') {
        window.removeEventListener('message', listener);
        const { courseSlug, pathname } = event.data.payload;
        if (courseSlug && pathname) {
          resolve(getDynamicVttUrl(courseSlug, pathname));
        }
      }
    };
    window.addEventListener('message', listener);
    injectScriptForFM(); //  Calling injectScript
  });

}
/// FrontendMasters ///

/// YouTube ///
async function getYouTubeSubtitles(videoID, targetLang, pathname) {
  if (videoID) {
    return getDynamicYouTubeSubtitles(videoID, targetLang)
  } else {
    return new Promise(resolve => {
    const listener = event => {
      if (event.source === window && event.data.type === 'FROM_PAGE_SCRIPT') {
        window.removeEventListener('message', listener);
        const { videoID, pathname} = event.data.payload;
        if (videoID && pathname) {
          resolve(getDynamicYouTubeSubtitles(videoID, pathname));
        }
      }
    };
    window.addEventListener('message', listener);
    injectScriptForFM(); //  Calling injectScript & Ya injectScriptForFM It is not for just FrondEnd Masters It is like Hybrid 
  });
}
}

/// YouTube ///


// Udemy //
async function getUdemySubtitles(courseid, lectureid) {
  //https://www.udemy.com/api-2.0/assets/22563452/?fields[asset]=@min,status,delayed_asset_message,processing_errors,time_estimation,media_license_token,media_sources,thumbnail_url,captions,thumbnail_sprite,created&fields[caption]=@default,is_translation
  // https://www.udemy.com/api-2.0/users/me/subscribed-courses/6435225/lectures/48690463/?fields[lecture]=asset,description,download_url,is_free,last_watched_second&fields[asset]=asset_type,length,media_license_token,course_is_drmed,media_sources,captions,thumbnail_sprite,slides,slide_urls,download_urls,external_url&q=0.12050425496469797
  let url;
  if (courseid && lectureid) {
  const query = Math.random(); // Idk random num
  url = `https://www.udemy.com/api-2.0/users/me/subscribed-courses/${courseid}/lectures/${lectureid}/?fields[lecture]=asset,description,download_url,is_free,last_watched_second&fields[asset]=asset_type,length,media_license_token,course_is_drmed,media_sources,captions,thumbnail_sprite,slides,slide_urls,download_urls,external_url&q=${query}`;
  } else if (courseid) {
  url = `https://www.udemy.com/api-2.0/assets/${courseid}/?fields[asset]=@min,status,delayed_asset_message,processing_errors,time_estimation,media_license_token,media_sources,thumbnail_url,captions,thumbnail_sprite,created&fields[caption]=@default,is_translation`;
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include", // It Won't Work With Out Token & Cookes 
      headers: {
        "Accept": "application/json, text/plain, */*",
        "X-Requested-With": "XMLHttpRequest"
      }
    });


    if (!response.ok) throw new Error(`Status Error ${response.status}`);

    const data = await response.json();
        console.log(data)
    const captions = data?.asset?.captions || data?.captions

    if (!captions || captions.length === 0) {
      throw new Error("Caption content is empty or invalid");
    }

    const english = captions.find(caption => caption.locale_id === "en_US")
    const vttUrl = english.url || captions[0].url;
    
    console.log(vttUrl)
    return vttUrl;
  } catch (e) {
    console.error("Error ", e);
    return null;
  }

}

// Udemy //

/// Call & Show ///
async function startTranslation(subtitles) {
  if (subtitleIntervalId !== null) {
    clearInterval(subtitleIntervalId); // Just in case
  }

  let lastText = null;
  let video = document.querySelector("video"); // Sometimes the videos in the pages doesn't load too slow because of internet or thier server
  while (!video) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Waite 100ms
    video = document.querySelector("video");
  }

  if (!video) return;

  subtitleIntervalId = setInterval(() => {
    const currentTime = video.currentTime;
    const current = subtitles.find(s => s && currentTime >= s.start && currentTime <= s.end);
    if (current && current.text !== lastText) {
      lastText = current.text;
      // Clean up subtitle text before translation by replaceing whitespace with single space
      console.log(current.text.trim().replace(/\s+/g, ' '))
      translateAndShow(current.text.trim().replace(/\s+/g, ' '));
    }
  }, 500);
}

function Run() {
    chrome.storage.sync.get(['translationEnabled', 'Tolanguagevalue', 'PAG_API_KEY'], (result) => {
        settings.translationEnabled = result.translationEnabled !== false;
        settings.Tolanguagevalue = result.Tolanguagevalue || 'ckb';
        settings.PAG_API_KEY = result.PAG_API_KEY || null;
        main();
    });
}
/// Call & Show ///


async function main() {
  StopACleanup();
  if (!settings.translationEnabled) return;

  const hostname = window.location.hostname;

  //Switching by Domain name
  if (hostname.includes('frontendmasters.com')) {
    console.log("Frontend Masters");
    injectScriptForFM(); //  Calling injectScript
    const vttUrl = await getFrontendMastersSubtitles();
    if (vttUrl) {
      subtitles = await GetpsVTT(vttUrl);
    }
  } else if (hostname.includes('youtube.com')) {
    // console.log("Soon ...");

    let params = new URLSearchParams(window.location.search);
    let videoID = params.get('v');

    subtitles = await getYouTubeSubtitles(videoID, 'en',  window.location.pathname);


  } else if (hostname.includes('udemy.com')) {
    // console.log("Soon ...");
    let appInfo = document.querySelector('.ud-app-loader.ud-component--course-taking--app') || document.querySelector('.ud-app-loader.ud-component--course-landing-page.udemy')

if (appInfo) {
  const HtmlData = appInfo.getAttribute('data-module-args');

  try {
    // Convert HTML entities To JSON
    const JsonData = JSON.parse(decodeHtmlEntities(HtmlData));

    console.log(JsonData)

    console.log("Preview :", JsonData?.serverSideProps?.introductionAsset?.course_preview_path )

    console.log("Course ID:", JsonData.courseId || JsonData.course_id);
    console.log("Lecture ID:", JsonData.initialCurriculumItemId);

    // preview
    const preview = JsonData?.serverSideProps?.introductionAsset?.course_preview_path;
    if (preview) {
      const previewVideoIdMatch = JsonData?.serverSideProps?.introductionAsset?.course_preview_path.match(/startPreviewId=(\d+)/);
      const previewVideoId = previewVideoIdMatch ? previewVideoIdMatch[1] : null;
      const course_Id = JsonData.course_id;

      console.log("Preview Video:", previewVideoId);

      const response = await fetch(`https://www.udemy.com/course/${course_Id}/preview/?startPreviewId=${previewVideoId}&uiRegion=introductionAsset&display_type=popup`,{
      method : "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "X-Requested-With": "XMLHttpRequest"
      }
    });

    const text = await response.text()
    const tempreryDiv = document.createElement("div");
    tempreryDiv.innerHTML = text;
    const targetElement = tempreryDiv.querySelector('[data-module-args]');
    const htmlData = targetElement?.getAttribute('data-module-args');
    console.log(htmlData)

    }

    const vttUrl = await getUdemySubtitles(JsonData.courseId, JsonData.initialCurriculumItemId);
    if (vttUrl) {
      subtitles = await GetpsVTT(vttUrl);
    }

    // console.log(getUdemySubtitles(JsonData.courseId, JsonData.initialCurriculumItemId));

  } catch (e) {
    console.error("Error JSON Convert ", e);
  }
} else {
  console.warn("The ud-app-loader ud-component--course-taking--app div does't exist");
}

  }

  if (subtitles && subtitles.length > 0) {
    startTranslation(subtitles);
    console.log(subtitles)
  } else {
    console.error("subtitles does't exist");
  }
}


let currentPath = window.location.pathname;
let currentHerf = window.location.href; // YouTube has Same pathname /watch for his all videos so by using href wich it is the url we can reload the main fun when the user or the player changes the vid...
// Thank You Stackoverflow https://stackoverflow.com/questions/56889759/how-javascript-engine-detects-dom-changes
const observer = new MutationObserver(() => {
  if (window.location.pathname !== currentPath || window.location.href != currentHerf) {
    currentPath = window.location.pathname;
    currentHerf = window.location.href;

     main();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

Run();