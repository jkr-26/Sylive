import React, { useState, useCallback } from 'react';
import { MessageList } from './components/MessageList';
import { VoiceControls } from './components/VoiceControls';
import { Settings } from './components/Settings';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { Message, VoiceSettings } from './types/assistant';
import { Send } from 'lucide-react';
// import lokiData from './db/loki.json';
import intentsData from './db/intents.json';
function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [settings, setSettings] = useState<VoiceSettings>({
    pitch: 1,
    rate: 1,
    volume: 1,
    voice: null,
  });

  const { speak, stop, isSpeaking } = useSpeechSynthesis();

  const handleAssistantResponse = useCallback((userMessage: string) => {

    // Simulate AI response - replace with actual AI integration
    let response = `I received your message: "${userMessage}".`;
    // const matchedValue = lokiData.welcome.find(message => message === userMessage);
    // let response;
    // if (matchedValue) {
    //   // response = "Hi This is Sylive. Johniee's personalised partner."+"<br>"+"Before we chitchat, Firstly verify who you are";
    //   response = `Hi This is Sylive. Johniee's personalised partner.
    //               Before we chitchat, Firstly verify who you are.`;
    // }     
    // else {
    //   const boss = lokiData.boss.find(message => message === userMessage);
    //   if (boss) {
    //     response = `Welcome "${userMessage}". I'm happy to see you`;
    //   } 
    //   else{
    //     response = `Illegal Entry. Your not Johniee`;
    //   }
    // }
    for (const intent of intentsData.intents) {
      
      if (intent.patterns.includes(userMessage.toLowerCase())) {
        // If a match is found, select a random response from the intent's responses
        response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        break;
      }
    }
    const newMessage: Message = {
      id: Date.now().toString(),
      content: response,
      type: 'assistant',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (!isSpeaking) {
      speak(response, settings);
    }
  }, [speak, isSpeaking, settings]);

  const handleUserMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    handleAssistantResponse(content);
  }, [handleAssistantResponse]);

  const { isListening, startListening, stopListening } = useVoiceRecognition(
    handleUserMessage
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleUserMessage(inputText.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-[80vh]">
        <div className="bg-orange-400 p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Miss.Sylive</h1>
          <div className="flex items-center gap-4">
            <VoiceControls
              isListening={isListening}
              isSpeaking={isSpeaking}
              onStartListening={startListening}
              onStopListening={stopListening}
              onToggleSpeech={isSpeaking ? stop : () => {}}
            />
            <Settings settings={settings} onSettingsChange={setSettings} />
          </div>
        </div>

        <MessageList messages={messages} />

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex gap-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
              disabled={!inputText.trim()}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;