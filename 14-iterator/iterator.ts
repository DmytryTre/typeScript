interface Item {
  id: number;
  date: string;
  title: string;
}
function parseDate(dateStr: string): number {
  const [day = 0, month = 1, year = 0] = dateStr.split("-").map(Number);

  return new Date(year, month - 1, day).getTime();
}

class IdIterator implements IterableIterator<Item> {
  private index = 0;
  private sortedItems: Item[];

  constructor(items: Item[]) {
    this.sortedItems = [...items].sort((a, b) => a.id - b.id);
  }

  public next(): IteratorResult<Item> {
    if (this.index < this.sortedItems.length) {
      return { value: this.sortedItems[this.index++]!, done: false };
    }
    return { value: null, done: true };
  }

  [Symbol.iterator](): IterableIterator<Item> {
    return this;
  }
}

class DateIterator implements IterableIterator<Item> {
  private index = 0;
  private sortedItems: Item[];

  constructor(items: Item[]) {
    this.sortedItems = [...items].sort(
      (a, b) => parseDate(a.date) - parseDate(b.date),
    );
  }

  public next(): IteratorResult<Item> {
    if (this.index < this.sortedItems.length) {
      const item = this.sortedItems[this.index++];

      if (item !== undefined) {
        return { value: item, done: false };
      }
    }
    return { value: undefined, done: true };
  }

  [Symbol.iterator](): IterableIterator<Item> {
    return this;
  }
}

class ItemCollection {
  private items: Item[] = [];

  constructor(items: Item[]) {
    this.items = items;
  }

  public createIdIterator(): IdIterator {
    return new IdIterator(this.items);
  }

  public createDateIterator(): DateIterator {
    return new DateIterator(this.items);
  }
}
