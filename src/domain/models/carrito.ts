import { Schema, Document, model } from "mongoose";

// Definir la interfaz para el modelo Carrito
export interface ICarrito extends Document {
  precio: number;
  tipo: string;
  userId: string;
}

// Definir el esquema para el modelo Carrito
const carritoSchema = new Schema<ICarrito>({
  precio: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// Definir el modelo Carrito
const Carrito = model<ICarrito>("Carrito", carritoSchema);

export default Carrito;
