import { CreateAdminAccountInput } from "src/admin-accounts/application/inputs";
import { UniversityRole } from "src/admin-accounts/domain/enums";
import { CreateUserDto } from '../../../common/dto/create-user.dto';
import { IsEnum, IsString, IsUUID, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminAccountDto extends CreateUserDto implements CreateAdminAccountInput{
    @IsEnum(UniversityRole)
    @ApiProperty({enum: UniversityRole})
    role: UniversityRole;

    @IsUUID()
    @MinLength(3)
    @ApiProperty({})
    areaId: string;
}
