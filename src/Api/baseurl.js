// src/Api/baseurl.js
import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://backend.auge.cloud", // ✅ الصحيح
});

export default baseUrl;
