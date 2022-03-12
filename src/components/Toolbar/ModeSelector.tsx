/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';

import { Color, EventModes } from '../../utils';
import { Fill, Pencil } from '../../icons';

export interface ModeSelectorProps {
  activeMode: EventModes;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  style: React.CSSProperties;
  iconStyle: React.CSSProperties;
  fontStyle: React.CSSProperties;
}

export function ModeSelector({
  activeMode,
  handleChange,
  style,
  iconStyle,
  fontStyle,
}: ModeSelectorProps): JSX.Element {
  const highlightColor = Color.Orange;

  return (
    <section style={{ ...style, flexDirection: 'row', gap: 20 }}>
      {[
        { mode: EventModes.Draw, Component: Pencil, modeTitle: 'Draw' },
        { mode: EventModes.Fill, Component: Fill, modeTitle: 'Fill' },
      ].map(({ mode, Component, modeTitle }) => (
        <div style={{ lineHeight: 0 }} aria-label={modeTitle} key={modeTitle}>
          <label
            htmlFor={mode}
            style={{ lineHeight: 0, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 10 }}
          >
            <div
              role="button"
              style={{
                padding: 5,
                border: '3px solid',
                borderRadius: '50%',
                backgroundColor: activeMode === mode ? highlightColor : 'transparent',
                borderColor: activeMode === mode ? highlightColor : Color.Gray,
                cursor: 'pointer',
              }}
            >
              <Component
                style={{
                  ...iconStyle,
                  backgroundColor: activeMode === mode ? highlightColor : 'transparent',
                  fill: activeMode === mode ? 'white' : Color.Black,
                }}
              />
            </div>
            <div
              style={{
                ...fontStyle,
                color: activeMode === mode ? highlightColor : Color.Black,
              }}
            >
              {modeTitle}
            </div>
          </label>
          <input
            type="radio"
            name="section-mode"
            id={mode}
            value={mode}
            checked={activeMode === mode}
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </div>
      ))}
    </section>
  );
}
