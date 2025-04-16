// const devServerUrl = 'http://localhost:3002';

const devServerUrl = "http://192.168.0.120:3002";

const prodServerUrl = "https://fitclub.coupontodeal.com/api";
export default process.env.NODE_ENV === "development" ? devServerUrl : prodServerUrl;
