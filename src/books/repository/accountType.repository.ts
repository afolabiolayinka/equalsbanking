import {EntityRepository, Repository} from "typeorm";
import {AccountType} from "../entity/accountType.entity";

@EntityRepository(AccountType)
export class AccountTypeRepository extends Repository<AccountType> {

}