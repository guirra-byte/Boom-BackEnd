import { SetMetadata } from '@nestjs/common';

const UseRepository = (__reference_repository: string) =>
  SetMetadata('RepositoryReference', __reference_repository);

export { UseRepository };
