
/*
 * To find the fastest path traverse the positions(nodes) in Breadth-First Search (BFS),
 * that's basically going in level order. In that way, the position will be found
 * will the less positions(nodes) possible.
 *
 * #1 Problem: how to keep track of the poistions that will lead me to the
 * closest path posible.
 *
 * Posible solutions:
 *  1. Make each position(nodes) have a reference to its previous position(parent node).
 *  So that when the desired position is found, we can ask that position who was the
 *  previous position before it, and so on until reach the satarted position.
 *
 */
class Position {
  x;
  y;
  parentPosition;
  #children = [];
  coordinates = [];

  constructor(coordinates) {
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.coordinates = coordinates;
  }
  get children() {
    return this.#getSurroundedValidPositions();
  }
  #getSurroundedValidPositions() {
    const surroundedPositions = [
      new Position([this.x - 2, this.y - 1]),
      new Position([this.x - 1, this.y - 2]),
      new Position([this.x + 1, this.y - 2]),
      new Position([this.x + 2, this.y - 1]),
      new Position([this.x + 2, this.y + 1]),
      new Position([this.x + 1, this.y + 2]),
      new Position([this.x - 1, this.y + 2]),
      new Position([this.x - 2, this.y + 1]),
    ];
    const validPositions = surroundedPositions.filter(position => {
      return position.x >= 0
        && position.x <= 7
        && position.y >= 0
        && position.y <= 7;
    });
    return validPositions;
  }

}

function knightMoves(startPosition, endPosition) {
  const firstPosition = new Position(startPosition);
  const finalPosition = new Position(endPosition);
  const positionsToVisit = [firstPosition];
  const visitedPositions = [];

  while (positionsToVisit.length != 0) {
    // Take the next position in the queue
    const position = positionsToVisit.shift();
    // Add the position to the visited list
    visitedPositions.push(position);

    // If position is found
    if (position.x === finalPosition.x && position.y === finalPosition.y) {
      // Return the path
      path = [];
      let pos = position
      // Add all the positions that has been used to get to the final Position
      while (pos) {
        path.unshift(pos.coordinates)
        pos = pos.parentPosition;
      }
      console.log(`You made it in ${path.length - 1} moves!  Here's your path:`)
      path.forEach(p => console.log(p))
      return;
    }

    // If Position is NOT found
    const nextPositions = position.children;

    for (let pos of nextPositions) {
      // Validate if the position is in the queue
      let isChildInQueue = positionsToVisit.find(element => {
        return element.x === pos.x && element.y === pos.y;
      });
      // Validate if the position was visited
      let wasChildVisited = visitedPositions.find(element => {
        return element.x === pos.x && element.y === pos.y;
      });

      // Is a valid position
      if (!isChildInQueue && !wasChildVisited) {
        const childPosition = new Position(pos.coordinates);
        childPosition.parentPosition = position;
        positionsToVisit.push(childPosition);
      }
    }
  }

}

knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
knightMoves([3, 3], [4, 3])

