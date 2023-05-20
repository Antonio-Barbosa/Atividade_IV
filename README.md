### Aula 4 - TypeORM e autenticação

## Delete cascade

Para funcionar o "on delete" na tabela spents tem de usar o objeto QueryBuilder para excluir na tabela users. No exemplo a seguir ao excluir o usuário serão excluídos os registros da tabela spents.

```
public async delete(_: Request, res: Response): Promise<Response> {
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = res.locals;
    const r = await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id=:id", { id })
        .execute();

    return res.json(r);
}
```