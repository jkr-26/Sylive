import React from 'react';
import { Message } from '../types/assistant';
import { Bot, User } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 capitalize">
      {messages.map((message) => (
        <div
          key={message.id+uuidv4()} // Use message.id as the unique key
          className={`flex items-start gap-3 ${
            message.type === 'user' ? 'flex-row-reverse' : ''
          }`}
        >
          <div
            className={`p-2 rounded-full ${
              message.type === 'user' ? 'bg-orange-500' : 'bg-gray-500'
            }`}
          >
            {message.type === 'user' ? (
              <User  className="w-5 h-5 text-white" />
            ) : (
              <Bot className="w-5 h-5 text-white" />
            )}
          </div>
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};