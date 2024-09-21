export const GRID_SIZE = 20;
export const CELL_SIZE = 20;

export const DIRECTIONS = {
    ArrowLeft: {
        code: 37,
        movement: -1,
        rotation: 180
    },
    A: {
        code: 65,
        movement: -1,
        rotation: 180
    },
    a: {
        code: 65,
        movement: -1,
        rotation: 180
    },
    ArrowUp: {
        code: 38,
        movement: -GRID_SIZE,
        rotation: 270
    },
    W: {
        code: 87,
        movement: -GRID_SIZE,
        rotation: 270
    },
    w: {
        code: 87,
        movement: -GRID_SIZE,
        rotation: 270
    },
    ArrowRight: {
        code: 39,
        movement: 1,
        rotation: 0
    },
    D: {
        code: 68,
        movement: 1,
        rotation: 0
    },
    d: {
        code: 68,
        movement: 1,
        rotation: 0
    },
    ArrowDown: {
        code: 40,
        movement: GRID_SIZE,
        rotation: 90
    },
    S: {
        code: 83,
        movement: GRID_SIZE,
        rotation: 90
    },
    s: {
        code: 83,
        movement: GRID_SIZE,
        rotation: 90
    },
}

export const ARROW_DIRECTIONS = {
    ArrowLeft: {
        code: 37,
        movement: -1,
        rotation: 180
    },
    ArrowUp: {
        code: 38,
        movement: -GRID_SIZE,
        rotation: 270
    },
    ArrowRight: {
        code: 39,
        movement: 1,
        rotation: 0
    },
    ArrowDown: {
        code: 40,
        movement: GRID_SIZE,
        rotation: 90
    }
}

export const OBJECT_TYPE = {
    BLANK: 'blank',
    WALL: 'wall',
    DOT: 'dot',
    ALIEN_1: 'alien_1',
    ALIEN_2: 'alien_2',
    ALIEN_3: 'alien_3',
    ALIEN_4: 'alien_4',
    PILL: 'pill',
    PACMAN: 'pacman',
    ALIEN: 'alien',
    SCARED: 'scared',
    BASE: 'base'
}

export const CLASS_LIST = [
    OBJECT_TYPE.BLANK,
    OBJECT_TYPE.WALL,
    OBJECT_TYPE.DOT,
    OBJECT_TYPE.ALIEN_1,
    OBJECT_TYPE.ALIEN_2,
    OBJECT_TYPE.ALIEN_3,
    OBJECT_TYPE.ALIEN_4,
    OBJECT_TYPE.PILL,
    OBJECT_TYPE.PACMAN,
    OBJECT_TYPE.BASE
]

export const LEVEL_MAP = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
    1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 
    1, 2, 2, 2, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2, 2, 2, 2, 2, 2, 1, 
    1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 2, 1, 
    1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 2, 1,
    1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1,
    1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
