import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSecurityEmailDto } from './dto/create-security-email.dto';
import { UpdateSecurityEmailDto } from './dto/update-security-email.dto';
import { SecEmailRepoImpl } from '../infrastructure/repository';
import { HandleError, NotFoundError, UserError } from 'src/common/errors';
import { PaginationDto } from 'src/common/dto';
import { FindEmailsDto } from './dto';

@Injectable()
export class SecurityEmailService {

  constructor(
    private readonly securityEmailRepo: SecEmailRepoImpl,
  ) { }

  public async create(createSecurityEmailDto: CreateSecurityEmailDto) {

    try {

      const { email } = createSecurityEmailDto;
      return await this.securityEmailRepo.create(email);

    } catch (error) {
      HandleError.throw(error);
    }

  }

  findAll(findEmailsDto: FindEmailsDto) {
    return this.securityEmailRepo.findAll(findEmailsDto);
  }

  public async findOne(id: string) {

    try {

      const email = await this.securityEmailRepo.findOne(id);
      if (!email) throw new NotFoundError('Email no encontrado');

      return email;

    } catch (error) {
      HandleError.throw(error);
    }

  }

  public async update(id: string, updateSecurityEmailDto: UpdateSecurityEmailDto) {

    const nuevo = await this.securityEmailRepo.update(id, updateSecurityEmailDto.email);

    if(!nuevo) throw new NotFoundException('Email no encontrado');

  }

  public async remove(id: string) {
    const wasDeleted = await this.securityEmailRepo.remove(id);
      
    if(!wasDeleted) throw new NotFoundException('Email no encontrado');

  }


}
