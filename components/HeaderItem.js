const HeaderItem = ({ Icon, title }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer
    w-12  sm:w-20 hover:kenlink_green  group"
    >
      <Icon className="h-5 mb-1 text-black group-hover:kenlink_green group-hover:animate-bounce" />
      <p className="opacity-0 group-hover:opacity-100 tracking-widest text-sm uppercase">
        {title}
      </p>
    </div>
  );
};

export default HeaderItem;
