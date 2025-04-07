
import { Router } from "express";

const routes = Router();

routes.get("/", () => console.log('rota get'));

export { routes };
