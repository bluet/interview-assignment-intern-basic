#!/usr/bin/node
let world = [
    ['□', '■', '□', '■', '■', '■', '□', '□', '■', '■'],
    ['□', '■', '■', '■', '■', '□', '□', '□', '■', '■'],
    ['■', '□', '□', '□', '■', '□', '■', '■', '□', '■'],
    ['■', '■', '■', '□', '□', '□', '□', '□', '□', '■'],
    ['□', '□', '■', '■', '□', '■', '■', '□', '□', '□'],
    ['□', '□', '□', '□', '■', '□', '□', '□', '■', '□'],
    ['■', '□', '□', '□', '□', '■', '■', '■', '□', '□'],
    ['■', '□', '□', '■', '□', '□', '■', '□', '□', '□'],
    ['□', '□', '□', '■', '□', '■', '□', '□', '□', '■'],
    ['■', '■', '□', '■', '■', '□', '■', '■', '■', '■']]

const compare_with_the_world = (a) =>
    (b) => a.every((ele, index) => 
        ele.toString() === b[index].toString())

const is_two_world_same = (a, b) =>
    compare_with_the_world(a)(b)

const sleep = (ms) => 
    new Promise(resolve => setTimeout(resolve, ms))

const get_neighbors_amount = (world, x, y) => {
    let neighbors = 0
    const neighbor_dir = [[0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]]

    neighbor_dir.forEach((dir) => {
        if (x + dir[0] >= 0 && x + dir[0] <= 9)     // if x-axis not beyond world
            if (y + dir[1] >= 0 && y + dir[1] <= 9) // if y-axis not beyond world
                if (world[x + dir[0]][y + dir[1]] === '■')
                    neighbors += 1
    })
    return neighbors
}

const update_world = (world) => {
    let next_world = Array.from(Array(10), () => Array(10).fill(-1))
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let neighbors = get_neighbors_amount(world, y, x)
            if (neighbors === 0 || neighbors === 1 || neighbors >= 4) {
                // this position next round will die
                next_world[y][x] = '□'
            } else if (neighbors === 2) {
                // keep cell status
                next_world[y][x] = world[y][x]
            } else if (neighbors === 3) {
                // this position next round will alive
                next_world[y][x] = '■'
            }
        }
    }

    return next_world
}

const print_world = (world) => {
    world.forEach(row => console.log(row.toString()))
    console.log()
}

const main = async () => {
    let next_world
    while (true) {
        print_world(world)
        next_world = update_world(world)
        if (is_two_world_same(world, next_world))
            break
        world = next_world
        await sleep(1000)
    }
}

main()