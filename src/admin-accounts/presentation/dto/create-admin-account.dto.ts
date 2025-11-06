import { CreateAdminAccountInput } from "src/admin-accounts/application/inputs";
import { UniversityRole } from "src/admin-accounts/domain/enums";
import { CreateUserDto } from '../../../common/dto/create-user.dto';
import { IsEnum, IsString, IsUUID, MinLength } from "class-validator";

export class CreateAdminAccountDto extends CreateUserDto implements CreateAdminAccountInput{
    @IsEnum(UniversityRole)
    role: UniversityRole;

    @IsUUID()
    @MinLength(3)
    areaId: string;
}
