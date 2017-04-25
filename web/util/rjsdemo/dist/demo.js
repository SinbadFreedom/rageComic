main();

function main() {
    colorjoe.hsl('hslPicker', '#113c38', [
        'alpha',
        'currentColor',
        ['fields', {space: 'HSLA', limit: 100}],
        ['fields', {space: 'CMYKA', limit: 100}],
        'hex'
    ]);
}