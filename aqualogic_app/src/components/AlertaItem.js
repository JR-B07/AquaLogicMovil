import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AlertaItem = ({ alerta }) => {
  const navigation = useNavigation();

  const getSeverityColor = (score) => {
    if (score > 0.8) return '#EF4444'; // Rojo (Alta)
    if (score > 0.5) return '#F59E0B'; // Amarillo (Media)
    return '#10B981'; // Verde (Baja)
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalleAlerta', { alerta })}
    >
      <View style={styles.header}>
        <Text style={styles.location}>{alerta.ubicacion}</Text>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alerta.score) }]}>
          <Text style={styles.severityText}>{Math.round(alerta.score * 100)}%</Text>
        </View>
      </View>
      <Text style={styles.timestamp}>{alerta.fecha}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  severityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // ... (otros estilos)
});

export default AlertaItem;