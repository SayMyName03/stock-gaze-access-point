
import axios from 'axios';

// Use Vite's import.meta.env instead of process.env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export const analyzeDocument = async (text: string): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Analyze the following document and provide a comprehensive summary of its content, main points, and key information: ${text}`,
              },
            ],
          },
        ],
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error analyzing document with Gemini:', error);
    throw new Error('Failed to analyze document');
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize the following text in a concise way that captures the key points: ${text}`,
              },
            ],
          },
        ],
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error summarizing text with Gemini:', error);
    throw new Error('Failed to summarize text');
  }
};

export const extractKeywords = async (text: string): Promise<string[]> => {
  try {
    const response = await axios.post<GeminiResponse>(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Extract 3-5 keywords or tags from the following text. Return ONLY the keywords separated by commas with no additional text: ${text}`,
              },
            ],
          },
        ],
      }
    );

    const keywordsText = response.data.candidates[0].content.parts[0].text;
    return keywordsText.split(',').map(keyword => keyword.trim());
  } catch (error) {
    console.error('Error extracting keywords with Gemini:', error);
    throw new Error('Failed to extract keywords');
  }
};

export const transcribeAudio = async (audioText: string): Promise<string> => {
  try {
    // Note: This is a simulation as Gemini doesn't directly support audio transcription
    // In a real implementation, you would use a service like Whisper API
    const response = await axios.post<GeminiResponse>(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Pretend this is a transcript of audio and clean it up to be well-formatted text: ${audioText}`,
              },
            ],
          },
        ],
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error transcribing audio with Gemini:', error);
    throw new Error('Failed to transcribe audio');
  }
};
