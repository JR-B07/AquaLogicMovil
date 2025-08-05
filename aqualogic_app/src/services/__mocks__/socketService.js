// Mock completo para pruebas:
export const initSocket = jest.fn(() => ({
  on: jest.fn(),
  disconnect: jest.fn()
}));

export const subscribeToAlertas = jest.fn((callback) => {
  // Simular alertas cada 3 segundos
  const mockAlertas = [
    { id: 'mock-1', ubicacion: "Av. Simulada 456", score: 0.91 },
    { id: 'mock-2', ubicacion: "Calle Falsa 123", score: 0.45 }
  ];
  
  mockAlertas.forEach((alerta, i) => {
    setTimeout(() => callback(alerta), 3000 * (i + 1));
  });
});