//@ts-check

/** @type { HTMLCanvasElement } */
//@ts-ignore This is an HTML Canvas
const CANVAS = document.getElementById("game-canvas");

/** @type { CanvasRenderingContext2D } */
//@ts-ignore is not null
const CTX = CANVAS.getContext("2d");

// const HEIGHT = 600;
// const WIDTH = 1300;

CANVAS.height = window.innerHeight;
CANVAS.width = window.innerWidth;

class Box {
	/**
	 *
	 * @param {*} x
	 * @param {*} y
	 * @param {*} color
	 */

	constructor(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;

		this.speed = 1;
		this.width = 50;
		this.height = this.width;

		this.xDirection = 1;
		this.yDirection = 1;
	}

	draw() {
		CTX.fillStyle = this.color;

		CTX.fillRect(this.x, this.y, this.width, this.height);
	}

	update() {
		let top = this.y;
		let bottom = this.y + this.width;
		let left = this.x;
		let right = this.x + this.height;

		if (top < 0) {
			// colliding with top
			this.yDirection = 1;
			this.y = 0;
		} else if (bottom > CANVAS.height) {
			// colliding with bottom
			this.yDirection = -1;
			this.y = CANVAS.height - this.height;
		}

		if (left < 0) {
			// colliding with left
			this.xDirection = 1;
			this.x;
		} else if (right > CANVAS.width) {
			// colliding with right
			this.xDirection = -1;
			this.x = CANVAS.width - this.width;
		}

		this.x += this.xDirection * this.speed;
		this.y += this.yDirection * this.speed;
	}
}

// // class Circle {
// 	constructor(x, y, color) {
// 		this.x = x;
// 		this.y = y;
// 		this.color = color;

// 		this.speed = 10;
// 		this.width = 50;
// 		this.height = this.width;

// 		this.xDirection = 1;
// 		this.yDirection = 1;
// 	}

// 	draw() {
// 		CTX.beginPath();
// 		CTX.arc(60, 60, 50, 0, 2 * Math.PI, false);
// 		CTX.fill();
// 	}

// 	update() {
// 		let top = this.y;
// 		let bottom = this.y + this.width;
// 		let left = this.x;
// 		let right = this.x + this.height;

// 		if (top < 0) {
// 			// colliding with top
// 			this.yDirection = 1;
// 		} else if (bottom > CANVAS.height) {
// 			// colliding with bottom
// 			this.yDirection = -1;
// 		}

// 		if (left < 0) {
// 			// colliding with left
// 			this.xDirection = 1;
// 		} else if (right > CANVAS.width) {
// 			// colliding with right
// 			this.xDirection = -1;
// 		}

// 		this.x += this.xDirection * this.speed;
// 		this.y += this.yDirection * this.speed;
// 	}
// // }

/** @type { Box[] } */
let boxes = [];

let circles = [];

let colors = ["black", "green", "blue", "purple", "gray"];
CTX.globalAlpha * 3;
for (let i = 0; i <= 5000; i++) {
	let color = colors[Math.floor(Math.random() * colors.length)];
	let box = new Box(CANVAS.width / 2, CANVAS.height / 2, color);
	box.width = 10;
	box.height = 10;

	box.x = Math.random() * (CANVAS.width - 100);
	box.y = Math.random() * (CANVAS.height - 100);
	box.speed = Math.random() * 1 + 0.1;
	boxes.push(box);
}

let currentTimestamp = 0;


/**
 * 
 * @param {*} timestamp 
 */ 
function drawLoop(timestamp) {
		CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

	boxes.forEach((n) => {
		n.draw();
		n.update();
	});


	// console.log(elapsedTime);
	requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);

function onResize() {
	CANVAS.height = window.innerHeight;
	CANVAS.width = window.innerWidth;

	// console.log(CANVAS.height, CANVAS.width)
}

window.addEventListener("resize", onResize);
