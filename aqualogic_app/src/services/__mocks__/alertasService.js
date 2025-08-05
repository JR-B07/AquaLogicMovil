// src/services/__mocks__/alertasService.js
export default {
  getAll: jest.fn().mockResolvedValue([
    {
      id: 1,
      ubicacion: "Av. Universidad 123",
      score: 0.85,
      fecha: "2024-03-10T12:00:00Z"
    }
  ]),
  predictSeverity: jest.fn().mockResolvedValue(0.92)
};