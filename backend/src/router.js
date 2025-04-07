
import { Router } from "express";
import { request, response } from "express";

const routes = Router();

routes.get("/", () => console.log('rota get'));

export { routes };
