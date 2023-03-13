class Node {
  _data;

  _next;

  _prev;

  constructor(data, next = null, prev = null) {
    this._data = data;
    this._next = next;
    this._prev = prev;
  }
}

class Queue {
  _front;

  _back;

  _size;

  constructor() {
    this._front = null;
    this._back = null;
    this._size = 0;
  }

  enqueue(data) {
    if (this._size === 0) {
      const node = new Node(data);
      this._front = node;
      this._back = node;
      this._size += 1;
      return;
    }

    const node = new Node(data, null, this._back);
    this._back._next = node;
    this._back = node;
    this._size += 1;
  }

  dequeue() {
    if (this._size === 0) {
      throw new Error('Queue Underflow');
    }

    if (this._size === 1) {
      const node = this._front;
      this._front = null;
      this._back = null;
      this._size = 0;
      return node._data;
    }

    const node = this._front;
    this._front = this._front._next;
    this._front._prev = null;
    this._size -= 1;
    return node._data;
  }

  toString() {
    if (this._size === 0) return '[]';

    let line = ' ]';
    let node;
    for (node = this._back; node._prev !== null; node = node._prev) {
      line = `, ${node._data}${line}`;
    }
    line = `[ ${node._data}${line}`;

    return line;
  }

  [Symbol.iterator]() {
    return {
      node: new Node(null, this._front, null),
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

function testQueue() {
  const q = new Queue();
  q.enqueue(10);
  q.enqueue(20);
  q.enqueue(30);
  let line = '';
  /* eslint-disable */
  for (v of q) {
    line += `${v}, `;
  }
  /* eslint-enable */
  console.log(line);
  console.log(`${q}`);
  console.log(q.dequeue());
  console.log(`${q}`);
  console.log(q.dequeue());
  console.log(`${q}`);
  console.log(q.dequeue());
  console.log(`${q}`);
  // console.log(`${q}`);
  console.log('\n\n');
}

testQueue();

// function testNode() {
//   const a = new Node(10);
//   console.log(a);
//   const b = new Node(20);
//   console.log(b);
//   a._next = b;
//   b._prev = a;
//   console.log(a);
//   console.log('\n\n');
// }

// testNode();
