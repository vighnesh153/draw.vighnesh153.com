/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CanvasHelper } from "./CanvasHelper";
import { debounce } from "@vighnesh153/utils";

type State = "idle" | "mousedown" | "drag";
type Coordinate = { x: number; y: number };

export function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<State>("idle");
  const isMouseDownRef = useRef<boolean>(false);
  const canvasHelperRef = useRef<CanvasHelper>();
  const coordinates = useRef<Coordinate[]>([]);

  const drawLine = useCallback((coordinates: Coordinate[]) => {
    if (!canvasHelperRef.current) return;
    if (coordinates.length < 2) return;

    const length = coordinates.length;
    const c1 = coordinates[length - 2];
    const c2 = coordinates[length - 1];

    console.log(coordinates.length);

    canvasHelperRef.current!.drawLine(c1.x, c1.y, c2.x, c2.y, 3, "red");
  }, []);

  const onMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    isMouseDownRef.current = true;
    stateRef.current = "mousedown";
  };

  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    if (!["mousedown", "drag"].includes(stateRef.current)) return;

    stateRef.current = "drag";
    coordinates.current.push({
      x: e.clientX,
      y: e.clientY,
    });
    drawLine(coordinates.current);
  };

  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = (e) => {
    isMouseDownRef.current = false;
    stateRef.current = "idle";
    coordinates.current = [];
  };

  useEffect(() => {
    canvasHelperRef.current = new CanvasHelper(canvasRef.current!);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{ border: "10px solid red", width: "100%", height: "100%" }}
    >
      Your browser doesn't seem to support canvas.
    </canvas>
  );
}
