import React from 'react';

function useTrackingRef(prop: any) {
  const propRef = React.useRef<any>(prop);
  propRef.current = prop;

  return propRef;
}

export default useTrackingRef;
