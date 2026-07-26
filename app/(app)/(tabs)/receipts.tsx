import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useSession } from '@/src/contexts/auth-context';
import { useLayoutEffect, useState } from 'react';
import { ordersApi } from '@/src/api/client';
import { Order } from '@/src/api/generated';

export default function AboutScreen() {
  const { signOut } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useLayoutEffect(() => {
    ordersApi.findAll(1, 10).then((response) => {
      setOrders(response.data);
    });
  }, []);

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
