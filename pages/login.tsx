import { useDrag } from '@use-gesture/react';
import React from 'react';
import Slider from '../components/slider';
import useTrackingRef from '../hooks/useTrackingRef';
import styles from '../pagesExtended/login/login.module.css';
import { XY } from '../pagesExtended/login/loginInterfaces';
import {
  cursedColor,
  randomLocation,
  updateColor,
} from '../pagesExtended/login/loginUtils';

// Curses
// 0 - Ability to drag form
// 1 - Movement on keystrokes
// 2 - Form moves on an interval
// 3 - Color changes on drag
// 4 - Spiders running around in background

export default function Login() {
  const [cursedLevel, setCursedLevel] = React.useState(0);
  const [transform, setTransform] = React.useState<XY>({ x: 0, y: 0 });
  const [color, setColor] = React.useState({ r: 0, g: 0, b: 0 });
  const [last, setLast] = React.useState<XY | null>(null);
  const [animate, setAnimate] = React.useState(false);

  const inputFocused = React.useRef(false);
  const activeRef = React.useRef(false);
  const levelRef = useTrackingRef(cursedLevel);

  const bind = useDrag(({ active, movement: [x, y], lastOffset: [x2, y2] }) => {
    activeRef.current = active;

    if (inputFocused.current) return;

    const lastX = last ? last.x : x2;
    const lastY = last ? last.y : y2;

    animate && setAnimate(false);
    active && setTransform({ x: lastX + x, y: lastY + y });
    !active && setLast({ x: lastX + x, y: lastY + y });
    levelRef.current > 2 && handleUpdateColor();
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      !activeRef.current && levelRef.current > 1 && handleRandomLocation();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2>
        Cursed Level{' '}
        <span
          className={cursedLevel === 10 ? styles.cursed : undefined}
          style={{ color: cursedColor[cursedLevel] }}
        >
          {cursedLevel}
        </span>
      </h2>
      <Slider onLevelChange={setCursedLevel} />
      <div
        className={styles['login-card']}
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px)`,
          touchAction: 'none',
          transition: animate ? '.20s ease-in-out' : undefined,
          background: `rgb(${color.r}, ${color.g}, ${color.b})`,
        }}
        {...bind()}
      >
        <header className={styles['login-header']}>Login</header>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={cursedLevel > 0 ? handleRandomLocation : undefined}
            onFocus={() => (inputFocused.current = true)}
            onBlur={() => (inputFocused.current = false)}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={cursedLevel > 0 ? handleRandomLocation : undefined}
            onFocus={() => (inputFocused.current = true)}
            onBlur={() => (inputFocused.current = false)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );

  function handleLogin(event: React.SyntheticEvent) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };

    const uName = target.username.value;
    const pWord = target.password.value;

    console.log({ uName, pWord });
  }

  function handleUpdateColor() {
    updateColor(color, setColor);
  }

  function handleRandomLocation() {
    randomLocation(setAnimate, setLast, setTransform);
  }
}
