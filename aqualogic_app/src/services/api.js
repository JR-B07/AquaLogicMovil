import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { AlertasService } from '../services/alertasService';
import AlertaItem from '../components/AlertaItem';

const AlertasScreen = () => {
  const [fugas, setFugas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Carga inicial
  useEffect(() => {
    loadAlertas();
  }, []);

  const loadAlertas = async () => {
    try {
      setLoading(true);
      const data = await AlertasService.getAll();
      setFugas(data);
    } catch (error) {
      console.error("Error cargando alertas:", error);
      // Mostrar snackbar/alert (opcional)
    } finally {
      setLoading(false);
    }
  };

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadAlertas();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <FlatList
      data={fugas}
      renderItem={({ item }) => <AlertaItem fuga={item} />}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No hay alertas activas
        </Text>
      }
    />
  );
};

export const API_URL = __DEV__ 
  ? 'http://localhost:3000'   // Desarrollo
  : 'https://api.aqualogic.com'; // Producción