import { Router } from "express";
import MatchController from "../controllers/MatchController";

const routes = Router();

routes.get('/', MatchController.listLimit);
routes.post('/', MatchController.create);
routes.get('/:id', MatchController.listbyId);
routes.put('/', MatchController.update);
routes.delete('/', MatchController.delete);

export default routes;