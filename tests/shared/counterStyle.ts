import { createStyleSheet } from '../../src';

export const counterStyle = createStyleSheet({
  ':host': {
    display: 'flex',
    flexDirection: 'row'
  },
  span: {
    minWidth: '60px',
    textAlign: 'center'
  }
});