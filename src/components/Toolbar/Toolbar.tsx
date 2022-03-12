/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { CSSProperties } from 'react';

import { BrushThickness, Color, EventModes } from '../../utils';
import { RotateLeft, XMark } from '../../icons';
import { ModeSelector } from './ModeSelector';
import { ShowHide, useShowHide } from '../ShowHide';
import { ColorPopover } from './ColorPopover';
import { BrushThicknessPopover } from './BrushThicknessPopover';

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
          <ColorPopover style={basePopoverStyles} handleColorChange={handleColorChange} />
        </ShowHide>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div
          role="button"
          style={{
            width: 40,
            height: 40,
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
          <BrushThicknessPopover
            style={basePopoverStyles}
            handleBrushThicknessChange={handleBrushThicknessChange}
            activeColor={activeColor}
          />
        </ShowHide>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div role="button" style={baseIconContainerStyles}>
          <RotateLeft style={baseIconStyles} />
        </div>
        <div style={baseFontStyles}>Undo</div>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div role="button" style={baseIconContainerStyles}>
          <XMark style={baseIconStyles} />
        </div>
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
  width: 20,
  height: 20,
  cursor: 'pointer',
  backgroundColor: 'hsl(0, 0%, 100%)',
};

const baseIconContainerStyles: CSSProperties = {
  padding: 5,
  border: '3px solid',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  borderColor: Color.Gray,
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
