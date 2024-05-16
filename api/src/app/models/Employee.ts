import { model, Schema } from "mongoose";

export const Employee = model(
  "Employee",
  new Schema({
    nome: {
      type: String,
      required: true,
    },
    cargo: {
      type: String,
      required: true,
    },
    departamento: {
      type: String,
      required: true,
    },
    adimissao: {
      type: Date,
      default: Date.now,
    },
  })
);
