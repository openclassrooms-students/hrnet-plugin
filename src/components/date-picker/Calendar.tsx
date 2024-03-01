import {
  add,
  endOfMonth,
  format,
  getDate,
  getDaysInMonth,
  setDate,
  startOfMonth,
  sub,
  subMonths,
} from "date-fns";
import Cell from "./Cell";
import { Chevron } from "./Icon";

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type Props = {
  value?: Date | null;
  onChange: (date: Date) => void;
  handleClodeModal: (date: Date) => void;
};

const Calendar: React.FC<Props> = ({ value, onChange, handleClodeModal }) => {
  if (!value) {
    return null;
  }

  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numberOfDaysInMonth = getDaysInMonth(value);

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const previousMonthDate = subMonths(value, 1);

  const lastDayOfPreviousMonth = getDate(endOfMonth(previousMonthDate));

  const numberOfDayInPreviousMonth = lastDayOfPreviousMonth - prefixDays + 1;

  const prevMonth = () => onChange(sub(value, { months: 1 }));
  const nextMonth = () => onChange(add(value, { months: 1 }));
  const prevYear = () => onChange(sub(value, { years: 1 }));
  const nextYear = () => onChange(add(value, { years: 1 }));

  const handleClickDate = (index: number) => {
    const date = setDate(value, index);
    onChange(date);
    handleClodeModal(date);
  };

  return (
    <div className="w-[400px] border-t border-l">
      <div className="grid grid-cols-7 items-center justify-center text-center">
        <Cell onClick={prevYear}>
          <Chevron double oritation />
        </Cell>
        <Cell onClick={prevMonth}>
          <Chevron oritation />
        </Cell>
        <Cell className="col-span-3">{format(value, "LLLL yyyy")}</Cell>
        <Cell onClick={nextMonth}>
          <Chevron />
        </Cell>
        <Cell onClick={nextYear}>
          <Chevron double />
        </Cell>

        {weeks.map((week) => (
          <Cell key={week} className="text-xs font-bold uppercase">
            {week}
          </Cell>
        ))}

        {Array.from({
          length: prefixDays,
        }).map((_, index) => (
          <Cell
            key={index}
            className="text-gray-300"
            onClick={() => {
              const date = lastDayOfPreviousMonth - prefixDays + index + 1;
              onChange(setDate(previousMonthDate, date));
            }}
          >
            {numberOfDayInPreviousMonth + index}
          </Cell>
        ))}

        {Array.from({ length: numberOfDaysInMonth }).map((_, index) => {
          const date = index + 1;
          const isCurrentDate = date === value.getDate();

          return (
            <Cell
              key={date}
              isActive={isCurrentDate}
              onClick={() => handleClickDate(date)}
            >
              {date}
            </Cell>
          );
        })}

        {Array.from({ length: suffixDays }).map((_, index) => (
          <Cell
            key={index}
            className="text-gray-300"
            onClick={() => {
              const date = index + 1;
              onChange(setDate(add(value, { months: 1 }), date));
            }}
          >
            {index + 1}
          </Cell>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
