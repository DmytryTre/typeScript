const user = {
  name: "Vasiliy",
  age: 8,
  skills: ["typescript", "javascript"],
};

const pickObjectKeys = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): { [P in K]+?: T[P] } => {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
};

const res = pickObjectKeys(user, ["age", "skills"]);
