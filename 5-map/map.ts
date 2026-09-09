class CustomMap<K, V> {
  private entries: Array<[K, V]> = [];

  set(key: K, value: V): this {
    let isUpdated = false;

    for (const item of this.entries) {
      if (item[0] === key) {
        item[1] = value;
        isUpdated = true;
        break;
      }
    }

    if (!isUpdated) {
      this.entries.push([key, value]);
    }

    return this;
  }
  get(key: K): V | null {
    for (const item of this.entries) {
      if (item[0] === key) {
        return item[1];
      }
    }
    return null;
  }

  delete(key: K): boolean {
    for (let i = 0; i < this.entries.length; i++) {
      const e = this.entries[i];
      if (e && e[0] === key) {
        this.entries.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  clear() {
    this.entries = [];
  }

  get size(): number {
    return this.entries.length;
  }
}
