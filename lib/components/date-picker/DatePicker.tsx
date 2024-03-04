import React, { useRef, useState, ChangeEvent } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { format, parse } from "date-fns";
import Calendar from "./Calendar";
import clsx from "clsx";

type DatePickerProps = {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
  dateFormat?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onSelect,
  dateFormat = "dd/MM/yyyy",
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    const parsedDate = inputDate
      ? parse(inputDate, dateFormat, new Date())
      : null;
    onSelect(parsedDate);
  };

  return (
    <div className="relative" ref={containerRef}>
      <input
        type="text"
        value={selected ? format(selected, dateFormat) : dateFormat}
        readOnly
        onClick={handleInputClick}
        onChange={handleInputChange}
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
            onSelect={(date) => onSelect(date)}
            handleCloseCalendar={handleCloseCalendar}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
