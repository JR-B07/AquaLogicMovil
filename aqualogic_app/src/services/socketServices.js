import io from 'socket.io-client';
import { API_URL } from './api'; // Asegúrate de tener esto en tu archivo api.js: export const API_URL = 'http://tu-backend.com';
import { logger } from '../utils/constants';

let socket;

export const initSocket = (token) => {
  socket = io(API_URL, {
    auth: { token },
    transports: ['websocket'],
    reconnectionAttempts: 3,
  });

  // Manejo de eventos
  socket.on('connect', () => logger.info('✅ Conectado al servidor WebSocket'));
  socket.on('disconnect', () => logger.warn('❌ Desconectado del servidor'));
  socket.on('error', (err) => logger.error('Error en WebSocket:', err));

  return socket;
};

export const subscribeToAlertas = (callback) => {
  if (!socket) throw new Error('Socket no inicializado');

  socket.on('nueva_alerta', (alerta) => {
    logger.debug('Nueva alerta recibida:', alerta);
    callback({
      ...alerta,
      fecha: new Date(alerta.fecha).toLocaleString('es-MX'), // Formatear fecha
    });
  });

  // Función para cancelar la suscripción
  return () => socket.off('nueva_alerta');
};