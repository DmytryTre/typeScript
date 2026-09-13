const obj: Record<string, number> = {
  a: 1,
  b: 2,
};

const swapKeysAndValues = <
  T extends string | number,
  D extends string | number,
>(
  obj: Record<T, D>,
): Record<D, T> => {
  const result = {} as Record<D, T>;
  for (const [key, value] of Object.entries(obj)) {
    result[value as D] = key as unknown as T;
  }
  return result;
};

const res = swapKeysAndValues(obj);
