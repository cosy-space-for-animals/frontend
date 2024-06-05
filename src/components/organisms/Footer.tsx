import React from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';

const footerStyles = {
  container: css`
    height: 96px;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      padding: 2rem 20px;
      height: auto;
      align-items: start;
    }
  `,
  list: css`
      list-style: none;
      padding: 0;
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
  `,
  listItem: css`
      font-size: 14px;
      color: var(--gray-500);
  `,
  listItemText: css`
      white-space: nowrap;
      color: var(--gray-500);
  `,
  divide: css`
      display: inline-block;
      height: 1rem;
      border-right: 1px solid var(--gray-300);
  `,
  copyright: css`
      font-size: 14px;
      color: var(--gray-500);
  `,
};

const Footer = () => {
  return (
    <footer css={footerStyles.container}>
      <ul css={footerStyles.list}>
        <li css={footerStyles.listItem}>
          <Link
            css={footerStyles.listItemText}
            href="#"
          >
            이용약관
          </Link>
        </li>
        <li css={footerStyles.divide} />
        <li css={footerStyles.listItem}>
          <Link
            css={footerStyles.listItemText}
            href="#"
          >
            개인정보 처리방침
          </Link>
        </li>
        <li css={footerStyles.divide} />
        <li css={footerStyles.listItem}>
          <span css={footerStyles.listItemText}>고객문의&nbsp;</span>
          <Link
            css={css`
                color: var(--main-red-500)
            `}
            href={'mailto:help@memopet.co.kr'}
          >
            help@memopet.co.kr
          </Link>
        </li>
      </ul>
      <span css={footerStyles.copyright}>
        &copy; 2024 memopet. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;