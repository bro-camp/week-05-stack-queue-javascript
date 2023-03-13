class Node {
  _data;

  _next;

  constructor(data, next = null) {
    this._data = data;
    this._next = next;
  }
}

class Stack {
  _top;

  _size;

  constructor() {
    this._top = null;
    this._size = 0;
  }

  push(data) {
    if (this._size === 0) {
      this._top = new Node(data);
      this._size += 1;
      return;
    }

    const node = new Node(data, this._top);
    this._top = node;
    this._size += 1;
  }

  pop() {
    if (this._size === 0) {
      throw new Error('Stack Underflow');
    }

    const node = this._top;
    this._top = node._next;
    this._size -= 1;
    return node._data;
  }

  top() {
    if (this._size === 0) {
      throw new Error('Stack Underflow');
    }

    return this._top._data;
  }

  isEmpty() {
    return this._size === 0;
  }

  size() {
    return this._size;
  }

  toString() {
    if (this._size === 0) return '[]';

    let line = ' ]';
    let node;
    for (node = this._top; node._next !== null; node = node._next) {
      line = `, ${node._data}${line}`;
    }
    line = `[ ${node._data}${line}`;
    return line;
  }

  [Symbol.iterator]() {
    return {
      node: new Node(null, this._top),
      next() {
        this.node = this.node._next;
        return {
          value: this.node?._data,
          done: this.node === null,
        };
      },
    };
  }
}

function testNode() {
  const a = new Node(45);
  console.log(a);
  const b = new Node(50, a);
  console.log(b);
  console.log('\n\n');
}

function testStack() {
  const s = new Stack();
  console.log(`size: ${s.size()}`);
  s.push(10);
  s.push(20);
  console.log(`size: ${s.size()}`);
  console.log(s.top());
  s.push(30);
  console.log(`size: ${s.size()}`);
  console.log(s.top());
  console.log(s.isEmpty());
  // s.pop();
  // s.pop();
  // s.pop();
  // console.log(`size: ${s.size()}`);
  // console.log(s.isEmpty());
  console.log('\n\n\n');
  /* eslint-disable */
  for (v of s) {
    console.log(v);
  }

  console.log('\n');
  // s.pop();
  // s.pop();
  // s.pop();
  console.log(`${s}`);
  /* eslint-enable */
  console.log('\n\n');
}

testNode();
testStack();
