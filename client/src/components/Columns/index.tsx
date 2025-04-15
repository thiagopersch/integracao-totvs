import { ReactNode } from 'react';

type ColumnProps = {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
};

const Column = ({ children, cols = 2 }: ColumnProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2 md:grid-cols-1',
    3: 'grid-cols-3 md:grid-cols-1',
    4: 'grid-cols-4 md:grid-cols-1',
  }[cols];

  return <div className={`grid ${gridCols} gap-3 p-4`}>{children}</div>;
};

export default Column;
