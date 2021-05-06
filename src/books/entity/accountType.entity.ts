import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Unique, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Account } from './account.entity';
import { User } from '../../auth/entity/user.entity';

@Entity("books_account_types")
@Unique(['name', 'code'])
export class AccountType {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryGeneratedColumn("uuid")
    @Column({ default: "uuid_generate_v1()" })
    uuid: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    description?: string;

    @Column({
        type: "uuid",
        name: "created_by",
        unsigned: true,
    })
    createdById: string;

    @OneToMany(type => Account, account => account.accountType)
    accounts: Account[];

    @ManyToOne(type => User)
    @JoinColumn({ name: "created_by", referencedColumnName: "uuid" })
    createdBy: User;

    @ManyToOne(type => User)
    @JoinColumn({ name: "updated_by", referencedColumnName: "uuid" })
    updatedBy?: User;

    @ManyToOne(type => User)
    @JoinColumn({ name: "deleted_by", referencedColumnName: "uuid" })
    deletedBy?: User;

    @CreateDateColumn({ name: 'created_at' })    
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt: Date;
}
