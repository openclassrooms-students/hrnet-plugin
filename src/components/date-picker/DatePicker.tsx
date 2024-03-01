import { useCallback, useRef, useState } from "react";
import Calendar from "./Calendar";
import { format } from "date-fns";
import clsx from "clsx";
import { useOnClickOutside } from "usehooks-ts";

const DatePicker = ({
  onChange,
  value,
  formatDate = "yyyy-MM-dd",
  className,
}: {
  onChange: (date: Date) => void;
  value: Date;
  formatDate?: string;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRefModal = useRef<HTMLDivElement>(null);
  const container = useRef(null);
  const [inputText, setInputText] = useState<string>("");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    },
    []
  );

  const handleSetValueDate = useCallback(
    (date: Date | null = null) => {
      if (!isOpen) {
        return;
      }

      if (containerRefModal.current) {
        containerRefModal.current.focus();
      }

      if (date) {
        setInputText(format(date, formatDate));
      }
      setIsOpen(false);
    },

    [formatDate, isOpen]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        e.code === "Enter" ||
        e.code === "NumpadEnter" ||
        e.code === "Escape"
      ) {
        handleSetValueDate(value);
      }
    },
    [handleSetValueDate, value]
  );

  const handleClick = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
    }
  }, [isOpen]);

  useOnClickOutside(container, () => handleSetValueDate());

  return (
    <div ref={container} className="relative flex flex-col w-full z-10">
      <input
        type="text"
        className={clsx(
          "w-full h-10 border border-gray-300 rounded-md px-2",
          {
            "border-primary-600": isOpen,
          },
          className
        )}
        placeholder="yyyy-mm-dd"
        ref={container}
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-autocomplete="none"
      />
      {isOpen && (
        <div
          ref={containerRefModal}
          className="mt-4 w-full mx-auto bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <Calendar
            value={value}
            onChange={onChange}
            handleClodeModal={handleSetValueDate}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
