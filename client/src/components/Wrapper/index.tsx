const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col flex-[1_1_100%] justify-between p-8 md:p-4 w-full h-full">
      {children}
    </div>
  );
};

export default Wrapper;
