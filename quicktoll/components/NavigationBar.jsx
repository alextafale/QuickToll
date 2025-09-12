import React from 'react';
import {
  MaterialIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

//Component NavigationBar
export default function NavigationBar({ state, descriptors, navigation }) {
   // Protección
  if (!state || !descriptors) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        // Animación de escala para el ícono activo
        const scaleValue = new Animated.Value(isFocused ? 1.2 : 1);

        React.useEffect(() => {
          Animated.timing(scaleValue, {
            toValue: isFocused ? 1.2 : 1,
            duration: 200,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }).start();
        }, [isFocused]);

        let icon;
        if (route.name === 'HomeScreen') {
          icon = (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <MaterialIcons
                name="home-filled"
                size={28}
                color={isFocused ? '#007AFF' : '#888'}
              />
            </Animated.View>
          );
        } else if (route.name === 'HistoryScreen') {
          icon = (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Feather
                name="clock"
                size={28}
                color={isFocused ? '#007AFF' : '#888'}
              />
            </Animated.View>
          );
        } else if (route.name === 'PaymentsScreen') {
          icon = (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <MaterialIcons
                name="payment"
                size={28}
                color={isFocused ? '#007AFF' : '#888'}
              />
            </Animated.View>
          );
        } else if (route.name === 'SettingsScreen') {
          icon = (
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons
                name="settings-sharp"
                size={28}
                color={isFocused ? '#007AFF' : '#888'}
              />
            </Animated.View>
          );
        } else if (route.name === 'Vehicles') {
          icon=(
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
              <Ionicons
                name="car-sport-sharp"
                size={28}
                color={isFocused ? '#007AFF' : '#888'}
              />
            </Animated.View>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel || label}
            testID={options.tabBarTestID}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            style={styles.item}
            activeOpacity={0.8} // Feedback visual al tocar
          >
            {icon}
            <Text
              style={[
                styles.label,
                isFocused && styles.activeLabel,
                { marginTop: 4 }, // Un poco más de espacio
              ]}
            >
              {label}
            </Text>
            {isFocused && (
              <View style={styles.indicator} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70, // Un poco más alto para mejor UX
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Sombra
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
  indicator: {
    position: 'absolute',
    bottom: 2,
    width: 24,
    height: 2,
    backgroundColor: '#007AFF',
    borderRadius: 1,
  },
});

