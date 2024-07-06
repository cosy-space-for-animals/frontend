'use client';

import React, { useEffect, useRef, useState } from 'react';
import CloseIcon from '@/assets/icon/CloseIcon';
import { css, useTheme } from '@emotion/react';
import { TColor } from '@/types/theme';
import { TItem } from '@/components/organisms/profile/ProfileSettingStep3';

type Props = {
  id: string;
  mode: 'edit' | 'view';
  color: TColor;
  setColor: (color: TColor) => void;
  removeHandler?: (id: string) => void;
  label?: string;
  onBlur?: (item: TItem) => void;
}

const ColoredTag = (
  {
    id,
    mode,
    color,
    setColor,
    label,
    removeHandler,
    onBlur
  }: Props) => {
  const theme = useTheme();
  const [palletOpen, setPalletOpen] = useState(false);
  const [palletColor, setPalletColor] = useState<TColor>(color);
  const [text, setText] = useState(label ?? '');
  const [isFocus, setIsFocus] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const span = spanRef.current;
      const input = inputRef.current;
      const spanWidth = span.offsetWidth;
      input.style.width = `${spanWidth + 4}px`;
    }
  }, [text]);

  useEffect(() => {
    setPalletColor(color);
  }, [color]);

  useEffect(() => {
    if (label === undefined) return;

    setText(label);

  }, [label]);

  return (
    <div css={css`
      width: fit-content;
      display: flex;
      gap: 0.25rem;
      height: 2.25rem;
      align-items: center;
      border-radius: 999px;
      border: 2px solid ${theme.colors.grey[900]};
      padding: 0 0.75rem;
      background: ${palletColor};
    `}>
      <span
        css={css`
          border: none;
          display: flex;
          font-weight: 400;
          font-size: 1rem;
          line-height: 24px;
          letter-spacing: -0.5px;
          background: transparent;
          position: absolute;
          visibility: hidden;
        `}
        ref={spanRef}
      >{text}</span>
      <button css={css`
        width: 18px;
        height: 18px;
        border: 2px solid ${theme.colors.grey[0]};
        border-radius: 999px;
        background: ${palletColor};
      `}></button>
      <span
        css={css`
          border: none;
          display: flex;
          font-weight: 400;
          font-size: 1rem;
          line-height: 24px;
          letter-spacing: -0.5px;
          background: transparent;
          position: ${mode === 'edit' ? 'absolute': 'relative'};
          visibility: ${mode === 'edit' ? 'hidden': 'visible'};
        `}
        ref={spanRef}
      >{text}</span>
      {
        mode === 'edit' && (
          <input
            type="text"
            css={css`
              border: none;
              display: block;
              font-weight: 400;
              font-size: 1rem;
              line-height: 24px;
              letter-spacing: -0.5px;
              background: transparent;
              min-width: 84px;
              max-width: 280px;
              width: 84px;
              padding: 0 4px 0 0;

              &::placeholder {
                color: ${theme.colors.grey[900]}80;
              }

              &:focus {
                outline: none;
              }
            `}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inputRef.current?.blur();
              }
            }}
            onBlur={() => onBlur && onBlur({ id, label: text })}
            placeholder={'입력해주세요'}
            ref={inputRef}
          />
        )
      }
      {(text.length > 0 && mode === 'view') &&
        <button onClick={() => removeHandler ? removeHandler(id) : null}>
          <CloseIcon color={theme.colors.grey[900]} />
        </button>
      }
    </div>
  );
};

export default ColoredTag;
