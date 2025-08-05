import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchWaterData } from '@services/api';

interface WaterData {
  ph: number;
  turbidity: number;
}

const HomeScreen = () => {
  const [data, setData] = useState<WaterData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchWaterData();
      setData(result);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoreo de Calidad del Agua</Text>
      {data && (
        <View>
          <Text>PH: {data.ph.toFixed(2)}</Text>
          <Text>Turbidez: {data.turbidity} NTU</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default HomeScreen;