import { UsersRepository } from 'src/@core/domains/users/infra/mongoose/UsersRepository';
import { Connection, Schema } from 'mongoose';

const repositories = [UsersRepository];

interface IRequestProps {
  __repository_reference: string;
  __schema_reference: string;
  __schema: Schema;
}

const RepositoryProvider = async (data: IRequestProps) => {
  let __connection: Connection;
  const { __schema_reference, __schema } = data;

  const model = __connection.model(__schema_reference, __schema);
  return new repositories[data.__repository_reference](model);
};

export { RepositoryProvider };
