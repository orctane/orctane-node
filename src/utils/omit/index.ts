export const omitBy = <T extends Record<string, unknown>, U extends keyof T>(
  object: T,
  predicate: (value: T[U], key: U) => boolean,
): Omit<T, U> => {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(object)) {
    if (!predicate(value as T[U], key as U)) {
      result[key] = value;
    }
  }

  return result as Omit<T, U>;
};

export const omit = <T extends Record<string, unknown>, U extends keyof T>(
  object: T,
  keys: U[],
): Omit<T, U> => {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(object)) {
    if (!keys.includes(key as U)) {
      result[key] = value;
    }
  }

  return result as Omit<T, U>;
};
