
// Class to access positions' data easier.
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
    /*
     * Get all valid option based on each position instance
     */

    // Get all options
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
    // Filter the positions to keep only the ones that don't go out of the board
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
  // Create instances to work better with the positions' data
  const firstPosition = new Position(startPosition);
  const finalPosition = new Position(endPosition);
  // List to keep track of all the positions we have to visit
  const positionsToVisit = [firstPosition];
  // List to keep track of all visited positions so we don't repeat positions
  const visitedPositions = [];

  //While there's still positions to visit
  while (positionsToVisit.length != 0) {
    // Take out the next position in the queue and store it 
    const position = positionsToVisit.shift();
    // Add the position to the visited list because we are visiting it
    visitedPositions.push(position);

    // If position is found
    if (position.x === finalPosition.x && position.y === finalPosition.y) {
      path = [];
      // Element that will be used to build the path backwards
      let pos = position // Starting for the last position (the final position)
      // Add all the parents positions so we can build the path
      while (pos) {
        //Add the element at the beginning of the path so we don't 
        //have to reverse it later
        path.unshift(pos.coordinates)
        // After the element was added to the path,
        // move on to its parent position
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

      // If it is a valid position
      if (!isChildInQueue && !wasChildVisited) {
        // Create a new instance for this child
        const childPosition = new Position(pos.coordinates);
        // Set its parent to the current position
        childPosition.parentPosition = position;
        //Add the child to the list so we visit it later
        positionsToVisit.push(childPosition);
      }
    }
  }

}

knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
knightMoves([3, 3], [4, 3])

