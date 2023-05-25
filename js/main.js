class Game {
  constructor() {
    this.player = null;
    this.obstaclesArr = []; // will store instances of the class Obstacle
    this.sound = document.getElementById("menuAudio");
  }
  start() {
    this.player = new Player();

    this.attachEventListeners();

    this.sound.play();

    startTimer();

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
    this.width = null;
    this.height = null;
    this.positionX = 10 - this.width;
    this.positionY = -10;

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
    if (this.positionX > 2) {
      this.positionX -= 2;
      this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    } else {
      this.positionX = 2;
    }
  }
  moveRight() {
    if (this.positionX <= 36) {
      this.positionX += 2;
      this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    } else {
      this.positionX = 36;
    }
  }
  moveUp() {
    if (this.positionY <= 68) {
      this.positionY += 2; //modify the position
      this.domElement.style.bottom = this.positionY + "vh"; //reflect change in the css
    } else {
      this.positionY = 68;
    }
  }
  moveDown() {
    if (this.positionY > -10) {
      this.positionY -= 2; //modify the position
      this.domElement.style.bottom = this.positionY + "vh"; //reflect change in the css
    } else {
      this.positionY = -10;
    }
  }
}

class Obstacle {
  constructor() {
    this.width = null;
    this.height = null;
    this.positionX = 2 + Math.floor(Math.random() * 34);
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
const timer = document.getElementById('timer');
let timerInterval;
startTimer = () => {
    clearInterval(timerInterval);
    let second = 0,
        minute = 1;
      
    timerInterval = setInterval(function () {
        timer.classList.toggle('odd');

        timer.innerHTML =
            (minute < 10 ? '0' + minute : minute) +
            ':' +
            (second < 10 ? '0' + second : second);

        second--;

        if (second == -1) {
            minute--;
            second = 59;
        }

        if (minute == -1) {
            clearInterval(timerInterval);
            alert("Countdown complete!");
        }
    }, 1000);
};

const game = new Game();
game.start();
