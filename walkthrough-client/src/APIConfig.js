let apiUrl;
const apiUrls = {
  production: "http://127.0.0.1:8000",
  development: "http://127.0.0.1:8000",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
