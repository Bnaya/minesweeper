/*
    shuffle array in-place,     Fisher-Yates Shuffle
    taken from http://stackoverflow.com/a/6274398/711152, small midification made

 */
export function arrayShuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return true;
}

export function findNeighbours ({x, y}, width, height) {
    return [
        {x: x - 1, y: y},
        {x: x - 1, y: y - 1},
        {x, y: y - 1},
        {x: x + 1, y: y - 1},
        {x: x + 1, y},
        {x: x + 1, y: y + 1},
        {x: x, y: y + 1},
        {x: x - 1, y: y + 1}
    ].filter(function (pl) {
        return (pl.x >= 0 && pl.x < width) && (pl.y >= 0 && pl.y < height);
    });
}

export function indexToXY(index, matrixWidth) {
    return {
        x: index % matrixWidth,
        y: Math.floor(index / matrixWidth)
    };
}