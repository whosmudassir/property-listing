import React, { useEffect, useState } from "react";

const useDebounce = (val, delay) => {
  const [debounceValue, setDebounceValue] = useState(val);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceValue(val);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [val, delay]);
  return debounceValue;
};

export default useDebounce;
