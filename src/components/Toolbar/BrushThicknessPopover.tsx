/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { CSSProperties } from 'react';
import { BrushThickness, Color } from '../../utils';

export interface BrushThicknessPopoverProps {
  style?: CSSProperties;
  handleBrushThicknessChange: (brushThickness: BrushThickness) => void;
  activeColor: Color;
}

export function BrushThicknessPopover({
  style,
  handleBrushThicknessChange,
  activeColor,
}: BrushThicknessPopoverProps): JSX.Element {
  return (
    <div style={style}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {[BrushThickness.xs, BrushThickness.sm, BrushThickness.md, BrushThickness.lg, BrushThickness.xl].map(
          (thickness) => (
            <div
              key={thickness}
              role="button"
              style={{
                width: 35,
                height: 35,
                display: 'grid',
                placeItems: 'center',
                border: '1px solid #dedede',
                borderRadius: '50%',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
              onClick={() => handleBrushThicknessChange(thickness as BrushThickness)}
            >
              <div style={{ width: thickness, height: thickness, borderRadius: '50%', backgroundColor: activeColor }} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
