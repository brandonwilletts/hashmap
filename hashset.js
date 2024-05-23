const { LinkedList } = require("./linkedlists.js");

class HashSet {
  static INITIALCAPACITY = 16;
  static LOAD_FACTOR = 0.75;

  constructor() {
    this.array = [];
    this.capacity = HashSet.INITIALCAPACITY;
    this.bucketcount = 0;
    this.keycount = 0;
  }

  requireExpansion() {
    if (this.bucketcount / this.capacity >= HashSet.LOAD_FACTOR) {
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

  setData(key) {
    const index = this.getHash(key);
    if (!this.array[index]) {
      this.array[index] = new LinkedList();
      this.array[index].append(key);
      this.keycount++;
      this.bucketcount++;
    } else if (this.array[index].containsKey(key)) {
      const node = this.array[index].findNodeByKey(key);
      node.value = key;
    } else {
      this.array[index].append(key);
      this.keycount++;
    }
    this.requireExpansion() ? this.expandCapacity() : null;
  }

  has(key) {
    const index = this.getHash(key);
    if (this.array[index]) {
      return this.array[index].find(key) != null;
    } else {
      return false;
    }
  }

  remove(key) {
    const index = this.getHash(key);
    console.log(this.array[index]);
    if (this.array[index]) {
      const nodeIndex = this.array[index].find(key);
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
    let keys = [];
    this.array.map((linkedlist) => {
      if (linkedlist) {
        let currentNode = linkedlist.head;
        while (currentNode) {
          keys.push(currentNode.value);
          currentNode = currentNode.next;
        }
      }
    });
    return keys;
  }
}
