/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { MouseEventHandler, MutableRefObject, Ref, useEffect, useRef } from 'react';

import { CanvasHelper, Coordinates, DrawEvents, DrawLineEvent, DrawPointEvent, EventMode, FillEvent } from '../utils';
import { useToolbar } from '../contexts';
import { useEventProcessor } from '../hooks';

type State = 'idle' | 'pressed' | 'drag';

export interface CanvasProps {
  canvasRef: Ref<HTMLCanvasElement>;
  buildDrawLineEvent: (options: Omit<DrawLineEvent, 'type'>) => DrawLineEvent;
  buildFillEvent: (options: Omit<FillEvent, 'type'>) => FillEvent;
  buildDrawPointEvent: (options: Omit<DrawPointEvent, 'type'>) => DrawPointEvent;
  triggerEvents: (...events: DrawEvents[]) => void;
}

export function Canvas({ canvasRef, triggerEvents, ...builders }: CanvasProps): JSX.Element {
  const { mode, color, brushThickness } = useToolbar();
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<State>('idle');
  const canvasHelperRef = useRef<CanvasHelper>();
  const previousCoordinatesRef = useRef<Coordinates | null>(null);

  /**
   * Processes the events ❤️ 😇 🥺
   */
  useEventProcessor({ canvasHelper: canvasHelperRef });

  /**
   * Handles mousedown event's interaction with the current state
   */
  const onMouseDown: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const coordinates = { x: e.clientX, y: e.clientY };
    const previousState = stateRef.current;

    if (previousState !== 'idle') return;

    stateRef.current = 'pressed';
    previousCoordinatesRef.current = coordinates;
  };

  /**
   * Handles mousemove event's interaction with the current state
   */
  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const currentCoordinates = { x: e.clientX, y: e.clientY };
    const previousState = stateRef.current;

    if (previousState === 'idle') return;
    if (mode === EventMode.Fill) return;

    stateRef.current = 'drag';

    // trigger event
    const drawLineEvent = builders.buildDrawLineEvent({
      color,
      brushThickness,
      coordinate1: previousCoordinatesRef.current!,
      coordinate2: currentCoordinates,
    });
    if (mode === EventMode.Draw) {
      triggerEvents(drawLineEvent);
    }

    // set previous coordinates to current coordinates
    previousCoordinatesRef.current = currentCoordinates;
  };

  /**
   * Handles mouseup event's interaction with the current state
   */
  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = (e) => {
    const coordinates = { x: e.clientX, y: e.clientY };
    const previousCoordinates = previousCoordinatesRef.current!;
    const previousState = stateRef.current;
    stateRef.current = 'idle';
    previousCoordinatesRef.current = null;

    const fillEvent = builders.buildFillEvent({ color, coordinates });
    const drawPointEvent = builders.buildDrawPointEvent({ color, coordinates, brushThickness });
    const drawLineEvent = builders.buildDrawLineEvent({
      color,
      brushThickness,
      coordinate1: previousCoordinates,
      coordinate2: coordinates,
    });

    // mouse up does nothing when idle
    if (previousState === 'idle') return;

    if (previousState === 'drag') {
      if (mode === EventMode.Draw) {
        triggerEvents(drawLineEvent, drawPointEvent);
      }
      return;
    }

    if (previousState === 'pressed') {
      triggerEvents(mode === EventMode.Draw ? drawPointEvent : fillEvent);
      return;
    }

    throw new Error('We should never reach here.');
  };

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
      onMouseUp={onMouseUp}
      style={{ border: '10px solid red', width: '100%', height: '100%' }}
    >
      Your browser doesn't seem to support canvas. Please update your browser or try opening in a different browser
    </canvas>
  );
}
