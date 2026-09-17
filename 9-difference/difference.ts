interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: "" };
let b: IB = { a: 10, c: true };

interface IDifference {
  b: string;
}

const difference = <T extends object, D extends object>(
  a: T,
  b: D,
): Omit<T, keyof D> => {
  const result: Partial<T> = {};
  for (const item in a) {
    if (!(item in b)) {
      result[item] = a[item];
    }
  }
  return result as Omit<T, keyof D>;
};

let v0: IDifference = difference(a, b);
