
import { Router } from "express";
import { request, response } from "express";

const routes = Router();

routes.get("/", (request, response) => {
    response.send('IT\'S THE GURI FROM THE GREMIO!');
});

export { routes };
