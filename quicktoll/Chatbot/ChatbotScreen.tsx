import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { useChatbot } from './chatbot.context';
import { useState } from 'react';

export default function ChatbotScreen() {
  const { messages, sendMessage } = useChatbot();
  const [text, setText] = useState('');

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginVertical: 4 }}>
            {item.role === 'user' ? '👤' : '🤖'} {item.text}
          </Text>
        )}
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Escribe tu duda sobre telepeaje..."
        style={{ borderWidth: 1, padding: 10, marginBottom: 8 }}
      />

      <Button
        title="Enviar"
        onPress={() => {
          sendMessage(text);
          setText('');
        }}
      />
    </View>
  );
}
