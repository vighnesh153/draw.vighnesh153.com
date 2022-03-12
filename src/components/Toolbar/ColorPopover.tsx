/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { CSSProperties } from 'react';
import { Color } from '../../utils';

export interface ColorPopoverProps {
  handleColorChange: (color: Color) => void;
  style?: CSSProperties;
}

export function ColorPopover({ style, handleColorChange }: ColorPopoverProps): JSX.Element {
  return (
    <div style={style}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {Object.values(Color).map((color) => (
          <div
            key={color}
            role="button"
            style={{
              width: 35,
              height: 35,
              border: '1px solid #dedede',
              borderRadius: '50%',
              backgroundColor: color,
              cursor: 'pointer',
            }}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
}
