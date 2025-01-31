import { OBJECT_TYPE, DIRECTIONS } from "./vars.js";

class Pacman {
    constructor(speed, startPos) {
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.powerPill = false;
        this.rotation = true;
    }

    getPosition() {
        return this.pos;
    }

    shouldMove() {
        if(!this.dir) return false;
        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }

    getNextMove(objectExists, goalPosition) {
        let nextMovePos = this.pos + this.dir.movement;

        if(objectExists(nextMovePos, OBJECT_TYPE.WALL) ||
         objectExists(nextMovePos, OBJECT_TYPE.BASE)) {
            nextMovePos = this.pos;
        }

        return {
            nextMovePos, direction: this.dir
        };
    }

    makeMove() {
        const classesToRemove = [OBJECT_TYPE.PACMAN]
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return { classesToRemove, classesToAdd };
    }

    setNewPos(nextMovePos) {
        this.pos = nextMovePos;
    }

    handleKeyInput(e, objectExists) {
        let dir;
        const directionKeys = [37,38,39,40,65,68,83,87]
        if(directionKeys.indexOf(e.keyCode) > -1) {
            dir = DIRECTIONS[e.key];
        } else {
            return;
        }

        const nextMovePos = this.pos + dir.movement;
        if(objectExists(nextMovePos, OBJECT_TYPE.WALL) ||
         objectExists(nextMovePos, OBJECT_TYPE.BASE)) return;

        this.dir = dir;
    }
}

export default Pacman;