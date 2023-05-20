import { Router } from "express";
import TeamController from "../controllers/TeamController";

const routes = Router();

routes.post('/', TeamController.create);
routes.get('/', TeamController.getAll);
routes.get('/:termo', TeamController.getAllTermo);
routes.put('/', TeamController.update);
routes.delete('/', TeamController.delete);

export default routes;