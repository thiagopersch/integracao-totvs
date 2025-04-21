const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-[1_1_100%] m-10 md:m-4">{children}</div>
  );
};

export default Wrapper;
