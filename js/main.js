class Game {
  constructor() {
    this.boardWidth = 800;
    this.boardHeight = 600;
    this.units = `px`;
    this.player = null;
    this.obstaclesArr = []; // will store instances of the class Obstacle
    this.sound = document.getElementById("menuAudio");
  }
  start() {
    this.player = new Player();

    this.attachEventListeners();

    this.sound.play();

    startCountdown (30);

    // Create new obstacles
    setInterval(() => {
      const newObstacle = new Obstacle();
      this.obstaclesArr.push(newObstacle);
    }, 500);

    // Update obstacles
    setInterval(() => {
      this.obstaclesArr.forEach((obstacleInstance) => {
        // Move current obstacle
        obstacleInstance.moveDown();

        // Detect collision
        this.detectCollision(obstacleInstance);

        // Detect if obstacle needs to be removed
        this.removeObstacleIfOutside(obstacleInstance);
      });
    }, 20);
     function startCountdown(seconds) {
      let counter = seconds;

      const interval = setInterval(() => {
        console.log(counter);
        counter--;

        if (counter < 0) {
          clearInterval(interval);
          console.log("Finish!");
          location.href = "./finish.html";
        }
      }, 1000);
    }
  }

  attachEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") {
        this.player.moveLeft();
      } else if (event.code === "ArrowRight") {
        this.player.moveRight();
      } else if (event.code === "ArrowUp") {
        this.player.moveUp();
      } else if (event.code === "ArrowDown") {
        this.player.moveDown();
      }
    });
  }

  detectCollision(obstacleInstance) {
    if (
      obstacleInstance.positionX < this.player.positionX + this.player.width &&
      obstacleInstance.positionX + obstacleInstance.width >
        this.player.positionX &&
      obstacleInstance.positionY < this.player.positionY + this.player.height &&
      obstacleInstance.height + obstacleInstance.positionY >
        this.player.positionY
    ) {
      console.log("game over my fren");
      location.href = "./gameover.html";
    }
  }

  removeObstacleIfOutside(obstacleInstance) {
    if (obstacleInstance.positionY === 0 - obstacleInstance.height) {
      //1. remove elm from the dom
      obstacleInstance.domElement.remove();

      //2. remove from the array of obstacles
      this.obstaclesArr.shift();
    }
  }
}

class Player {
  constructor() {
    this.width = 3;
    this.height = 12;
    this.positionX = 25 - this.width / 2;
    this.positionY = 25;

    this.domElement = null; // we will store a ref. to the dom element of the player

    this.createDomElement();
  }

  createDomElement() {
    // step1: create the element
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.id = "player";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    //step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }

  moveLeft() {
    if (this.positionX > 11.5) {
      this.positionX -= 2;
      this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    } else {
      this.positionX = 11.5;
    }
  }
  moveRight() {
    if (this.positionX <= 52.5) {
      this.positionX += 2;
      this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    } else {
      this.positionX = 52.5;
    }
  }
  moveUp() {
    if (this.positionY <= 86) {
      this.positionY += 2; //modify the position
      this.domElement.style.bottom = this.positionY + "vh"; //reflect change in the css
    } else {
      this.positionY = 86;
    }
  }
  moveDown() {
    if (this.positionY > 0) {
      this.positionY -= 2; //modify the position
      this.domElement.style.bottom = this.positionY + "vh"; //reflect change in the css
    } else {
      this.positionY = 0;
    }
  }
}

class Obstacle {
  constructor() {
    this.width = 3;
    this.height = 12;
    this.positionX = 10 + Math.floor(Math.random() * 44);
    this.positionY = 100;

    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element
    this.domElement = document.createElement("div");

    // step2: add content or modify (ex. innerHTML...)
    this.domElement.className = "obstacle";
    this.domElement.style.width = this.width + "vw";
    this.domElement.style.height = this.height + "vh";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    //step3: append to the dom: `parentElm.appendChild()`
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

const game = new Game();
game.start();
