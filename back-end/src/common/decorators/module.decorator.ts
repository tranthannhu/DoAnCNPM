import { SetMetadata } from '@nestjs/common';

export const Modules = (...modules: string[]) =>
  SetMetadata('modules', modules);
