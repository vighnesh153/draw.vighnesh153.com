/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { MouseEventHandler, MutableRefObject, Ref, useEffect, useRef } from 'react';
import { BrushThickness, CanvasHelper, Color, EventModes } from '../utils';
import { OnClickDrawOptions, OnClickFillOptions, OnDragDrawOptions } from '../hooks';

type State = 'idle' | 'pressed' | 'drag';
type Coordinate = { x: number; y: number };

export interface CanvasProps {
  mode: EventModes;
  color: Color;
  brushThickness: BrushThickness;
  canvasRef: Ref<HTMLCanvasElement>;
  onClickDraw: (options: OnClickDrawOptions) => void;
  onClickFill: (options: OnClickFillOptions) => void;
  onDragDraw: (options: OnDragDrawOptions) => void;
}

export function Canvas({ mode, color, brushThickness, canvasRef, ...actions }: CanvasProps): JSX.Element {
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<State>('idle');
  const canvasHelperRef = useRef<CanvasHelper>();
  const coordinatesRef = useRef<Coordinate[]>([]);

  /**
   * Handles mousedown event's interaction with the current state
   */
  const onMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const coordinates = { x: e.clientX, y: e.clientY };
    const previousState = stateRef.current;
    const dragCoordinates = coordinatesRef.current;
    stateRef.current = 'pressed';

    if (previousState !== 'idle') return;

    dragCoordinates.push(coordinates);
  };

  /**
   * Handles mousemove event's interaction with the current state
   */
  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const coordinates = { x: e.clientX, y: e.clientY };
    const previousState = stateRef.current;
    const dragCoordinates = coordinatesRef.current;
    stateRef.current = 'drag';
    dragCoordinates.push(coordinates);

    if (previousState === 'idle') return;
    if (mode === 'fill') return;

    actions.onDragDraw({
      color,
      brushThickness,
      allCoordinates: dragCoordinates,
      replacePreviousDragEvent: previousState === 'drag',
    });
  };

  /**
   * Handles mouseup event's interaction with the current state
   */
  useEffect(() => {
    const onMouseUp = (e: MouseEvent) => {
      const coordinates = { x: e.clientX, y: e.clientY };
      const previousState = stateRef.current;
      const previousDragCoordinates = coordinatesRef.current;
      stateRef.current = 'idle';
      coordinatesRef.current = [];

      // mouse up does nothing when idle
      if (previousState === 'idle') return;

      if (previousState === 'drag') {
        actions.onDragDraw({
          color,
          brushThickness,
          allCoordinates: [...previousDragCoordinates, coordinates],
          replacePreviousDragEvent: previousDragCoordinates.length > 0,
        });
        return;
      }

      // Previous state was "pressed"

      if (mode === 'draw') {
        actions.onClickDraw({ color, brushThickness, coordinates });
      } else {
        actions.onClickFill({ color, coordinates });
      }
    };

    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, [color, brushThickness, mode]);

  useEffect(() => {
    canvasHelperRef.current = new CanvasHelper(internalCanvasRef.current!);
  }, []);

  return (
    <canvas
      ref={(element) => {
        (internalCanvasRef as MutableRefObject<HTMLCanvasElement>).current = element!;
        if (typeof canvasRef === 'function') {
          canvasRef(element);
        } else {
          // @ts-ignore
          canvasRef!.current = element!;
        }
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      style={{ border: '10px solid red', width: '100%', height: '100%' }}
    >
      Your browser doesn't seem to support canvas. Please update your browser or try opening in a different browser
    </canvas>
  );
}
