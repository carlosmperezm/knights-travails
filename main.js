
let path = [];
let firstPositions;

function getPath(startPosition, endPosition) {
  let positions = getSurroundedValidPositions(startPosition);
  if (path.length == 0) {
    firstPositions = positions;
  }
  path.push(startPosition);
  console.log('poisitions of :', startPosition);
  console.log(positions)

  for (let position of positions) {
    if (position[0] === endPosition[0] && position[1] === endPosition[1]) {
      console.log('Position Found: ', position)
      path.push(position);
      return path;
    }
  }
  let position = positions.pop();
  let isPositionInPathList = path.find(pos => {
    return position[0] === pos[0] && position[1] === pos[1];
  })
  let isPositionInFirstPositions = firstPositions.find(pos => {
    return position[0] === pos[0] && position[1] === pos[1];
  })
  if (isPositionInPathList || isPositionInFirstPositions) {
    console.log('Skipping: ', position);
    console.log('Positions: ', positions)
    position = positions.pop();
    // return;
  }
  if (path.length > 20) return;
  console.log('Path: ', path)
  path.concat(getPath(position, endPosition));
  return path;
}

function getSurroundedValidPositions(position) {
  let startX = position[0];
  let startY = position[1];
  const surroundedPositions = [
    [startX - 2, startY - 1],
    [startX - 1, startY - 2],
    [startX + 1, startY - 2],
    [startX + 2, startY - 1],
    [startX + 2, startY + 1],
    [startX + 1, startY + 2],
    [startX - 1, startY + 2],
    [startX - 2, startY + 1],
  ];
  const validPositions = surroundedPositions.filter(position => {
    return position[0] >= 0 && position[0] <= 7 && position[1] >= 0 && position[1] <= 7;
  })
  return validPositions;
}

// console.log(getPath([0, 0], [3, 3]))
// console.log(getPath([3, 3], [0, 0]))
//
//
//


function knightMoves(startPosition, endPosition) {
  const queue = [startPosition];
  const visitedPositions = [];
  const path = {

  }
  let counter = 0;

  while (queue.length > 0) {
    if (counter === 60) return;
    counter++;
    let position = queue.shift();
    visitedPositions.push(position);
    console.log('Position: ', position)
    console.log('Queue: ', queue);
    console.log('Visited Positions', visitedPositions);
    console.log('Path: ', path);


    // If position is found
    if (position[0] === endPosition[0] && position[1] === endPosition[1]) {
      console.log('Found at: ', position);
      console.log('Final Path: ', path)
      return path;
    }

    let key = position.toString();
    path[key] = [];

    if (path[startPosition.toString()].at(-1)) {
      console.log('jujuejeu', path[startPosition.toString()].at(-1))

      if (position.toString() === path[startPosition.toString()].at(-1).toString()) {
        console.info("Last child of : ", startPosition);
      }
    }

    let children = getSurroundedValidPositions(position)
    console.log('Element: ', position, 'Positions:', children);

    for (child of children) {
      let isChildInQueue = queue.find(element => {
        return element[0] === child[0] && element[1] === child[1];
      });
      let wasChildVisited = visitedPositions.find(element => {
        return element[0] === child[0] && element[1] === child[1];
      });
      if (!isChildInQueue && !wasChildVisited) {
        path[key].push(child);
        console.log('Element: ', child, 'is NOT in the queue.')
        console.log('Saving it...')
        queue.push(child);
      } else {
        console.log('Skipping ', child)
      }
    }
    // console.log('Positions: ', leftChild, rightChild)
  }

}

knightMoves([3, 3], [0, 0]);
