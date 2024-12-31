import React from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceControlsProps {
  isListening: boolean;
  isSpeaking: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onToggleSpeech: () => void;
}

export const VoiceControls: React.FC<VoiceControlsProps> = ({
  isListening,
  isSpeaking,
  onStartListening,
  onStopListening,
  onToggleSpeech,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={isListening ? onStopListening : onStartListening}
        className={`p-3 rounded-full transition-colors ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gray-400 hover:bg-gray-900'
        }`}
        title={isListening ? 'Stop listening' : 'Start listening'}
      >
        {isListening ? (
          <MicOff className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </button>
      
      <button
        onClick={onToggleSpeech}
        className={`p-3 rounded-full transition-colors ${
          isSpeaking 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-gray-500 hover:bg-gray-600'
        }`}
        title={isSpeaking ? 'Mute assistant' : 'Unmute assistant'}
      >
        {isSpeaking ? (
          <Volume2 className="w-6 h-6 text-white" />
        ) : (
          <VolumeX className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};