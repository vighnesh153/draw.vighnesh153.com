/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { CSSProperties } from 'react';

import { BrushThickness, Color, EventModes } from '../../utils';
import { RotateLeft, XMark } from '../../icons';
import { ModeSelector } from './ModeSelector';
import { ShowHide, useShowHide } from '../ShowHide';

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
  updateColor,
  updateBrushThickness,
}: ToolbarProps): JSX.Element {
  const { show: showColorPopover, toggleShow: toggleColorPopover } = useShowHide();
  const { show: showBrushThicknessPopover, toggleShow: toggleBrushThicknessPopover } = useShowHide();

  const handleUpdateMode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    updateMode(e.target.value as EventModes);
  };

  const handleColorChange = (color: string) => {
    updateColor(color as Color);
    toggleColorPopover();
  };

  const handleBrushThicknessChange = (thickness: BrushThickness) => {
    updateBrushThickness(thickness);
    toggleBrushThicknessPopover();
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
        <div
          role="button"
          style={{ width: 35, height: 35, backgroundColor: activeColor, borderRadius: '50%', cursor: 'pointer' }}
          onClick={() => toggleColorPopover()}
        />
        <div style={baseFontStyles}>Color</div>
        <ShowHide show={showColorPopover}>
          <div style={basePopoverStyles}>
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
        </ShowHide>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div
          role="button"
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
          onClick={() => toggleBrushThicknessPopover()}
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
        <ShowHide show={showBrushThicknessPopover}>
          <div style={basePopoverStyles}>
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
                    <div
                      style={{ width: thickness, height: thickness, borderRadius: '50%', backgroundColor: activeColor }}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </ShowHide>
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
  position: 'relative',
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

const basePopoverStyles: CSSProperties = {
  width: 'max-content',
  maxWidth: 300,
  padding: '0.5rem',
  position: 'absolute',
  top: 60,
  backgroundColor: 'hsla(0, 0%, 98%, 0.95)',
  border: '1px solid #dedede',
  borderRadius: 5,
  lineHeight: 1,
};
