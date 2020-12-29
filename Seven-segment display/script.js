canvas = document.getElementById('canvas');
ctx = canvas.getContext("2d");
const numbers = ["0x7E", "0x30", "0x6D", "0x79", "0x33", "0x5B", "0x5F", "0x70", "0x7F", "0x7B"];
let timeFormatValue = 24;

let timeFormat = document.getElementById("timeFormat");
timeFormat.addEventListener("change", function(){
    timeFormatValue = parseInt(this.value);
});

function drawSegment(val, move = 0) {
    ctx.clearRect(125 + move, 30, 150, 275);
    ctx.beginPath();

    // A
    ctx.fillStyle = getColor(val, 6);
    ctx.fillRect(150 + move, 30, 100, 25);

    // B
    ctx.fillStyle = getColor(val, 5);
    ctx.fillRect(250 + move, 55, 25, 100);

    // C
    ctx.fillStyle = getColor(val, 4);
    ctx.fillRect(250 + move, 180, 25, 100);

    // D
    ctx.fillStyle = getColor(val, 3);
    ctx.fillRect(150 + move, 280, 100, 25);

    // E
    ctx.fillStyle = getColor(val, 2);
    ctx.fillRect(125 + move, 180, 25, 100);

    // F
    ctx.fillStyle = getColor(val, 1);
    ctx.fillRect(125 + move, 55, 25, 100);

    // G
    ctx.fillStyle = getColor(val, 0);
    ctx.fillRect(150 + move, 155, 100, 25);

    ctx.closePath();
}

function drawColon(start = 0) {
    ctx.clearRect(start, 30, 25, 275);
    ctx.beginPath();

    // Colon Top
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(start, 100, 25, 25);

    // Colon Bottom
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(start, 205, 25, 25);

    ctx.closePath();
}

function getColor(val, shift) {
    let a = ((val >> shift) & 1) === 1 ? 255 : 20;
    a = (a + 0x10000).toString(16).substr(-2);
    return "#ff0000" + a;
}

function rgb2hex(color) {
    let a,
        rgb = color.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s]+)?/i),
        alpha = (rgb && rgb[4] || "").trim(),
        hex = rgb ?
            (rgb[1] | 1 << 8).toString(16).slice(1) +
            (rgb[2] | 1 << 8).toString(16).slice(1) +
            (rgb[3] | 1 << 8).toString(16).slice(1) : color
    if (alpha !== "")
        a = alpha;
    else
        a = "01";
    a = Math.round(parseInt(a) * 100) / 100;
    alpha = Math.round(a * 255);
    let hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
    hex = "#" + hex + hexAlpha;
    return hex;
}

function draw() {
    let index = 0;
    setInterval(function () {
        index = (index + 1) % numbers.length;
        let date = new Date();
        let hour = date.getHours(),
            minute = date.getMinutes().toString().split(''),
            second = date.getSeconds().toString().split('');
        if(timeFormatValue === 24){
            hour = makeDoubleDigit(hour.toString().split(''));
        }else if(timeFormatValue === 12){
            hour = hour > 12 ? hour % 12 : hour;
            hour = makeDoubleDigit(hour.toString().split(''));
        }
        minute = makeDoubleDigit(minute);
        second = makeDoubleDigit(second);
        drawSegment(numbers[hour[0]]);
        drawSegment(numbers[hour[1]], 180);
        drawColon(485);
        drawSegment(numbers[minute[0]], 410);
        drawSegment(numbers[minute[1]], 590);
        drawColon(895);
        drawSegment(numbers[second[0]], 820);
        drawSegment(numbers[second[1]], 1000);
    }, 1000);
}

function makeDoubleDigit(digits) {
    return digits.length === 1 ? ["0", digits[0]] : digits;
}

draw();