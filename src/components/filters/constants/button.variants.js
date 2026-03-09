import { css } from 'styled-components';

export const BUTTON_VARIANTS = {
  apply: css`
    color: #83bf46;
    border-color: #83bf46;

    &:hover,
    &:active {
      background-color: #83bf46;
      color: #f5f5f5;
    }

    &:focus-visible {
      outline: 2px solid #83bf46;
      outline-offset: 2px;
    }
  `,
  reset: css`
    color: #ff5152;
    border-color: #ff5152;

    &:hover,
    &:active {
      background-color: #ff5152;
      color: #f5f5f5;
    }

    &:focus-visible {
      outline: 2px solid #ff5152;
      outline-offset: 2px;
    }
  `
};
