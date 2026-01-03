import { FlatList } from 'react-native';
import { ChatMessage } from './ChatMessage';
import { ChatMessage as Message } from '../Types/chatbot.types';

export function ChatList({ messages }: { messages: Message[] }) {
  return (
    <FlatList
      data={messages}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ChatMessage {...item} />
      )}
    />
  );
}
