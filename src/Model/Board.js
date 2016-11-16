import Location from './Location';
import { arrayShuffle, indexToXY, findNeighbours } from '../util';

export default class Board {

	/* public*/
	locations = [];

	width = 0;
	height = 0;
	flagsCount = 0;
	correctFlags = 0;
	minesCount = 0;

	constructor(width, height, mines) {
		this.width = width;
		this.height = height;
		this.minesCount = mines;
		this.fillLocationsArray(width, height);
		this.populateMinesPosition(mines, width, height);
	}

	/**
	 * public
	 * return false when hit a mine
	 */
	revealLocation(x, y) {
		// if its flagged, or already revealed do nothing
		if (this.locations[x][y].flagged || this.locations[x][y].revealed) {
			return true;
		}

		this.locations[x][y].revealed = true;

		if (this.locations[x][y].mine) {
			return false;
		}

		this.revealSafeNeighbours(x, y, []);

		return true;
	}

	/**
	 * public
	 * return true when the game was won
	 */
	toggleFlagAtLocation(x, y) {
		// Unflag
		if (this.locations[x][y].flagged) {
			this.locations[x][y].flagged = false;
			this.flagsCount--;

			if (this.locations[x][y].mine) {
				this.correctFlags--;
			}
		} else {
			if (this.flagsCount === this.minesCount) {
				return false;
			}

			this.locations[x][y].flagged = true;
			this.flagsCount++;

			if (this.locations[x][y].mine) {
				this.correctFlags++;
			}
		}

		return this.correctFlags === this.minesCount;
	}

	populateMinesPosition(mines, width, height) {
		// TODO shuffle only the needed length from the array (mines number) and not the whole array
		// can be turned also into a generator that random on demand
		const minesIndexs = Array.from(new Array(width * height).keys());
		arrayShuffle(minesIndexs);
		const minesPositions = minesIndexs.slice(-mines).map(i => indexToXY(i, width));

		for (let {x, y} of minesPositions) {
			this.locations[x][y].mine = true;

			for (let {x, y} of findNeighbours({x, y}, width, height)) {
				this.locations[x][y].nearby++;
			}
		}
	}

	fillLocationsArray(width, height) {
		this.locations = Array(width);

		for (let i = 0; i < width; i++) {
			this.locations[i] = new Array(height);

			for (let j = 0; j < height; j++) {
				this.locations[i][j] = new Location();
			}
		}
	}

	revealSafeNeighbours(x, y, visited) {
		for (let n of findNeighbours({x, y}, this.width, this.height)) {
			if (visited.some( vp => n.x === vp.x && n.y === vp.y )) {
				continue;
			}

			visited.push(n);

			if (this.locations[n.x][n.y].mine || this.locations[n.x][n.y].flagged) {
				continue;
			}

			this.locations[n.x][n.y].revealed = true;

			if (this.locations[n.x][n.y].nearby === 0) {
				this.revealSafeNeighbours(n.x, n.y, visited);
			}
		}
	}

	/* for debug */
	__log() {
	    console.log(
	        ',' + this.locations.map(function (xs) {
	            return xs.map(function (ys) {
	                return ys.mine ? 'M' : ys.nearby;
	            }).toString() + '\n';
	        }).toString()
	    );
	}
}