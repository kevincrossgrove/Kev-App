import React, { useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import styles from '../styles/slider.module.css';

function Slider({ onLevelChange }: any) {
  const [x, setX] = React.useState(0);
  const [active, setActive] = React.useState(false);

  let level = x >= 190 ? 10 : Math.floor((x / 20) % 10);

  const bind = useDrag(({ active, movement: [x], lastOffset: [x2] }) => {
    const newX = x + x2;

    newX < 0 && setX(0);
    newX > 200 && setX(200);
    newX < 200 && newX > 0 && setX(Math.round(newX));

    setActive(active);
  });

  useEffect(() => {
    onLevelChange(level);
  }, [level]);

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        <div
          className={styles.slider}
          {...bind()}
          style={{
            left: x,
            border: active ? '2px solid #00ff1a' : undefined,
            touchAction: 'none',
          }}
        ></div>
      </div>
    </div>
  );
}

export default React.memo(Slider);
