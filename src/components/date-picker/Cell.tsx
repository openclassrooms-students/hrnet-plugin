import clsx from "clsx";

interface Props extends React.PropsWithChildren {
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const Cell: React.FC<Props> = ({
  onClick,
  children,
  className,
  isActive = false,
}) => {
  return (
    <div
      onClick={
        onClick
          ? (e) => {
              e.stopPropagation();
              onClick();
            }
          : undefined
      }
      className={clsx(
        "h-10 border-b border-r flex items-center justify-center select-none transition-colors",
        {
          "cursor-pointer hover:bg-gray-100 active:bg-gray-200":
            !isActive && onClick,
          "font-bold text-white bg-[#5a6e07]": isActive,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Cell;
