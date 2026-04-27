import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3001/api"
});

export const fetchLyrics = (artist, song) => {
    return API.get(`/lyrics?artist=${artist}&song=${song}`);
};