import { validate } from 'class-validator';

export const validateBody = async <S>(dto: new () => {}, body: S) => {
  const instance = new dto();
  Object.assign(instance, body);
  const errors = await validate(instance);
  return errors;
}