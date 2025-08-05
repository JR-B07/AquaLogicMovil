import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAlerta, loadAlertas } from '../features/alertasSlice';
import AlertasService from '../services/alertasService';
import { initSocket, subscribeToAlertas } from '../services/socketService';
import AlertaItem from '../components/AlertaItem';

const AlertasScreen = () => {
  const dispatch = useDispatch();
  const alertas = useSelector((state) => state.alertas);
  const [loading, setLoading] = React.useState(true);
  const { userToken } = useAuth(); // Asume que tienes un hook useAuth

  // 1. Cargar alertas iniciales desde la API
  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const data = await AlertasService.getAll();
        dispatch(loadAlertas(data));
      } catch (err) {
        console.error('Error al cargar alertas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlertas();
  }, []);

  // 2. Configurar WebSockets para actualización en tiempo real
  useEffect(() => {
    if (!userToken) return;

    const socket = initSocket(userToken);
    const unsuscribe = subscribeToAlertas((nuevaAlerta) => {
      dispatch(addAlerta(nuevaAlerta));
    });

    return () => {
      unsuscribe();
      socket.disconnect();
    };
  }, [userToken]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  return (
    <FlatList
      data={alertas}
      renderItem={({ item }) => <AlertaItem alerta={item} />}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay alertas activas</Text>
      }
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default AlertasScreen;