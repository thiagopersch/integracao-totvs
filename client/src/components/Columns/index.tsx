import { ReactNode } from 'react';

type ColumnProps = {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

const Column = ({ children, cols = 2 }: ColumnProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2 md:grid-cols-1',
    3: 'grid-cols-3 md:grid-cols-1',
    4: 'grid-cols-4 md:grid-cols-1',
    5: 'grid-cols-5 md:grid-cols-1',
    6: 'grid-cols-6 md:grid-cols-1',
    7: 'grid-cols-7 md:grid-cols-1',
    8: 'grid-cols-8 md:grid-cols-1',
    9: 'grid-cols-9 md:grid-cols-1',
    10: 'grid-cols-10 md:grid-cols-1',
    11: 'grid-cols-11 md:grid-cols-1',
    12: 'grid-cols-12 md:grid-cols-1',
  }[cols];

  return <div className={`grid ${gridCols} gap-4 mt-4`}>{children}</div>;
};

export default Column;
