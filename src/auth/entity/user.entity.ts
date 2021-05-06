import { CreateDateColumn,UpdateDateColumn,DeleteDateColumn, Column, Entity,Unique, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity("auth_users")
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn("uuid") 
  @Column({ default: "uuid_generate_v1()" })
  uuid: string; 

  @Column()  
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: 1 })
  status: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: "created_by", referencedColumnName: "uuid" })
  createdBy?: User;

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
