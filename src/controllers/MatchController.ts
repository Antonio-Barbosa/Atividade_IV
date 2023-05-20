import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Team } from '../entities/Teams';
import { Match } from '../entities/Match';

class SpentController {

    public async create(req: Request, res: Response): Promise<Response> {
        const { idhost, idvisitor, date } = req.body

        const host = await AppDataSource.getRepository(Team).findOneBy({ id: idhost })

        const visitor = await AppDataSource.getRepository(Team).findOneBy({ id: idvisitor })

        const match = new Match()
        match.host = host
        match.visitor = visitor
        match.date = date

        const newMatch = await AppDataSource.getRepository(Match).save(match)

        return res.json(newMatch)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, idhost, idvisitor, date } = req.body


        const host = await AppDataSource.getRepository(Team).findOneBy({ id: idhost })
        console.log(host)
        if (!host) {
            return res.json({ error: "Mandante desconhecido" })
        }
        const visitor = await AppDataSource.getRepository(Team).findOneBy({ id: idvisitor })
        if (!visitor) {
            return res.json({ error: "Visitante desconhecido" })
        }
        var match = await AppDataSource.getRepository(Match).findOneBy({ id: id })
        match.host = host
        match.visitor = visitor
        match.date = date

        const updatedMatch = await AppDataSource.getRepository(Match).save(match)

        return res.json(updatedMatch)
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        const match = await AppDataSource.getRepository(Match).delete({ id: id })

        return res.json({ match })
    }

    public async listLimit(req: Request, res: Response): Promise<Response> {
        const { limit, offset } = req.body

        const Matches = await AppDataSource.getRepository(Match).find({
            relations: { host: true, visitor: true },
            order: { date: "DESC" },
            take: limit,
            skip: offset

        })

        return res.json(Matches)
    }

    public async listbyId(req: Request, res: Response): Promise<Response> {
        const id = req.params.id
        console.log(id)
        const team = await AppDataSource.getRepository(Team).findOneBy({ id: parseInt(id) })

        const Matches = await AppDataSource.getRepository(Match).find({
            where: [{ host: team }, { visitor: team }],
            relations: { host: true, visitor: true },
            order: { date: "DESC" },


        })

        return res.json(Matches)
    }
}

export default new SpentController();