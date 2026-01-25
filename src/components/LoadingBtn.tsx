import {useEffect, useState} from "react";

const LoadingBtn = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="flex items-center justify-center">
      <button className="my-10 py-1 px-5 bg-secondary rounded w-32 flex justify-center">
        <span>Loading</span>
        <span className="w-10 text-left">{".".repeat(dotCount)}</span>
      </button>
    </span>
  );
};

export default LoadingBtn;
