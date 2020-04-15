#!/usr/bin/node
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

const get_stdin = (message) => {
    return new Promise((reslove) => {
        rl.question(message, (answer) => {
            reslove(answer)
        })
    })
}

const number_in_same_position = (arr) =>
    (ele, index) => ele === arr[index]

const number_in_diff_position = (arr) =>
    (ele, index) => arr.includes(ele) && arr[index] !== ele

const get_tip = (answer, guess) => {
    const answer_arr = Array.from(answer)
    const guess_arr = Array.from(guess)
    const position_isSame_with_gruess = number_in_same_position(guess_arr)
    const position_notSame_with_gruess = number_in_diff_position(guess_arr)
    const As = answer_arr.filter(position_isSame_with_gruess).length
    const Bs = answer_arr.filter(position_notSame_with_gruess).length
    return `${As}A${Bs}B`
}

const start_game = async (answer, pool) => {
    let times = 0
    let game_running = true
    while (game_running) {
        let user_guess = await get_stdin('Please input 4 number (q: quit)...')
        if (user_guess !== 'q') {
            if (pool.includes(user_guess)) {
                times += 1
                let tip = get_tip(user_guess, answer)
                console.log(`${user_guess} -> ${tip} | ${times}`)
                if (tip === '4A0B') {
                    console.log(`You Win! The answer is ${user_guess}, You took ${times} times.`)
                    game_running = false
                    rl.close()
                }
            } else {
                console.log('Your input is invalid.')
            }
        } else {
            game_running = false
            rl.close()
        }
    }
}

const pick_random_element = (pool) =>
    pool[[Math.floor(Math.random() * pool.length)]]

const create_random_pool = (range) => {
    return Array.from(Array(range).keys())  //[0, 1, 2...]
        .map(x => x.toString())             //['0', '1', '2', '3'...]
        .map(x => x.padStart(4, '0'))       //['0000', '0001', '0002'...]
        .filter(x => new Set(x).size === 4) //['0123', '0124', '0125'...]
}

const main = () => {
    const pool = create_random_pool(9999)
    const answer = pick_random_element(pool)
    start_game(answer, pool)
}

main()
