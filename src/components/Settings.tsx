import React from 'react';
import { VoiceSettings } from '../types/assistant';
import { Settings as SettingsIcon } from 'lucide-react';

interface SettingsProps {
  settings: VoiceSettings;
  onSettingsChange: (settings: VoiceSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onSettingsChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[]>([]);

  React.useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        title="Settings"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Voice
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={voices.indexOf(settings.voice!)}
              onChange={(e) => {
                onSettingsChange({
                  ...settings,
                  voice: voices[parseInt(e.target.value)],
                });
              }}
            >
              {voices.map((voice, index) => (
                <option key={voice.name} value={index}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rate: {settings.rate}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.rate}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  rate: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pitch: {settings.pitch}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  pitch: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Volume: {settings.volume}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume}
              onChange={(e) =>
                onSettingsChange({
                  ...settings,
                  volume: parseFloat(e.target.value),
                })
              }
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};