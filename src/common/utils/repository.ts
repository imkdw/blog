import { FindOption } from '../interfaces/find-option.interface';

// eslint-disable-next-line import/prefer-default-export
export const applyOption = <T extends { [key: string]: unknown }>(
  where: T,
  option: FindOption,
): T & { deleteAt?: null } => ({
  ...where,
  ...(!option?.includeDeleted && { deleteAt: null }),
});
