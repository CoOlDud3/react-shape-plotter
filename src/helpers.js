export default function helpers() {

}

export function isValidCoord(coord) {
    try {
        coord = parseInt(coord, 10);
        return coord >= 0 && coord <= 250;
    } catch (e) {
        return false;
    }
}

export function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function parseInput(input) {
    let result = {
        errors: [],
        shapes: []
    };

    let inputLines = input.toLowerCase().split('\n');
    for (let inputLine of inputLines) {
        let shape = parseShape(inputLine, inputLines.indexOf(inputLine));
        if (typeof shape === 'object') {
            result.shapes.push(shape);
        } else if (typeof shape === 'string') {
            result.errors.push(shape);
        }
    }

    return result;
}

export function parseShape(inputLine, index) {
    let shape;
    let line = index + 1;

    if (inputLine.length > 0) {
        let shapeType = inputLine[0];
        let shapeCoords;

        switch (shapeType) {
            case 'l':
                shapeCoords = inputLine.substr(1, inputLine.length - 1).trim().split(' ');

                shape = {
                    name: 'line',
                    pairs: []
                };

                if (shapeCoords.length === 2) {
                    for (let shapeCoord of shapeCoords) {
                        let shapeCoordIndex = shapeCoords.indexOf(shapeCoord);
                        let shapeCoordPair = shapeCoord.split(',');
                        if (shapeCoord.includes(',') && shapeCoordPair.length === 2) {
                            if (!isValidCoord(shapeCoordPair[0])) {
                                shape = 'Invalid X coordinate provided at coordinate pair index: ' + shapeCoordIndex + ' at line: ' + line;
                                break;
                            } else if (!isValidCoord(shapeCoordPair[1])) {
                                shape = 'Invalid Y coordinate provided at coordinate pair index: ' + shapeCoordIndex + ' at line: ' + line;
                                break;
                            } else {
                                shape.pairs.push({
                                    x: shapeCoordPair[0],
                                    y: shapeCoordPair[1]
                                });
                            }
                        } else {
                            shape = 'Invalid coordinate provided at index: ' + shapeCoordIndex + ' at line: ' + line;
                            break;
                        }
                    }
                } else {
                    shape = 'Only 2 coordinate pairs are allowed at line: ' + line;
                    break;
                }
                break;
            case 'r':
                shapeCoords = inputLine.substr(1, inputLine.length - 1).trim().split(' ');

                if (shapeCoords.length === 4) {
                    if (!isValidCoord(shapeCoords[0]))
                        shape = 'Wrong X value at line: ' + line;
                    else if (!isValidCoord(shapeCoords[1]))
                        shape = 'Wrong Y value at line: ' + line;
                    else if (!isValidCoord(shapeCoords[2]))
                        shape = 'Wrong Width value at line: ' + line;
                    else if (!isValidCoord(shapeCoords[3]))
                        shape = 'Wrong Height value at line: ' + line;
                    else
                        shape = {
                            name: 'rectangle',
                            x: shapeCoords[0],
                            y: shapeCoords[1],
                            w: shapeCoords[2],
                            h: shapeCoords[3]
                        };
                } else {
                    shape = 'Wrong coordinate format provided at line: ' + line;
                }
                break;
            case 'c':
                shapeCoords = inputLine.substr(1, inputLine.length - 1).trim().split(' ');
                if (shapeCoords.length === 3) {
                    if (!isValidCoord(shapeCoords[0]))
                        shape = 'Wrong X value at line: ' + line;
                    else if (!isValidCoord(shapeCoords[1]))
                        shape = 'Wrong Y value at line: ' + line;
                    else if (!isValidCoord(shapeCoords[2]))
                        shape = 'Wrong Radius value at line: ' + line;
                    else
                        shape = {
                            name: 'circle',
                            x: shapeCoords[0],
                            y: shapeCoords[1],
                            r: shapeCoords[2],
                        };
                } else {
                    shape = 'Wrong coordinate format provided at line: ' + line;
                }
                break;
            case 'p':
                shapeCoords = inputLine.substr(1, inputLine.length - 1).trim().split(' ');

                shape = {
                    name: 'polygon',
                    pairs: []
                };

                for (let shapeCoord of shapeCoords) {
                    let shapeCoordIndex = shapeCoords.indexOf(shapeCoord);
                    let shapeCoordPair = shapeCoord.split(',');
                    if (shapeCoord.includes(',') && shapeCoordPair.length === 2) {
                        if (!isValidCoord(shapeCoordPair[0])) {
                            shape = 'Invalid X coordinate provided at coordinate pair index: ' + shapeCoordIndex + ' at line: ' + line;
                            break;
                        } else if (!isValidCoord(shapeCoordPair[1])) {
                            shape = 'Invalid Y coordinate provided at coordinate pair index: ' + shapeCoordIndex + ' at line: ' + line;
                            break;
                        } else {
                            shape.pairs.push({
                                x: shapeCoordPair[0],
                                y: shapeCoordPair[1]
                            });
                        }
                    } else {
                        shape = 'Invalid coordinate provided at index: ' + shapeCoordIndex + ' at line: ' + line;
                        break;
                    }
                }
                break;
            default:
                shape = 'Invalid shape letter at line: ' + line;
                break;
        }
    }

    return shape;
}