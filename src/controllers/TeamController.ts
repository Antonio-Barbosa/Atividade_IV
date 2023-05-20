import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Team } from '../entities/Teams';
import { Like } from "typeorm";


class TeamController {

  

  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const team = new Team()
    team.name = name
    const teams = await AppDataSource.getRepository(Team).save(team).catch((e) => {
      if (e.errno) {
        if (e.errno == 19) {
          return { error: 'Nome já existe' };
        } else {
          return { error: 'Erro ao criar time' };

        }
      }
    })

    return res.json({ teams })
  }


  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.body;
    const teams = await AppDataSource.getRepository(Team).delete({ id: id })

    return res.json({ teams })
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name } = req.body;
    const team = await AppDataSource.getRepository(Team).findOneBy({ id: id })
    team.name = name
    const teams = await AppDataSource.getRepository(Team).save(team).catch((e) => {
      if (e.errno) {
        if (e.errno == 19) {
          return { error: 'Nome já existe' };
        } else {
          return { error: 'Erro ao Atualizar time' };

        }
      }
    })

    return res.json({ teams })
  }


  public async getAll(_: Request, res: Response): Promise<Response> {
    const teams = await AppDataSource.getRepository(Team).find({
      order: {
        name: 'ASC'
      }
    })
    return res.json({ teams })
  }


  public async getAllTermo(req: Request, res: Response): Promise<Response> {
    const termo = req.params.termo;
    const teams = await AppDataSource.getRepository(Team).find({
      where: { name: Like(`%${termo}%`) },
      order: {
        name: 'ASC'
      }
    })
    return res.json({ teams })
  }

}

export default new TeamController();