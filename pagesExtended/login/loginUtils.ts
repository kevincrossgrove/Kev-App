import { Color, XY } from './loginInterfaces';
import { Dispatch, SetStateAction } from 'react';

export function randomLocation(
  setAnimate: Dispatch<SetStateAction<boolean>>,
  setLast: Dispatch<SetStateAction<XY | null>>,
  setTransform: Dispatch<SetStateAction<XY>>
) {
  let newX = Math.floor(Math.random() * 300) + 1;
  let newY = Math.floor(Math.random() * 600) + 1;
  const boolX = Math.random() >= 0.5;
  const boolY = Math.random() >= 0.5;

  if (!boolX) {
    newX = 0 - newX;
  }

  if (!boolY) {
    newY = 0 - newY;
  }

  setAnimate(true);
  setLast({ x: newX, y: newY });
  setTransform({ x: newX, y: newY });
}

export function updateColor(color: Color, setColor: Dispatch<SetStateAction<Color>>) {
  let r = color.r;
  let g = color.g;
  let b = color.b;

  if (r < 255 && g <= 0 && b <= 0) {
    r += 2;
    return setColor({ r, g, b });
  }

  if (g < 255 && b <= 0) {
    g += 2;
    return setColor({ r, g, b });
  }

  if (b < 255 && r > 0 && g > 0) {
    b += 2;
    return setColor({ r, g, b });
  }

  if (b >= 255 && r > 0) {
    r -= 2;
    return setColor({ r, g, b });
  }

  if (b >= 255 && g > 0) {
    g -= 2;
    return setColor({ r, g, b });
  }

  if (r <= 0 && g <= 0) {
    b -= 2;
    return setColor({ r, g, b });
  }
}

export const cursedColor: { [key: number]: string } = {
  0: '#1eff00',
  1: '#9dff00',
  2: '#c8fa12',
  3: '#faee12',
  4: '#fab412',
  5: '#fa9d12',
  6: '#fa6f12',
  7: '#fa3512',
  8: '#ff0000',
  9: '#860000',
  10: '#ff0000',
};
