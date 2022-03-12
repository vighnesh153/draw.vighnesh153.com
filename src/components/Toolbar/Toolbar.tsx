/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React, { CSSProperties } from 'react';

import { not } from '@vighnesh153/utils';
import { Color } from '../../utils';
import { RotateLeft, RotateRight, XMark } from '../../icons';
import { ModeSelector } from './ModeSelector';
import { ColorPopover } from './ColorPopover';
import { BrushThicknessPopover } from './BrushThicknessPopover';

export interface ToolbarProps {
  isUndoAvailable: () => boolean;
  isRedoAvailable: () => boolean;
  undo: () => void;
  redo: () => void;
  onClear: (color: Color) => void;
}

const ToolbarSeparator = () => <div style={{ height: 25, width: 2, backgroundColor: '#dedede' }} />;

export function Toolbar({ isUndoAvailable, isRedoAvailable, undo, redo, onClear }: ToolbarProps): JSX.Element {
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
      <ModeSelector style={baseSectionStyles} iconStyle={baseIconStyles} fontStyle={baseFontStyles} />
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <ColorPopover style={basePopoverStyles} baseFontStyles={baseFontStyles} />
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <BrushThicknessPopover style={basePopoverStyles} baseFontStyles={baseFontStyles} />
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div
          role="button"
          style={{ ...baseIconButtonStyles, ...(isUndoAvailable() ? {} : baseIconButtonDisabledStyles) }}
          aria-disabled={not(isUndoAvailable())}
          onClick={undo}
        >
          <RotateLeft style={baseIconStyles} />
        </div>
        <div style={baseFontStyles}>Undo</div>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div
          role="button"
          style={{ ...baseIconButtonStyles, ...(isRedoAvailable() ? {} : baseIconButtonDisabledStyles) }}
          aria-disabled={not(isRedoAvailable())}
          onClick={redo}
        >
          <RotateRight style={baseIconStyles} />
        </div>
        <div style={baseFontStyles}>Redo</div>
      </section>
      <ToolbarSeparator />
      <section style={baseSectionStyles}>
        <div role="button" style={baseIconButtonStyles} onClick={() => onClear(Color.White)}>
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
  backgroundColor: 'hsl(0, 0%, 100%)',
};

const baseIconButtonStyles: CSSProperties = {
  padding: 5,
  border: '3px solid',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  borderColor: Color.Gray,
  cursor: 'pointer',
};

const baseIconButtonDisabledStyles: CSSProperties = {
  opacity: 0.3,
  cursor: 'not-allowed',
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
