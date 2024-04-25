import axios from 'axios';
import config from '../../config.json';

const { GoogleGenerativeAI } = require("@google/generative-ai");

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );
  return data;
};

export const getReadme = async () => {
  const { data } = await axios.get(config.readmeUrl);
  return data;
};

export const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?ATm`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getQuote = async () => {
  const { data } = await axios.get('https://api.quotable.io/random');
  return {
    quote: `“${data.content}” — ${data.author}`,
  };
};

export const getGemini = async (args: string[]): Promise<string> => {
  // For text-only input, use the gemini-pro model
  const genAI = new GoogleGenerativeAI("AIzaSyDk7IC4g3sO4jaIP3JUqRdoGUn38wqjDNs");
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = args.join(' ');

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};
