const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

rl.on('line', (l) => {
    input.push(l);
});

rl.on('close', () => {
    main(input);
    process.exit();
});