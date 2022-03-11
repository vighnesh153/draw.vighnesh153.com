/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { CSSProperties } from 'react';

import { BrushThickness, Color, EventModes } from '../../utils';
import { RotateLeft, XMark } from '../../icons';
import { ModeSelector } from './ModeSelector';

export interface ToolbarProps {
  mode: EventModes;
  color: Color;
  brushThickness: BrushThickness;
  updateMode: (mode: EventModes) => void;
  updateColor: (color: Color) => void;
  updateBrushThickness: (brushThickness: BrushThickness) => void;
}

const ToolbarSeparator = () => <div style={{ height: 25, width: 2, backgroundColor: '#dedede' }} />;

export function Toolbar({
  mode: activeMode,
  color: activeColor,
  brushThickness: activeBrushThickness,
  updateMode,
}: ToolbarProps): JSX.Element {
  const handleUpdateMode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    updateMode(e.target.value as EventModes);
  };

  return (
    <section
      style={{
        position: 'absolute',
        width: `fit-content`,
        height: 70,
        margin: '0 auto',
        padding: '0 1rem',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: '#fafafa',
        border: '1px solid #dedede',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
      }}
    >
      <ModeSelector
        activeMode={activeMode}
        handleChange={handleUpdateMode}
        style={baseSectionStyles}
        iconStyle={baseIconStyles}
        fontStyle={baseFontStyles}
      />
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div style={{ width: 35, height: 35, backgroundColor: activeColor, borderRadius: '50%', cursor: 'pointer' }} />
        <div style={baseFontStyles}>Color</div>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div
          style={{
            width: 35,
            height: 35,
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: '1px solid #dedede',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              backgroundColor: activeColor,
              width: activeBrushThickness,
              height: activeBrushThickness,
              borderRadius: '50%',
            }}
          />
        </div>
        <div style={baseFontStyles}>Size</div>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <RotateLeft role="button" style={baseIconStyles} />
        <div style={baseFontStyles}>Undo</div>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <XMark role="button" style={baseIconStyles} />
        <div style={baseFontStyles}>Clear</div>
      </section>
    </section>
  );
}

const baseSectionStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  lineHeight: 0,
  gap: 10,
};

const baseIconStyles: CSSProperties = {
  width: 35,
  height: 35,
  padding: '0.2rem',
  cursor: 'pointer',
  backgroundColor: 'hsl(0, 0%, 100%)',
  border: `3px solid ${Color.Gray}`,
  borderRadius: '50%',
};

const baseFontStyles: CSSProperties = { fontSize: '0.875rem', fontWeight: 'bold' };
