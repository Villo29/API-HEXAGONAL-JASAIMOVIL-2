// __tests__/tiendaController.test.ts
import { tiendaController } from '../src/adapters/controllers/tiendaController'; // Importa tu controlador

describe('Tienda Controller', () => {
  it('debe devolver las tiendas de un usuario', async () => {
    const req = { params: { userId: '1' } };  // Simulación del request con el ID del usuario '1'
    const res = {
      json: jest.fn(),  // Simula el método res.json
    };

    await tiendaController.getTiendasByUser(req, res);  // Llama a la función para obtener tiendas

    // Verifica que res.json haya sido llamado con las tiendas esperadas
    expect(res.json).toHaveBeenCalledWith([
      { id: '1', name: 'Tienda 1' },  // Datos simulados
      { id: '2', name: 'Tienda 2' }
    ]);
  });
});
