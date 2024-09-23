import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import Evento, { IEvento } from "../../domain/models/eventos";


// Crear un nuevo evento
export const crearEvento = async (req: Request, res: Response) => {
    try {
      const evento = new Evento(req.body);
      await evento.save();
      return res.status(201).json(evento);
    } catch (error) {
      return res.status(400).json({ message: 'Error al crear el evento', error });
    }
  };


// Obtener todos los eventos

export const obtenerEventos = async (req: Request, res: Response) => {
    try {
        const eventos = await Evento.find({});
        return res.status(200).json(eventos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los eventos', error });
    }
};


export const obtenerEventosporID = async (req: Request, res: Response) => {
    const _id = req.params.id;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }
    try {
      const evento: IEvento | null = await Evento.findById(new ObjectId(_id));
      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }
      return res.status(200).json(evento);
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener el evento por ID', error });
    }
  };