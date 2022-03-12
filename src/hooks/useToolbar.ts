/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */
import { useReducer } from 'react';
import { BrushThickness, Color, EventModes } from '../utils';

export type ToolbarState = {
  mode: EventModes;
  brushThickness: BrushThickness;
  color: Color;
};

const reducer = (state: ToolbarState, updates: Partial<ToolbarState>): ToolbarState => {
  return { ...state, ...updates };
};

export const useToolbar = () => {
  const [{ mode, brushThickness, color }, setState] = useReducer(reducer, {
    mode: EventModes.Draw,
    brushThickness: BrushThickness.sm,
    color: Color.Black,
  });

  const updateMode = (mode: EventModes) => {
    setState({ mode });
  };

  const updateColor = (color: Color) => {
    setState({ color });
  };

  const updateBrushThickness = (brushThickness: BrushThickness) => {
    setState({
      mode: EventModes.Draw,
      brushThickness,
    });
  };

  return { mode, brushThickness, color, updateMode, updateColor, updateBrushThickness };
};
