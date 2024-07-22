import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Active, UniqueIdentifier } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
} from '@dnd-kit/sortable';
import { DragHandle, SortableItem } from './SortableItem';
import SortableOverlay from '@/lib/dnd/SortableOverlay';
import { css } from '@emotion/react';

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  id: string;
  items: T[];

  onChange(items: T[]): void;

  renderItem(item: T): ReactNode;
}

export function SortableList<T extends BaseItem>(
  {
    id,
    items,
    onChange,
    renderItem,
  }: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items],
  );
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  return (
    <DndContext
      id={id}
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul
          role="list"
          css={css`
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          `}
        >
          {items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;