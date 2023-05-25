class Game {
  constructor() {
    this.player = null;
    this.obstaclesArr = []; // will store instances of the class Obstacle
    this.sound = document.getElementById("menuAudio");
    this.score = 0;
    this.scoreDisplay = document.getElementById("score");
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
    }, 700);

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
    }, 30);
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
        this.score -= 10;}
        {
        // if (this.score < 0) {
        //     location.href = "./gameover.html";
        //     console.log("game over!!!");
        // }
    }
  }

  removeObstacleIfOutside(obstacleInstance) {
    if (obstacleInstance.positionY === -2 - obstacleInstance.height) {
      //1. remove elm from the dom
      obstacleInstance.domElement.remove();

      //2. remove from the array of obstacles
      this.obstaclesArr.shift();
      
      this.score += 10
      const scoreDisplay = document.getElementById("score");
      scoreDisplay.textContent = `Score ${this.score}`;
    }
  }
}

class Player {
    constructor() {
        this.width = 3;
        this.height = 12;
        this.positionX = 25 - this.width / 2;
        this.positionY = 5;
    
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
    if (this.positionX > 13.5) {
      this.positionX -= 2.5;
      this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    } else {
      this.positionX = 13.5;
    }
  }
  moveRight() {
    if (this.positionX <= 49 ) {
      this.positionX += 2.5;
      this.domElement.style.left = this.positionX + "vw"; //reflect change in the css
    } else {
      this.positionX = 49;
    }
  }
  moveUp() {
    if (this.positionY <= 76) {
      this.positionY += 2.5; //modify the position
      this.domElement.style.bottom = this.positionY + "vh"; //reflect change in the css
    } else {
      this.positionY = 76;
    }
  }
  moveDown() {
    if (this.positionY > -5) {
      this.positionY -= 2.5; //modify the position
      this.domElement.style.bottom = this.positionY + "vh"; //reflect change in the css
    } else {
      this.positionY = -5;
    }
  }
}

class Obstacle {
  constructor() {
    this.width = 3;
    this.height = 12;
    this.positionX =  11.5 + Math.floor(Math.random() * 40);
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
const timer = document.getElementById("timer");
let timerInterval;
startTimer = () => {
  clearInterval(timerInterval);
  let second = 30,
    minute = 10;

  timerInterval = setInterval(function () {
    timer.classList.toggle("odd");

    timer.innerHTML = `Timer <b>${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;

    second--;

    if (second == -1) {
      minute--;
      second = 59;
    }

    if (minute == -1) {
      clearInterval(timerInterval);
      location.href = "./finish.html";
    }
  }, 1000);
};

const game = new Game();
game.start();
