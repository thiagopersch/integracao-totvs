import { cn } from '@/lib/utils';

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div className={cn('flex flex-col flex-[1_1_100%] m-10 md:m-4', className)}>
      {children}
    </div>
  );
};

export default Wrapper;
