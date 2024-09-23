import { crearEvento, obtenerEventos, obtenerEventosporID } from '../../src/adapters/controllers/EventosController';
import Evento from '../../src/domain/models/eventos';  // Importa el modelo de evento
import { ObjectId } from 'mongodb';

jest.mock('../../src/domain/models/eventos');  // Mockea el modelo Evento para simular la base de datos

describe('Evento Controller', () => {
  // Prueba para crear un evento
  it('debe crear un nuevo evento correctamente', async () => {
    const mockEventoData = {
      nombre: 'Concierto de Rock',
      fecha: '2024-09-30',
      lugar: 'Auditorio Nacional',
    };

    // Simulamos que el evento se guarda correctamente
    const mockEvento = new Evento(mockEventoData);
    mockEvento.save = jest.fn().mockResolvedValue(mockEvento);

    const req = {
      body: mockEventoData,
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await crearEvento(req, res);

    // Verifica que el evento se haya guardado
    expect(mockEvento.save).toHaveBeenCalled();

    // Verifica que res.status(201) haya sido llamado
    expect(res.status).toHaveBeenCalledWith(201);

    // Verifica que res.json haya sido llamado con el evento creado
    expect(res.json).toHaveBeenCalledWith(mockEvento);
  });

  // Prueba para manejar errores al crear un evento
  it('debe devolver un error al intentar crear un evento con datos inválidos', async () => {
    const req = {
      body: {},
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    // Simulamos que el guardado de evento falla
    Evento.prototype.save = jest.fn().mockRejectedValue(new Error('Error al crear el evento'));

    await crearEvento(req, res);

    // Verifica que el código de estado sea 400 (Bad Request)
    expect(res.status).toHaveBeenCalledWith(400);

    // Verifica que se devuelva el mensaje de error
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error al crear el evento',
      error: expect.any(Error),
    });
  });

  // Prueba para obtener todos los eventos
  it('debe devolver todos los eventos', async () => {
    const mockEventos = [
      { _id: new ObjectId(), nombre: 'Evento 1', fecha: '2024-10-01', lugar: 'Lugar 1' },
      { _id: new ObjectId(), nombre: 'Evento 2', fecha: '2024-11-01', lugar: 'Lugar 2' },
    ];

    // Simula la búsqueda de eventos en la base de datos
    Evento.find = jest.fn().mockResolvedValue(mockEventos);

    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await obtenerEventos(req, res);

    // Verifica que se haya llamado a Evento.find
    expect(Evento.find).toHaveBeenCalled();

    // Verifica que el código de estado sea 200 (OK)
    expect(res.status).toHaveBeenCalledWith(200);

    // Verifica que se devuelvan los eventos
    expect(res.json).toHaveBeenCalledWith(mockEventos);
  });

  // Prueba para obtener un evento por ID válido
  it('debe devolver un evento por ID si es válido', async () => {
    const validObjectId = new ObjectId();  // Genera un ID válido
    const mockEvento = { _id: validObjectId, nombre: 'Evento 1', fecha: '2024-10-01', lugar: 'Lugar 1' };

    // Simula la búsqueda del evento por ID
    Evento.findById = jest.fn().mockResolvedValue(mockEvento);

    const req = {
      params: { id: validObjectId.toHexString() },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await obtenerEventosporID(req, res);

    // Verifica que se haya llamado a Evento.findById con el ID correcto
    expect(Evento.findById).toHaveBeenCalledWith(validObjectId);

    // Verifica que el código de estado sea 200 (OK)
    expect(res.status).toHaveBeenCalledWith(200);

    // Verifica que se devuelva el evento
    expect(res.json).toHaveBeenCalledWith(mockEvento);
  });

  // Prueba para manejar un ID inválido
  it('debe devolver un error si el ID del evento no es válido', async () => {
    const req = {
      params: { id: 'invalid-id' },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await obtenerEventosporID(req, res);

    // Verifica que se devuelva el código de estado 400 (Bad Request)
    expect(res.status).toHaveBeenCalledWith(400);

    // Verifica que se devuelva el mensaje de error
    expect(res.json).toHaveBeenCalledWith({ message: 'ID no válido' });
  });

  // Prueba para manejar un evento no encontrado
  it('debe devolver un error si el evento no es encontrado', async () => {
    const validObjectId = new ObjectId();

    // Simula que no se encuentra ningún evento
    Evento.findById = jest.fn().mockResolvedValue(null);

    const req = {
      params: { id: validObjectId.toHexString() },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await obtenerEventosporID(req, res);

    // Verifica que se devuelva el código de estado 404 (Not Found)
    expect(res.status).toHaveBeenCalledWith(404);

    // Verifica que se devuelva el mensaje de error
    expect(res.json).toHaveBeenCalledWith({ message: 'Evento no encontrado' });
  });
});
