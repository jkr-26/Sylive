export interface VoiceSettings {
  pitch: number;
  rate: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export interface AssistantState {
  isListening: boolean;
  isSpeaking: boolean;
  messages: Message[];
  settings: VoiceSettings;
}