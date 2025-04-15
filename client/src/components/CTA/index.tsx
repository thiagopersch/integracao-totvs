import { Children, ReactNode } from 'react';

type CTAProps = {
  children: ReactNode;
};

const CTA = ({ children }: CTAProps) => {
  const childCount = Children.count(children);
  const isSingleChild = childCount === 1;
  const childrens = !isSingleChild
    ? 'justify-end items-center'
    : 'justify-center items-center flex-col-reverse';

  return <div className={`flex flex-row gap-4 ${childrens}`}>{children}</div>;
};

export default CTA;
