
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = { 
	x: canvas.width / 2,
	y: canvas.height - 50,
	width: 50,
	height: 10,
	speed: 10
};
const fallingObjects = [];
const keys = {};
let score = 0;

// Create a falling object
function createFallingObject() {
	const size = Math.random() * 20 + 10;
	fallingObjects.push({
		x: Math.random() * canvas.width,
		y: -size,
		size: size,
		speed: Math.random() * 3 + 2,
	});
}

// Handle player movement
function movePlayer() {
	if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
	if (keys["ArrowRight"] && player.x + player.width < canvas.width) player.x += player.speed;
}

function update() {
	fallingObjects.forEach((obj, index) => {
		obj.y += obj.speed;

		// Check if the object hits the platform
		if (
			obj.y + obj.size > player.y && // Ball reaches the player's y position
			obj.x + obj.size > player.x && // Ball's x overlaps the player
			obj.x < player.x + player.width
		) {
			score++; // Increment score
			fallingObjects.splice(index, 1); // Remove the object
		}

		// Remove the object if it falls off the screen
		if (obj.y > canvas.height) {
			fallingObjects.splice(index, 1);
		}
	});
}


// Draw the game
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw player
	ctx.fillStyle = "cyan";
	ctx.fillRect(player.x, player.y, player.width, player.height);

	// Draw falling objects
	fallingObjects.forEach((obj) => {
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	});

	// Draw score
	ctx.font = "20px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + score, 10, 30);
}

// Game loop
function gameLoop() {
	movePlayer();
	update();
	draw();
	requestAnimationFrame(gameLoop);
}

// Event listeners
window.addEventListener("keydown", (e) => (keys[e.key] = true));
window.addEventListener("keyup", (e) => (keys[e.key] = false));

setInterval(createFallingObject, 1000);
gameLoop();