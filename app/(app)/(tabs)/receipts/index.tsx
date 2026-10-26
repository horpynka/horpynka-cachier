import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useSession } from '@/src/contexts/auth-context';

export default function AboutScreen() {
  const { signOut } = useSession();

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ffd33d',
  },
  buttonText: {
    color: '#25292e',
    fontWeight: '600',
  },
});
