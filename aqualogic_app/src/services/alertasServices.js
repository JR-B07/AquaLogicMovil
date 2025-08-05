// src/services/alertasService.js
import { nodeAPI, fastAPI } from './api'; // Importación correcta desde la misma carpeta
import { logger } from '../utils/constants'; // Logger importado desde utils

const AlertasService = {
  /**
   * Obtiene todas las alertas desde el backend (Node.js)
   * @returns {Promise<Array>} Lista de alertas formateadas
   */
  getAll: async () => {
    try {
      const response = await nodeAPI.get('/alertas');
      logger.debug('Alertas obtenidas:', response.data.length);
      return response.data.map(alerta => ({
        ...alerta,
        fecha: new Date(alerta.fecha).toLocaleString('es-MX') // Formato localizado
      }));
    } catch (error) {
      logger.error('Error en getAll:', error);
      throw new Error('Error al cargar alertas');
    }
  },

  /**
   * Predice severidad de fuga usando el modelo de IA (FastAPI)
   * @param {Object} sensorData - Datos del sensor en formato {sensorId, value}
   * @returns {Promise<number>} Score de severidad (0-1)
   */
  predictSeverity: async (sensorData) => {
    try {
      const response = await fastAPI.post('/ia/predict', {
        ...sensorData,
        model_version: "v2.1"
      });
      logger.debug('Predicción generada:', response.data.score);
      return response.data.score;
    } catch (error) {
      logger.error('Error en predictSeverity:', error);
      throw new Error('Error en predicción de severidad');
    }
  },

  /**
   * Reporta una falsa alarma (Node.js)
   * @param {string} alertaId - ID de la alerta a marcar
   */
  reportFalseAlarm: async (alertaId) => {
    try {
      await nodeAPI.patch(`/alertas/${alertaId}`, {
        status: 'false_alarm',
        updatedAt: new Date().toISOString()
      });
      logger.info(`Alerta ${alertaId} marcada como falsa alarma`);
    } catch (error) {
      logger.error('Error en reportFalseAlarm:', error);
      throw new Error('Error al reportar falsa alarma');
    }
  }
};

export default AlertasService;