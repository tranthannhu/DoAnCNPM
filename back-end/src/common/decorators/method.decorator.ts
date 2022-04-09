import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PossessionGuard } from 'src/guards/posessionHandle.guard';

// export const Methods = (...methods: string[]) =>
//   SetMetadata('methods', methods);
export function Methods(...methods: string[]) {
  return applyDecorators(
    SetMetadata('methods', methods),
    UseGuards(JwtAuthGuard),
    UseGuards(RoleGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
