import { FC, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { format } from "date-fns";
import Calendar from "./Calendar";
import clsx from "clsx";

interface DatePickerProps {
  selected?: Date | null;
  onSelect: (date: Date) => void;
  dateFormat?: string;
  className?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
}

const DatePicker:FC<DatePickerProps> = ({
  selected,
  onSelect,
  dateFormat = "dd-MM-yyyy",
  className,
  ...props
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputClick = () => {
    setShowCalendar(true);
  };

  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  useOnClickOutside(containerRef, () => {
    handleCloseCalendar();
  });

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        value={selected ? format(selected, dateFormat) : dateFormat}
        readOnly
        onClick={handleInputClick}
        className={clsx(
          "w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a6e07] focus:border-transparent",
          className
        )}
        {...props}
      />
      {showCalendar && (
        <div>
          <Calendar
            selected={selected}
            onSelect={onSelect}
            handleCloseCalendar={handleCloseCalendar}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
