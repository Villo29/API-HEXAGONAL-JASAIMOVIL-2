// __tests__/usuarioControllerCreate.test.ts
import { crearUsuario } from '../../src/adapters/controllers/usuarioController';  // Importa el controlador
import jwt from 'jsonwebtoken';  // Importa jwt
import Usuario from '../../src/domain/models/usuario';  // Importa el modelo de usuario

jest.mock('jsonwebtoken');  // Mockea jwt para controlar su comportamiento

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
      _id: 'userId123',
      ...mockUsuarioData,
      save: jest.fn().mockResolvedValue(true),
    };

    jest.spyOn(Usuario.prototype, 'save').mockResolvedValue(mockUsuario);

    // Simulamos que jwt.sign devuelve un token
    const mockToken = 'mocked-jwt-token';
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    const req = {
      body: mockUsuarioData,
    };

    // Simulamos la respuesta
    const res = {
      status: jest.fn().mockReturnThis(),  // Simula el método status
      send: jest.fn(),  // Simula el método send
    };

    // Llama al controlador para crear el usuario
    await crearUsuario(req as any, res as any);

    // Verifica que el usuario se haya guardado
    expect(Usuario.prototype.save).toHaveBeenCalled();

    // Verifica que se haya generado un token JWT
    expect(jwt.sign).toHaveBeenCalledWith({ _id: mockUsuario._id }, process.env.JWT_SECRET || 'your_secret_key');

    // Verifica que res.status(201) haya sido llamado
    expect(res.status).toHaveBeenCalledWith(201);

    // Verifica que res.send haya sido llamado con el usuario y el token
    expect(res.send).toHaveBeenCalledWith({
      usuario: mockUsuario,
      token: mockToken,
    });
  });

  it('debe devolver un error si hay un problema al crear el usuario', async () => {
    // Simulamos que la creación del usuario falla
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
      send: jest.fn(),  // Simula el método send
    };

    // Llama al controlador para crear el usuario
    await crearUsuario(req as any, res as any);

    // Verifica que res.status(400) haya sido llamado
    expect(res.status).toHaveBeenCalledWith(400);

    // Verifica que res.send haya sido llamado con el error
    expect(res.send).toHaveBeenCalledWith(new Error('Error al crear usuario'));
  });
});
