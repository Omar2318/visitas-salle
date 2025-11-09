import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { PaginationDto } from 'src/common/dto';
import { Auth } from 'src/auth/presentation/decorators';
import { UserRole } from 'src/auth/domain/enums';

@ApiTags('Areas') // Nombre del grupo en Swagger UI
@ApiCookieAuth('token')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  /**
   * Crea una nueva área
   * Solo accesible para administradores del sistema.
   */
  @Post()
  @Auth(UserRole.SystemAdmin)
  @ApiOperation({
    summary: 'Crear área',
    description:
      'Crea una nueva área dentro del sistema. Solo disponible para administradores del sistema.',
  })
  @ApiCreatedResponse({
    description: 'Área creada correctamente',
    schema: {
      example: { message: 'Area creada correctamente' },
    },
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos o área ya existente',
    schema: {
      example: {
        message: 'El área ya existe',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  async create(@Body() createAreaDto: CreateAreaDto) {
    await this.areaService.create(createAreaDto);
    return { message: 'Area creada correctamente' };
  }

  /**
   * Obtiene todas las áreas (con paginación opcional)
   */
  @Get()
  @Auth()
  @ApiOperation({
    summary: 'Obtener todas las áreas',
    description:
      'Devuelve la lista de todas las áreas registradas en el sistema. Soporta paginación.',
  })
  @ApiOkResponse({
    description: 'Lista de áreas disponibles',
    schema: {
      example: [
        {
          id: '57f77483-306a-40b0-800b-7f5bc0ecdbca',
          name: 'Coordinación',
        },
        {
          id: 'ad0f3964-5094-4c59-afc9-f6855415e9a4',
          name: 'Comunicación',
        },
      ],
    },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.areaService.findAll(paginationDto);
  }

  /**
   * Obtiene una sola área por su ID (UUID)
   */
  @Get(':id')
  @Auth()
  @ApiOperation({
    summary: 'Obtener área por ID',
    description: 'Busca un área por su identificador UUID.',
  })
  @ApiOkResponse({
    description: 'Área encontrada correctamente',
    schema: {
      example: {
        id: '57f77483-306a-40b0-800b-7f5bc0ecdbca',
        name: 'Coordinación',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'ID inválido o error en la solicitud',
    schema: {
      example: {
        message: 'El área ya existe',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Área no encontrada',
    schema: {
      example: {
        message: 'Área no encontrada',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.areaService.findOne(id);
  }

  /**
   * Actualiza una área existente
   */
  @Patch(':id')
  @Auth(UserRole.SystemAdmin)
  @ApiOperation({
    summary: 'Actualizar área',
    description:
      'Permite modificar los datos de un área existente. Requiere permisos de administrador del sistema.',
  })
  @ApiOkResponse({
    description: 'Área actualizada correctamente',
    schema: {
      example: { message: 'Area actualizada correctamente' },
    },
  })
  @ApiNotFoundResponse({
    description: 'Área no encontrada',
    schema: {
      example: {
        message: 'Área no encontrada',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    await this.areaService.update(id, updateAreaDto);
    return { message: 'Area actualizada correctamente' };
  }

  /**
   * Elimina una área por su ID
   * Solo accesible para administradores del sistema.
   */
  @Delete(':id')
  @Auth(UserRole.SystemAdmin)
  @ApiOperation({
    summary: 'Eliminar área',
    description:
      'Elimina un área por su ID. Solo los administradores del sistema pueden realizar esta operación.',
  })
  @ApiOkResponse({
    description: 'Área eliminada correctamente',
    schema: {
      example: { message: 'Area eliminada correctamente' },
    },
  })
  @ApiNotFoundResponse({
    description: 'Área no encontrada',
    schema: {
      example: {
        message: 'Área no encontrada',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.areaService.remove(id);
    return { message: 'Area eliminada correctamente' };
  }
}
