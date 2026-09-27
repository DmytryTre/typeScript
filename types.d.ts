declare module "sort-by" {
  type NestedPaths<T> = T extends object
    ? {
        [K in keyof T & string]: T[K] extends object
          ? `${K}` | `${K}.${NestedPaths<T[K]>}`
          : `${K}`;
      }[keyof T & string]
    : never;

  type SortKey<T> = NestedPaths<T> | `-${NestedPaths<T>}`;

  export default function sortBy<T>(
    ...argument: SortKey<T>[]
  ): (obj1: T, obj2: T) => number;
}
