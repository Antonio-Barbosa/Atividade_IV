import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({ name: "teams" })
export class Team {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, length: 30 })
    name: string;
}
