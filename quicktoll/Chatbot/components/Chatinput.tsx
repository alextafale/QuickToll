import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState('');

  return (
    <View style={{ flexDirection: 'row', padding: 8 }}>
      <TextInput
        style={{ flex: 1, borderWidth: 1, padding: 8 }}
        value={text}
        onChangeText={setText}
        placeholder="Escribe tu duda…"
      />
      <Button
        title="Enviar"
        onPress={() => {
          onSend(text);
          setText('');
        }}
      />
    </View>
  );
}
