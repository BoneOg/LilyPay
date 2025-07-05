import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getColor } from '../../components/theme';

const Transactions: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      <Text style={styles.subtitle}>View and manage transactions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor('secondary.50'),
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: getColor('primary.900'),
  },
  subtitle: {
    fontSize: 18,
    color: getColor('primary.700'),
  },
});

export default Transactions; 