import { ARROW_DIRECTIONS, GRID_SIZE, OBJECT_TYPE } from "./vars.js";

export function randomMovement(position, direction, objectExists, goalPosition, run) {
    let dir = direction;
    let nextMovePos = position + dir.movement;

    const keys = Object.keys(ARROW_DIRECTIONS);

    while(objectExists(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExists(nextMovePos, OBJECT_TYPE.ALIEN)) {
            const key = keys[Math.floor(Math.random() * keys.length)];
            dir = ARROW_DIRECTIONS[key];
            nextMovePos = position + dir.movement;
    }

    return { nextMovePos, direction: dir };
}


export function getCloserMovement(position, direction, objectExists, goalPosition, run) {
    let dir = direction;
    let nextMovePos = position + dir.movement;

    const [currentRow, currentColumn]  = parsePositionToCoordinates(position);
    const [goalRow, goalColumn] = parsePositionToCoordinates(goalPosition);

    let topDistance, rightDistance, bottomDistance, leftDistance;
    
    if(canMove(objectExists, position+ARROW_DIRECTIONS.ArrowUp.movement)) {
        topDistance = calculateLinearDistance(
            currentRow > 0 ? currentRow - 1 : currentRow, 
            currentColumn,
            goalRow, 
            goalColumn
        );
    } else {
        topDistance = run ? Number.MIN_VALUE : Number.MAX_VALUE;
    }
    if(canMove(objectExists, position+ARROW_DIRECTIONS.ArrowRight.movement)) {
        rightDistance = calculateLinearDistance(
            currentRow , 
            currentColumn < GRID_SIZE - 1 ? currentColumn + 1 : currentColumn, 
            goalRow, 
            goalColumn
        );
    } else {
        rightDistance = run ? Number.MIN_VALUE : Number.MAX_VALUE;
    }
    if(canMove(objectExists, position+ARROW_DIRECTIONS.ArrowDown.movement)) {
        bottomDistance = calculateLinearDistance(
            currentRow < GRID_SIZE - 1 ? currentRow + 1 : currentRow, 
            currentColumn, 
            goalRow, 
            goalColumn
        );
    } else {
        bottomDistance = run ? Number.MIN_VALUE : Number.MAX_VALUE;
    }
    if(canMove(objectExists, position+ARROW_DIRECTIONS.ArrowLeft.movement)) {
        leftDistance = calculateLinearDistance(
            currentRow,
            currentColumn > 0 ? currentColumn - 1 : currentColumn,
            goalRow, 
            goalColumn
        );
    } else {
        leftDistance = run ? Number.MIN_VALUE : Number.MAX_VALUE;
    }

    const bestDistance = run ? 
        Math.max(topDistance, rightDistance, bottomDistance, leftDistance) :
        Math.min(topDistance, rightDistance, bottomDistance, leftDistance);

    if(topDistance == bestDistance) {
        dir = ARROW_DIRECTIONS.ArrowUp;
        nextMovePos = position + dir.movement;
        return { nextMovePos, direction: dir };
    }
    if(rightDistance == bestDistance) {
        dir = ARROW_DIRECTIONS.ArrowRight;
        nextMovePos = position + dir.movement;
        return { nextMovePos, direction: dir };
    }
    if(bottomDistance == bestDistance) {
        dir = ARROW_DIRECTIONS.ArrowDown;
        nextMovePos = position + dir.movement;
        return { nextMovePos, direction: dir };
    }
    if(leftDistance == bestDistance) {
        dir = ARROW_DIRECTIONS.ArrowLeft;
        nextMovePos = position + dir.movement;
        return { nextMovePos, direction: dir };
    }

    console.log('arriba')
    return { nextMovePos, direction: dir };
}

export function getCloserMovementOld(position, direction, objectExists, goalPosition, run) {
    let dir = direction;
    let nextMovePos = position + dir.movement;

    const [currentRow, currentColumn]  = parsePositionToCoordinates(position);
    const [goalRow, goalColumn] = parsePositionToCoordinates(goalPosition);

    const topDistance = calculateLinearDistance(
        currentRow > 0 ? currentRow - 1 : currentRow, 
        currentColumn,
        goalRow, 
        goalColumn
    );
    const rightDistance = calculateLinearDistance(
        currentRow , 
        currentColumn < GRID_SIZE - 1 ? currentColumn + 1 : currentColumn, 
        goalRow, 
        goalColumn
    );
    const bottomDistance = calculateLinearDistance(
        currentRow < GRID_SIZE - 1 ? currentRow + 1 : currentRow, 
        currentColumn, 
        goalRow, 
        goalColumn
    );
    const leftDistance = calculateLinearDistance(
        currentRow,
        currentColumn > 0 ? currentColumn - 1 : currentColumn,
        goalRow, 
        goalColumn
    );
    let triedTop = false;
    let triedRight = false;
    let triedDown = false;
    let triedLeft = false;
    while(objectExists(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExists(nextMovePos, OBJECT_TYPE.ALIEN)) {
        const minDistance = run ? 
            Math.max(
                triedTop ? Number.MIN_VALUE : topDistance, 
                triedRight ? Number.MIN_VALUE : rightDistance, 
                triedDown ? Number.MIN_VALUE : bottomDistance, 
                triedLeft ? Number.MIN_VALUE : leftDistance
            ) :
            Math.min(
                triedTop ? Number.MAX_VALUE : topDistance, 
                triedRight ? Number.MAX_VALUE : rightDistance, 
                triedDown ? Number.MAX_VALUE : bottomDistance, 
                triedLeft ? Number.MAX_VALUE : leftDistance
            );

        if(topDistance == minDistance && canMove(objectExists, position+ARROW_DIRECTIONS.ArrowUp.movement)) {
            dir = ARROW_DIRECTIONS.ArrowUp;
            nextMovePos = position + dir.movement;
            triedTop = true;
        }
        if(rightDistance == minDistance && canMove(objectExists, position+ARROW_DIRECTIONS.ArrowRight.movement)) {
            dir = ARROW_DIRECTIONS.ArrowRight;
            nextMovePos = position + dir.movement;
            triedRight = true;
        }
        if(bottomDistance == minDistance && canMove(objectExists, position+ARROW_DIRECTIONS.ArrowDown.movement)) {
            dir = ARROW_DIRECTIONS.ArrowDown;
            nextMovePos = position + dir.movement;
            triedDown = true;
        }
        if(leftDistance == minDistance && canMove(objectExists, position+ARROW_DIRECTIONS.ArrowLeft.movement)) {
            dir = ARROW_DIRECTIONS.ArrowLeft;
            nextMovePos = position + dir.movement;
            triedLeft = true;
        }
    }

    return { nextMovePos, direction: dir };
}

function canMove(objectExists, nextMovePos) {
    return !objectExists(nextMovePos, OBJECT_TYPE.WALL) &&
        !objectExists(nextMovePos, OBJECT_TYPE.ALIEN);
}

function calculateLinearDistance(initialRow, initialColumn, goalRow, goalColumn) {
    const diffX = Math.pow(Math.abs(goalRow - initialRow),2);
    const diffY = Math.pow(Math.abs(goalColumn - initialColumn), 2);
    return Math.sqrt(diffX + diffY);
}

function parsePositionToCoordinates(position) {
    const row = Math.floor(position/GRID_SIZE);
    const column = position % 20;
    return [row, column];
}