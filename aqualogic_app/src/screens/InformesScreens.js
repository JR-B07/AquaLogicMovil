import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const InformesScreen = () => {
  const [informes, setInformes] = useState([]);

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await axios.get('http://tu-backend.com/informes');
        setInformes(response.data.informes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchInformes();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>INFORMES</Text>
      {informes.map((informe, index) => (
        <View key={index} style={styles.card}>
          <Text>Nombre: {informe.nombre}</Text>
          <Text>ID: {informe.id}</Text>
          <Text>V. Max: {informe.vMax}</Text>
          <Text>V. Min: {informe.vMin}</Text>
          <Text>Rango: {informe.rango}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0369A1',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    elevation: 2,
  },
});

export default InformesScreen;