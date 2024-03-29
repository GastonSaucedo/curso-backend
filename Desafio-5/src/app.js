import express from "express";
import __dirname from "../utils.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

dotenv.config();
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";
import messageModel from "./services/db/models/messages.model.js";
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");

app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;

app.use("/", viewsRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
const httpServer = app.listen(PORT, () => {
  console.log("listening on port ", PORT);
});

const username = process.env.DB_USER_NAME;
const password = process.env.DB_PASS;
const cluster = process.env.CLUSTER_NAME;
const dbname = process.env.DB_NAME;

let uri = `mongodb+srv://${username}:${password}@${cluster}.qnfm9hs.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    //probando la conexión
    console.log("Conectado con éxito a la base de datos");
  } catch (error) {
    console.error("No se pudo conectar a la BD usando Moongose: " + error);
    process.exit();
  }
};
connectMongoDB();

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  let messages = await messageModel.find();

  socketServer.emit("messageLogs", messages);

  socket.on("message", async (data) => {
    try {
      const newMessage = await messageModel.create(data);
      messages = await messageModel.find();

      socketServer.emit("messageLogs", messages);
    } catch (error) {
      console.error("Error guardando en la base de datos:", error);
    }
  });

  socket.on("userConnected", (data) => {
    socket.broadcast.emit("userConnected", data.user);
  });

  socket.on("closeChat", (data) => {
    if (data.close === "close") socket.disconnect();
  });
});
