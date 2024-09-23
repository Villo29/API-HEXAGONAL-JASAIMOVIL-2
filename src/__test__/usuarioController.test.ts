// __tests__/usuarioControllerCreate.test.ts
import { crearUsuario } from '../../src/adapters/controllers/usuarioController';  // Importa el controlador
import jwt from 'jsonwebtoken';  // Importa jwt
import Usuario from '../../src/domain/models/usuario';  // Importa el modelo de usuario

jest.mock('jsonwebtoken');

describe('Usuario Controller - Crear Usuario', () => {
  it('debe crear un nuevo usuario y devolver un token', async () => {
    // Datos del usuario que simulamos
    const mockUsuarioData = {
      nombre: 'John Doe',
      correo: 'john@example.com',
      contrasena: 'password123',
      telefono: '1234567890',
    };

    const mockUsuario = {
      _id: '66f0fd5c9f25e33e54f28459',
      ...mockUsuarioData,
      save: jest.fn().mockResolvedValue(true),
    };

    jest.spyOn(Usuario.prototype, 'save').mockResolvedValue(mockUsuario);


    const mockToken = 'mocked-jwt-token';
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const req = {
      body: mockUsuarioData,
    };


    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };


    await crearUsuario(req as any, res as any);


    expect(Usuario.prototype.save).toHaveBeenCalled();


    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({ _id: expect.any(String) }), 
      process.env.JWT_SECRET || 'your_secret_key'
    );

    // Verifica que res.status(201) haya sido llamado
    expect(res.status).toHaveBeenCalledWith(201);


    expect(res.send).toHaveBeenCalledWith({
      usuario: mockUsuario,
      token: mockToken,
    });
  });

  it('debe devolver un error si hay un problema al crear el usuario', async () => {

    jest.spyOn(Usuario.prototype, 'save').mockRejectedValue(new Error('Error al crear usuario'));


    const req = {
      body: {
        nombre: 'John Doe',
        correo: 'john@example.com',
        contrasena: 'password123',
        telefono: '1234567890',
      },
    };


    const res = {
      status: jest.fn().mockReturnThis(), 
      send: jest.fn(),
    };

    await crearUsuario(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Error al crear usuario'
    }));
  });
});
