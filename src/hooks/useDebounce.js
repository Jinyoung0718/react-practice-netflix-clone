import React, { useState, useEffect } from "react";

// 디바운스 기능을 구현

export const useDebounce = (value, delay) => {
  const [debounceValue, setdebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setdebounceValue(value);
    }, delay);

    /*
    setTimeout 함수를 사용하여 delay 시간이 경과한 후에 
    setDebounceValue(value)를 실행합니다.
    즉, value 값을 delay 시간 이후에 debounceValue에 설정합니다.
    */

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value나 delay가 변경될 때마다 새로운 타이머를 설정하고, 변경되지 않으면 타이머를 클리어합니다.

  return debounceValue;
};
