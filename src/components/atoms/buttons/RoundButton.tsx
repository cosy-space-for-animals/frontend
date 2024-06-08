import { SerializedStyles, css } from '@emotion/react';

type Type = 'filled' | 'outline' | 'white' | 'default';

interface IRoundButtonProps {
  type: Type;
  disabled?: boolean;
  children: React.ReactNode;
}

const styles: { [key in Type]: SerializedStyles } = {
  filled: css`
    background: var(--main-red-500);
    color: var(--grey-0);
    &:hover:enabled {
      filter: brightness(90%);
    }
    &:disabled {
      background: var(--grey-300);
    }
  `,
  outline: css`
    background: transparent;
    color: var(--grey-700);
    border: 1px solid var(--grey-400);
    &:hover:enabled {
      filter: brightness(90%);
    }
    &:disabled {
      color: var(--grey-400);
      border: 1px solid var(--grey-200);
    }
  `,
  white: css`
    color: var(--grey-0);
    border: 1px solid var(--grey-0);
    background: rgba(255, 255, 255, 0.1);
    &:hover:enabled {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid var(--grey-0);
      color: var(--grey-0);
    }
    &:disabled {
      opacity: 50%;
    }
  `,
  default: css`
    background: var(--grey-200);
    color: var(--grey-700);
    &:hover:enabled {
      filter: brightness(90%);
    }
    // &:disabled {
    // TODO: state3?
    // }
  `,
};

export default function RoundButton({
  type = 'default',
  disabled = false,
  children,
}: IRoundButtonProps) {
  return (
    <button
      disabled={disabled}
      css={css(
        `
        width: 56px;
        height: 32px;
        padding: 5.5px 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 999px;
        font-size: 14px;
        font-weight: 500;
        line-height: 21px;
        letter-spacing: -0.25px;
        text-align: center;
        border: none;
        outline: none;
        `,
        styles[type],
      )}
    >
      {children}
    </button>
  );
}
