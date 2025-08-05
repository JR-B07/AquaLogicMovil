import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const DashboardScreen = () => {
  const [metricas, setMetricas] = useState({
    valorProm: 0,
    bateriaProm: 0,
    nivelesBateria: [],
  });

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        const response = await axios.get('http://tu-backend.com/metricas');
        setMetricas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMetricas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DASHBOARD</Text>
      
      <View style={styles.metricContainer}>
        <Text style={styles.metric}>Valor Prom: {metricas.valorProm}</Text>
        <Text style={styles.metric}>Bateria Prom: {metricas.bateriaProm}%</Text>
      </View>

      <LineChart
        data={{
          labels: Array.from({ length: metricas.nivelesBateria.length }, (_, i) => i.toString()),
          datasets: [{ data: metricas.nivelesBateria }],
        }}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#0369A1',
          backgroundGradientFrom: '#0369A1',
          backgroundGradientTo: '#0369A1',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0369A1',
  },
  metricContainer: {
    marginBottom: 20,
  },
  metric: {
    fontSize: 16,
    marginBottom: 5,
  },
  chart: {
    borderRadius: 10,
  },
});

export default DashboardScreen;