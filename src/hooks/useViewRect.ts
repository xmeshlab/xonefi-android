import { useEffect, useState } from "react";

export const useViewRect = (view, parentView) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (view && parentView) {
      setTimeout(() => {
        view?.measureLayout?.(
          parentView,
          (left: number, top: number, width: number, height: number) => {
            setLeft(left);
            setTop(top);
            setWidth(width);
            setHeight(height);
          },
          () => {
            console.log("measureLayout failed");
          }
        );
      }, 0);
    }
  }, [view, parentView]);

  return {
    left,
    top,
    width,
    height,
  };
};
