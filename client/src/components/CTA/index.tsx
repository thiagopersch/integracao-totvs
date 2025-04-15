import { Children, ReactNode } from 'react';

type CTAProps = {
  children: ReactNode;
};

const CTA = ({ children }: CTAProps) => {
  const childCount = Children.count(children);
  const isSingleChild = childCount === 1;

  return (
    <div
      className={`flex flex-col ${
        isSingleChild
          ? 'justify-center items-center'
          : 'justify-between flex-col-reverse'
      }`}
    >
      {children}
    </div>
  );
};

export default CTA;
