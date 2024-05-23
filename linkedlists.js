class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  print() {
    if (this.size === 0) {
      console.log(null);
    } else {
      let currentNode = this.head;
      let nodeList = "";
      while (currentNode) {
        nodeList += `${currentNode.value} `;
        currentNode = currentNode.next;
      }
      console.log(nodeList);
    }
  }

  append(value) {
    const node = new Node(value);
    if (this.size === 0) {
      this.head = node;
    } else {
      let lastNode = this.head;
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      lastNode.next = node;
    }
    this.size++;
  }

  prepend(value) {
    const node = new Node(value);
    if (this.size === 0) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let tail = this.head;
    if (this.size > 0) {
      while (tail.next) {
        tail = tail.next;
      }
    }
    return tail;
  }

  at(index) {
    let node = this.head;
    if (index > this.size - 1 || index < 0) {
      node = null;
    } else if (index > 0) {
      for (let i = 0; i < index; i++) {
        node = node.next;
      }
    }
    return node;
  }

  pop() {
    if (this.size === 1) {
      this.head = null;
      this.size--;
    } else if (this.size > 1) {
      let secondToLastNode = this.head;
      while (secondToLastNode.next.next) {
        secondToLastNode = secondToLastNode.next;
      }
      secondToLastNode.next = null;
      this.size--;
    }
    return list;
  }

  contains(value) {
    let node = this.head;
    let result = false;
    while (node) {
      if (node.value == value) {
        result = true;
      }
      node = node.next;
    }
    return result;
  }

  containsKey(key) {
    let node = this.head;
    let result = false;
    while (node) {
      if (node.value.key == key) {
        result = true;
      }
      node = node.next;
    }
    return result;
  }

  find(value) {
    let node = this.head;
    let result = null;
    let index = 0;
    while (node) {
      if (node.value == value) {
        result = index;
      }
      node = node.next;
      index++;
    }
    return result;
  }

  findIndexByKey(key) {
    let node = this.head;
    let result = null;
    let index = 0;
    while (node) {
      if (node.value.key == key) {
        result = index;
      }
      node = node.next;
      index++;
    }
    return result;
  }

  findNodeByKey(key) {
    let node = this.head;
    let result = null;
    while (node) {
      if (node.value.key == key) {
        result = node;
      }
      node = node.next;
    }
    return result;
  }

  toString() {
    let node = this.head;
    let list = "";
    while (node) {
      list += `( ${node.value} ) -> `;
      node = node.next;
    }
    list += "null";
    return list;
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
    } else if (index === list.size) {
      this.append(value);
    } else if (index > list.size) {
      console.log("Index does not exist");
    } else {
      const node = new Node(value);
      let prevNode = this.head;
      let nextNode = this.head;
      for (let i = 0; i < index; i++) {
        prevNode = nextNode;
        nextNode = nextNode.next;
      }
      prevNode.next = node;
      node.next = nextNode;
      this.size++;
    }
  }

  removeAt(index) {
    if (index >= this.size || index < 0) {
      console.log("Index does not exist");
    } else if (index === 0) {
      this.head = this.head.next;
      this.size--;
    } else if (index === list.size - 1) {
      this.pop();
    } else {
      let prevNode = this.head;
      let nextNode = this.head;
      for (let i = 0; i < index; i++) {
        prevNode = nextNode;
        nextNode = nextNode.next;
      }
      prevNode.next = nextNode.next;
      this.size--;
    }
  }
}

module.exports = { LinkedList };
