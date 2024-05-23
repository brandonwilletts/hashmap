const { LinkedList } = require("./linkedlists.js");

class HashMap {
  static INITIALCAPACITY = 16;
  static LOAD_FACTOR = 0.75;

  constructor() {
    this.array = [];
    this.capacity = HashMap.INITIALCAPACITY;
    this.bucketcount = 0;
    this.keycount = 0;
  }

  requireExpansion() {
    if (this.bucketcount / this.capacity >= HashMap.LOAD_FACTOR) {
      return true;
    } else {
      return false;
    }
  }

  expandCapacity() {
    this.capacity = this.capacity * 2;
    const currentNodes = this.entries();
    this.clear();
    currentNodes.forEach((node) => this.setData(node[0], node[1]));
  }

  getHash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    return hashCode;
  }

  setData(key, value) {
    const index = this.getHash(key);
    if (!this.array[index]) {
      this.array[index] = new LinkedList();
      this.array[index].append({ key: key, value: value });
      this.keycount++;
      this.bucketcount++;
    } else if (this.array[index].containsKey(key)) {
      const node = this.array[index].findNodeByKey(key);
      node.value.value = value;
    } else {
      this.array[index].append({ key: key, value: value });
      this.keycount++;
    }
    this.requireExpansion() ? this.expandCapacity() : null;
  }

  get(key) {
    const index = this.getHash(key);
    if (this.array[index]) {
      const node = this.array[index].findNodeByKey(key);
      return node.value.value;
    } else {
      return null;
    }
  }

  has(key) {
    const index = this.getHash(key);
    if (this.array[index]) {
      return this.array[index].findNodeByKey(key) != null;
    } else {
      return false;
    }
  }

  remove(key) {
    const index = this.getHash(key);
    if (this.array[index]) {
      const nodeIndex = this.array[index].findIndexByKey(key);
      if (nodeIndex != null) {
        this.array[index].removeAt(nodeIndex);
        this.keycount--;
        if (this.array[index].getSize() == 0) {
          this.array.splice(index, 1);
          this.bucketcount--;
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  length() {
    return this.keycount;
  }

  clear() {
    this.array = [];
    this.bucketcount = 0;
    this.keycount = 0;
  }

  keys() {
    const entries = this.entries();
    let keys = [];
    for (let i = 0; i < entries.length; i++) {
      keys.push(entries[i][0]);
    }
    return keys;
  }

  values() {
    const entries = this.entries();
    let values = [];
    for (let i = 0; i < entries.length; i++) {
      values.push(entries[i][1]);
    }
    return values;
  }

  entries() {
    let entries = [];
    this.array.map((linkedlist) => {
      if (linkedlist) {
        let currentNode = linkedlist.head;
        while (currentNode) {
          entries.push([currentNode.value.key, currentNode.value.value]);
          currentNode = currentNode.next;
        }
      }
    });
    return entries;
  }
}
