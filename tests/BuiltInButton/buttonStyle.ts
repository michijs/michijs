import { createStyleSheet } from 'src';

export const buttonStyle = createStyleSheet({
  'button[is="built-in-button"]': {
    display: 'block',
    backgroundColor: 'orange',
    width: 'fit-content',
    height: 'fit-content',
    minWidth: '40px',
    minHeight: '40px',
  },
});