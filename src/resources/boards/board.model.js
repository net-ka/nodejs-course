const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'Board', columns = [new Column()] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new Column({ ...column }));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

class Column {
  constructor({ id = uuid(), title = 'Column', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Board;
