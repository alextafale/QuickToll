import { View, Text } from 'react-native';
import { ChatMessage as Message } from './../Types/chatbot.types';

export function ChatMessage({ role, text }: Message) {
  return (
    <View
      style={{
        alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
        backgroundColor: role === 'user' ? '#007AFF' : '#E5E5EA',
        margin: 6,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ color: role === 'user' ? '#fff' : '#000' }}>
        {text}
      </Text>
    </View>
  );
}
