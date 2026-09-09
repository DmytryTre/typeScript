class CustomMap<K, V> {
  private readonly bucketCount = 32;

  private buckets: Array<Array<[K, V]>>;

  private _size = 0;

  private initBuckets(): void {
    this.buckets = Array.from({ length: this.bucketCount }, () => []);
  }

  constructor() {
    this.initBuckets();
  }

  private getBucketIndex(key: K): number {
    let hashString = "";

    if (typeof key === "object" && key !== null) {
      hashString = JSON.stringify(key);
    } else {
      hashString = String(key);
    }
    let hash = 0;
    for (let i = 0; i < hashString.length; i++) {
      hash += hashString.charCodeAt(i);
    }

    return hash % this.bucketCount;
  }

  set(key: K, value: V): this {
    const bucketIndex = this.getBucketIndex(key);
    const bucket = this.buckets[bucketIndex]!;

    for (let i = 0; i < bucket.length; i++) {
      const item = bucket[i];
      if (item && Object.is(item[0], key)) {
        item[1] = value;
        return this;
      }
    }

    bucket.push([key, value]);
    this._size++;
    return this;
  }
  get(key: K): V | null {
    const bucketIndex = this.getBucketIndex(key);
    const bucket = this.buckets[bucketIndex]!;

    for (let i = 0; i < bucket.length; i++) {
      const item = bucket[i];
      if (item && Object.is(item[0], key)) {
        return item[1];
      }
    }

    return null;
  }

  delete(key: K): boolean {
    const bucketIndex = this.getBucketIndex(key);
    const bucket = this.buckets[bucketIndex]!;

    for (let i = 0; i < bucket.length; i++) {
      const item = bucket[i];
      if (item && Object.is(item[0], key)) {
        bucket.splice(i, 1);
        this._size--;
        return true;
      }
    }

    return false;
  }

  clear() {
    this.initBuckets();
    this._size = 0;
  }

  get size(): number {
    return this._size;
  }
}
