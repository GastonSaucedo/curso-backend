import { fileURLToPath } from "url";
import z from "zod";
import path from "path";
import { dirname } from "path";
import multer from "multer";

import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

// Configuracion de MULTER
// Objeto de configuracion
const storage = multer.diskStorage({
  // ubicacion del directorio donde voy a guardar los archivos
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/img`);
  },

  // el nombre que quiero que tengan los archivos que voy a subir
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({
  storage,
  // si se genera algun error, lo capturamos
  onError: function (err, next) {
    console.log(err);
    next();
  },
});

//validaciones
const productValidatorSchema = z.object({
  title: z.string({
    invalid_type_error: "El nombre debe ser texto",
    required_error: "El nombre es requerido",
  }),
  price: z
    .number({ invalid_type_error: "El precio debe ser un valor numérico" })
    .positive({
      invalid_type_error: "El precio debe ser un número mayor o igual a 0",
    }),
  category: z.array(
    z
      .string({
        invalid_type_error: "La categoria debe ser texto",
        required_error: "La categoría es requerida es requerido",
      })
      .default("General")
  ),
  description: z
    .string({
      required_error: "La descripcion es requerida.",
    })
    .default(""),
  code: z.string({
    invalid_type_error: "El código SKU debe ser una cadena de texto",
    required_error: "El SKU es requerido",
  }),
  stock: z
    .number({
      required_error: "El stock es requerido.",
      invalid_type_error: "El stock debe ser un valor numérico",
    })
    .min(0, { message: "El stock no puede ser negativo" })
    .default(0),
  st: z
    .boolean({ required_error: "El status es un valor requerido" })
    .default(true),
  thumb: z
    .string({
      invalid_type_error: "La ruta al archivo debe ser un texto",
    })
    .default(""),
});

export function validateProduct(object) {
  const resultadoValidacion = productValidatorSchema.safeParse(object);

  return resultadoValidacion;
}
export function validatePartialProduct(object) {
  const resultadoValidacionParcial = productValidatorSchema
    .partial()
    .safeParse(object);

  return resultadoValidacionParcial;
}

export const validateFormData = (req, res, next) => {
  const thumb = req.file
    ? "/img/" + path.basename(req.file.path.replaceAll(" ", "%20"))
    : "";
  let categoria = [];
  categoria.push(req.body.category);
  const datosConvertidos = {
    ...req.body,
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock),
    category: categoria,
    thumb: thumb,
  };

  const result = validatePartialProduct(datosConvertidos);

  req.validatedData = result;

  next();
};

export const validateModifiedData = (req, res, next) => {
  let datosConvertidos = { ...req.body };
  if (req.file) {
    const thumb = "/img/" + path.basename(req.file.path.replaceAll(" ", "%20"));
    datosConvertidos["thumb"] = thumb;
  }

  if (req.body.category) {
    let categoria = [];
    categoria.push(req.body.category);
    datosConvertidos["category"] = categoria;
  }
  if (req.body.price) {
    datosConvertidos["price"] = parseFloat(req.body.price);
  }
  if (req.body.stock) {
    datosConvertidos["stock"] = parseInt(req.body.stock);
  }

  const result = validatePartialProduct(datosConvertidos);

  req.validatedData = result;

  next();
};

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (plainTextPassword, hashedPassword) => {
  console.log(
    `Datos a validar: password de formulario: ${plainTextPassword}, password hasheado: ${hashedPassword}`
  );
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
};