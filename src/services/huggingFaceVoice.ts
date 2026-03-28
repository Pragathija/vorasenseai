import { type LanguageCode } from '@/i18n/translations';

const HF_WHISPER_API = 'https://api-inference.huggingface.co/models/openai/whisper-large-v3-turbo';

const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_KEY || import.meta.env.VITE_HF_TOKEN || '';

const ttsModels: Record<LanguageCode, string> = {
  en: 'facebook/mms-tts-eng', 
  hi: 'facebook/mms-tts-hin', 
  ta: 'facebook/mms-tts-tam', 
  es: 'facebook/mms-tts-spa',
  fr: 'facebook/mms-tts-fra', 
  de: 'facebook/mms-tts-deu', 
  ja: 'facebook/mms-tts-jpn', 
  zh: 'facebook/mms-tts-cmn'
};

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const response = await fetch(HF_WHISPER_API, {
    method: 'POST',
    headers: { 
      'Content-Type': 'audio/webm',
      ...(HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {})
    },
    body: audioBlob,
  });

  if (!response.ok) throw new Error(`Whisper error: ${response.status}`);
  const data = await response.json();
  return data.text || '';
}

export async function synthesizeSpeech(text: string, language: LanguageCode): Promise<Blob> {
  const model = ttsModels[language] || ttsModels['en'];
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...(HF_TOKEN ? { Authorization: `Bearer ${HF_TOKEN}` } : {})
    },
    body: JSON.stringify({ inputs: text }),
  });

  if (!response.ok) throw new Error(`MMS-TTS error: ${response.status}`);
  return await response.blob();
}

// Media Recorder wrapper
export function createSpeechRecorder(
  onFinal: (text: string) => void,
  onError: (err: any) => void
) {
  let mediaRecorder: MediaRecorder | null = null;
  let audioChunks: Blob[] = [];

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      audioChunks = [];

      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        try {
          const text = await transcribeAudio(audioBlob);
          if (text) onFinal(text);
        } catch (err) {
          onError(err);
        }
      };

      mediaRecorder.start();
    } catch (e) {
      onError(e);
    }
  };

  const stop = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };

  return { start, stop };
}
