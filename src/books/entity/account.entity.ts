import { CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Column, Entity,Unique, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { AccountType } from './accountType.entity';

@Entity("books_accounts")
@Unique(['name','code'])
export class Account {
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

  @Column({ default: 1 })
  status: number;

  @ManyToOne(type => AccountType)
  @JoinColumn({ name: "type_id", referencedColumnName: "uuid" })
  accountType: AccountType;

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
