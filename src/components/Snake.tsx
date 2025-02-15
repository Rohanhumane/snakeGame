import { Container, Button, Row } from "react-bootstrap";
import classes from "./Snake.module.css";
import { useState, useRef, useEffect } from "react";
import {
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
  APPLEGENTER,
} from "../util/Constant";
import "../App.css";

const Snake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<number[][]>(SNAKE_START);
  const [apple, setApple] = useState<number[]>(APPLE_START);
  const [dir, setDir] = useState<number[]>([0, -1]);
  const [speed, setSpeed] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // useInterval(() => {
  //   speed && gameLoop();
  // }, speed);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeydown(e);
    });
  }, []);

  const createApple = () => {
    const [appleX, appleY] = APPLEGENTER();
    console.log(appleX, appleY, window.innerWidth, window.innerHeight);
    return [appleX, appleY];
  };

  const endGame = () => {
    setGameOver(true);
    setSpeed(null);
  };

  const startGame = () => {
    console.log("start");
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir(DIRECTIONS[38]);
    setGameOver(false);
    setSpeed(SPEED);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === 38) {
      setDir(DIRECTIONS[38]);
    }
    if (e.keyCode === 37) {
      setDir(DIRECTIONS[37]);
    }
    if (e.keyCode === 39) {
      setDir(DIRECTIONS[39]);
    }
    if (e.keyCode === 40) {
      setDir(DIRECTIONS[40]);
    }
    return;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const startGame = () => {
      console.log("start");
      setSnake(SNAKE_START);
      setApple(APPLE_START);
      setDir(DIRECTIONS[38]);
      setGameOver(false);
      setSpeed(SPEED);
    };
    const resizer = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizer();

    window.addEventListener("resize", resizer);

    return () => {
      window.removeEventListener("resize", resizer);
    };
  }, [snake, apple, setGameOver]);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    context?.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (context) {
      context.fillStyle = "pink";
      context.lineWidth = 0.04;
      snake.forEach(([x, y]) => {
        context.strokeStyle = "blue";
        context.fillRect(x, y, 1, 1);
        context.strokeRect(x, y, 1, 1);
      });
      context.strokeStyle = "black";
      context.lineWidth = 0.04;
      context.fillStyle = "red";
      context.fillRect(apple[0], apple[1], 1, 1);
      context.strokeRect(apple[0], apple[1], 1, 1);
    }
  }, [snake, apple, gameOver]);

  useEffect(() => {
    const checkCollision = (
      snakeHead: number[],
      snakes: number[][] = snake
    ) => {
      if (
        snakeHead[0] * SCALE > window.innerWidth ||
        snakeHead[1] * SCALE > window.innerHeight ||
        snakeHead[0] < 0 ||
        snakeHead[1] < 0
      ) {
        console.log("snake head");
        return true;
      }
      for (const part of snakes) {
        if (snakeHead[0] === part[0] && snakeHead[1] === part[1]) return true;
      }
      return false;
    };

    const checkAppleCollision = (snakes: number[][]) => {
      if (apple[0] === snakes[0][0] && apple[1] === snakes[0][1]) {
        let newApple = createApple();
        setSpeed((s) => (s ? s - 10 : null));
        console.log("speed", speed);
        while (checkCollision(newApple, snakes)) {
          newApple = createApple();
        }
        setApple(newApple);

        return true;
      }
      return false;
    };

    const gameLoop = () => {
      const snakeCopy = JSON.parse(JSON.stringify(snake));
      const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
      snakeCopy.unshift(newSnakeHead);

      // console.log(newSnakeHead);
      if (checkCollision(newSnakeHead)) endGame();
      if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
      setSnake(snakeCopy);
    };

    if (speed !== null) {
      const id = setInterval(() => gameLoop(), speed);
      return () => clearInterval(id);
    }
  }, [dir, snake, gameOver, speed, apple]);

  return (
    <Row>
      <Container className={classes.container}>
        <Button onClick={() => startGame()}>StartGame</Button>
      </Container>
      {gameOver && <h1>GameOver!</h1>}
      <canvas
        ref={canvasRef}
        className="canvas"
        width={`${window.innerWidth}px`}
        height={`${window.innerHeight}px`}
      ></canvas>
    </Row>
  );
};

export default Snake;
