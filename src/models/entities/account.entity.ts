import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ nullable: false })
    username: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: false})
    email: string
}