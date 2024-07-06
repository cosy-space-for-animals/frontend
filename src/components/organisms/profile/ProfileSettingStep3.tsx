'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { css, useTheme } from '@emotion/react';
import ThemedText from '@/components/atoms/ThemedText';
import { useDevice } from '@/context/DeviceContext';
import { useRecoilState } from 'recoil';
import { thirdStep } from '@/recoil/store';
import InputCharacterCounterItem from '@/components/atoms/input/InputCharacterCouterItem';
import ColorTag from '@/components/molecules/ColorTag';
import { Nullable } from '@/types/global';
import { SortableList } from '@/lib/dnd/SortableList';

type Item = {
  id: string;
}

const ProfileSettingStep3 = () => {
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [param, setParam] = useRecoilState(thirdStep);
  const [items, setItems] = useState<Item[]>([
    { id: 'yellow' },
    { id: 'sky' },
    { id: 'green' },
    { id: 'pink' },
    { id: 'purple' },
  ]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div css={css`
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 60px;
      gap: 2rem;
      @media ${theme.device.mobile} {
        padding: 0;
      }
    `}>
      <div css={css`
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      `}>
        <ThemedText type={isMobile ? 'labelMedium' : 'labelLarge'}>소개</ThemedText>
        <div css={css`
          display: flex;
          gap: 0.5rem;
        `}>
          <InputCharacterCounterItem
            value={param.petDesc}
            validate={true}
            setValue={(e: string) => setParam({ ...param, petDesc: e })}
            maxLength={90}
            placeholder="소개글을 입력해주세요"
          />
        </div>
      </div>
      <div css={css`
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      `}>
        <div>
          <ThemedText type={isMobile ? 'labelLarge' : 'labelLarge'}>좋아하는 것 </ThemedText>
          <ThemedText type={isMobile ? 'labelLarge' : 'labelLarge'} css={css`color: ${theme.colors.grey[500]}`}>(최대
            3개)</ThemedText>
        </div>

        <SortableList
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              <SortableList.DragHandle />
              <ColorTag
                color={theme.colors.secondary[item.id]}
                setColor={(color) => {
                  setItems((items) => {
                    const index = items.findIndex((item) => item.id === item.id);
                    const newItems = [...items];
                    newItems[index] = { ...newItems[index], id: color };
                    return newItems;
                  });
                }}
                label={item.id}
              />
            </SortableList.Item>
          )}
        />

        <div css={css`
          display: flex;
          flex-direction: column;
          word-break: keep-all;
          padding: 0.5rem 0.75rem;
          background: ${theme.colors.grey[100]};
        `}>
          <ThemedText type={'captionLarge'} cssStyle={css`color: ${theme.colors.grey[600]}`}>이런 걸 좋아하나요?</ThemedText>
          <ThemedText type={'captionLarge'} cssStyle={css`color: ${theme.colors.grey[400]}`}>
            운동화끈_씹어먹기, 고구마말랭이, 낮잠자기, 꽃냄새_맡기, 성대모사장인,
            목욕하기, 무한산책, 손바닥_위에서_꿀잠, 가만히_햇살_맞기
          </ThemedText>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingStep3;
