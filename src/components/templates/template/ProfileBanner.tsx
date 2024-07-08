import FavoriteTag from '@/components/atoms/FavoriteTag';
import MainUserProfile from '@/components/atoms/MainUserProfile';
import ProfileLikeButton from '@/components/atoms/buttons/ProfileLikeButton';
import ProfileMoreButton from '@/components/molecules/profile/ProfileMoreButton';
import { css, useTheme } from '@emotion/react';

const ProfileBanner = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 32px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
            color: ${theme.colors.grey[0]};
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 16px;
            `}
          >
            <span
              css={css`
                font-weight: ${theme.fontWeights.bold};
                font-size: ${theme.fontSizes['5xl']}px;
              `}
            >
              코코
            </span>
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 8px;
              `}
            >
              <ProfileLikeButton type='like' number={123} color='white' />
              <ProfileMoreButton color='white' />
            </div>
          </div>
          <p
            css={css`
              opacity: 0.6;
            `}
          >
            웰시코기 | 남 | 2007. 03. 24. -
          </p>
          <p
            css={css`
              white-space: pre-wrap;
            `}
          >
            마이 네임 이즈 코코. 해버 굿 데이. 땡쿠.{'\n'}max height : 54px
            (최대 2줄) / 고정 width : 560px
          </p>
        </div>
        <div
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          <FavoriteTag color='pink' text='꽃냄새_맡기' />
          <FavoriteTag color='green' text='무한산책' />
          <FavoriteTag color='yellow' text='눈밭에서_뒹굴기' />
        </div>
      </div>
      <MainUserProfile shape='blob1' size='sm' />
    </div>
  );
};

export default ProfileBanner;