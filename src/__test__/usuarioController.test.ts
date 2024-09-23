// __tests__/usuarioController.test.ts
import { usuarioController } from '../adapters/controllers/usuarioController'; // Importa tu controlador

describe('Usuario Controller', () => {
  it('debe devolver un usuario por ID', async () => {
    const req = { params: { id: '1' } };  // Simulación del request con ID '1'
    const res = {
      json: jest.fn(),  // Simula el método res.json
    };

    await usuarioController.getUsuario(req, res);  // Llama a la función getUsuario

    // Verifica que res.json haya sido llamado con el usuario esperado
    expect(res.json).toHaveBeenCalledWith({
      id: '1',
      name: 'John Doe',  // Aquí puedes adaptar los datos a tu API
    });
  });
});
