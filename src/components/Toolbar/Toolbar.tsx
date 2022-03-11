/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

import { BrushThickness, Color, EventModes } from '@utils';
import { Fill, Pencil } from '@icons';

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
      <section className="section-mode" style={{ display: 'flex', gap: 20 }}>
        {[
          { mode: EventModes.Draw, Component: Pencil, label: 'Draw' },
          { mode: EventModes.Fill, Component: Fill, label: 'Fill' },
        ].map(({ mode, Component, label }) => (
          <div style={{ lineHeight: 0 }} aria-label={label}>
            <label
              htmlFor={mode}
              style={{ lineHeight: 0, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}
            >
              <div>
                <Component
                  style={{
                    width: 35,
                    height: 35,
                    padding: '0.2rem',
                    cursor: 'pointer',
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '3px solid',
                    borderRadius: '50%',
                    borderColor: activeMode === mode ? Color.Purple : Color.Gray,
                    fill: activeMode === mode ? Color.Purple : Color.Black,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: activeMode === mode ? Color.Purple : Color.Black,
                }}
              >
                {label}
              </div>
            </label>
            <input
              type="radio"
              name="section-mode"
              id={mode}
              value={mode}
              checked={activeMode === mode}
              style={{ display: 'none' }}
              onChange={handleUpdateMode}
            />
          </div>
        ))}
      </section>
      <ToolbarSeparator />
      <section style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', lineHeight: 0, gap: 10 }}>
        <div style={{ width: 35, height: 35, backgroundColor: activeColor, borderRadius: '50%', cursor: 'pointer' }} />
        <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Color</div>
      </section>
      <ToolbarSeparator />
      <section style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', lineHeight: 0, gap: 10 }}>
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
        <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>Size</div>
      </section>
    </section>
  );
}
