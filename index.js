import { isScriptLoaded } from "./utils/utils";

const loadLibrary = async () => {
  const src = "https://apis.google.com/js/api.js";
  const isScriptAdded = await isScriptLoaded(src);
  if (isScriptAdded) {
    return;
  } else {
    let fileref = document.createElement("script");
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", src);
    fileref.async = true;
    document.head.appendChild(fileref);
  }
};

const initClient = (config) => {
  return new Promise((resolve, reject) => {
    window.onload = () => {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init(config)
          .then(() => {
            resolve(window.gapi);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
  });
};

const Google = class {
  constructor() {
    this.api = null;
    this.isInit = false;
  }
  async load(config) {
    console.log("Initializing Google API JavaScript Client...");
    await loadLibrary();
    await initClient(config).then((gapi) => {
      this.api = gapi;
      this.isInit = true;
    });
    console.log("Google API JavaScript Client Initialized.");
  }
};

export default {
  install: (app, config) => {
    const google = new Google();
    google.load(config);
    app.config.globalProperties.$google = google;
  },
};
