import { Injectable, Logger } from '@nestjs/common';
import { Accounts, AccountsDocument } from './schemas/accounts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isArray } from 'class-validator';
import { saveImage } from 'src/utils/saveImage';

@Injectable()
export class AccountsService {
  private logger = new Logger(AccountsService.name);

  constructor(@InjectModel(Accounts.name) private readonly accountsModel: Model<AccountsDocument>){}

  async editOne(body){
    try {
      this.logger.log('Accounts Service - EDIT ONE - STARTING');

      if (body && body.accounts && isArray(body.accounts)) {
        for (let i = 0; i < body.accounts.length; i++) {
          const link = body.accounts[i].image;
          if (link) {
            saveImage(link)
          }
        }
      }
      

      const account = await this.accountsModel.findOne({identifier: body.identifier});

      account.name = body.name;
      account.title = body.title;
      account.description = body.description;
      account.accounts = body.accounts;

      account.save();
      this.logger.log('Accounts Service - EDIT ONE - FINISHED');
      return account;
    } catch (error) {
      this.logger.log('Accounts Service - EDIT ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }
  async findOne(identifier: string){
    try {
      this.logger.log('Accounts Service - FIND ONE - STARTING');

      const account = await this.accountsModel.findOne({identifier: identifier});

      this.logger.log('Accounts Service - FIND ONE - FINISHED');
      return account;
    } catch (error) {
      this.logger.log('Accounts Service - FIND ONE - FAILED', error);
      return {
        error: {
          status: 400,
          message: error,
        },
      };
    }
  }

}