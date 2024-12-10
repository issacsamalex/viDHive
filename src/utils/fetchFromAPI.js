import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  params: {
    maxResults: "50",
  },
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      alert("API limit exceeded. Please try again later.");
    } else {
      alert("An error occurred while fetching data. Please try again.");
    }
    console.error("Error fetching data:", error);
  }
};
