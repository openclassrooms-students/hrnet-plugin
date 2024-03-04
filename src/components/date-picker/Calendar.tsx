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
  selected?: Date | null;
  onSelect: (date: Date) => void;
  handleCloseCalendar: () => void;
};

const Calendar: React.FC<Props> = ({
  selected,
  onSelect,
  handleCloseCalendar,
}) => {
  const currentDate = selected || new Date();

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numberOfDaysInMonth = getDaysInMonth(currentDate);

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const previousMonthDate = subMonths(currentDate, 1);

  const lastDayOfPreviousMonth = getDate(endOfMonth(previousMonthDate));

  const numberOfDayInPreviousMonth = lastDayOfPreviousMonth - prefixDays + 1;

  const periodMap: { [key: string]: { months?: number; years?: number } } = {
    month: { months: 1 },
    year: { years: 1 },
  };

  const handleChangeDate = (period: string, direction: string) => {
    const changeValue = direction === "add" ? add : sub;
    onSelect(changeValue(currentDate, periodMap[period]));
  };

  const handleClickDate = (index: number) => {
    const date = setDate(startOfMonth(currentDate), index);
    onSelect(date);
    handleCloseCalendar();
  };

  const handleClickDatePreviousMonth = (index: number) => {
    const date = setDate(
      startOfMonth(previousMonthDate),
      numberOfDayInPreviousMonth + index
    );
    onSelect(date);
    handleCloseCalendar();
  };

  const handleClickDateNextMonth = (index: number) => {
    const date = setDate(startOfMonth(currentDate), index + 1);
    onSelect(date);
    handleCloseCalendar();
  };

  return (
    <div className="w-[400px] border-t border-l">
      <div className="grid grid-cols-7 items-center justify-center text-center">
        <Cell onClick={() => handleChangeDate("year", "sub")}>
          <Chevron double oritation />
        </Cell>
        <Cell onClick={() => handleChangeDate("month", "sub")}>
          <Chevron oritation />
        </Cell>
        <Cell className="col-span-3">{format(currentDate, "LLLL yyyy")}</Cell>
        <Cell onClick={() => handleChangeDate("month", "add")}>
          <Chevron />
        </Cell>
        <Cell onClick={() => handleChangeDate("year", "add")}>
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
            onClick={() => handleClickDatePreviousMonth(index)}
          >
            {numberOfDayInPreviousMonth + index}
          </Cell>
        ))}

        {Array.from({ length: numberOfDaysInMonth }).map((_, index) => {
          const date = index + 1;
          const isCurrentDate = date === currentDate.getDate();

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
            onClick={() => handleClickDateNextMonth(index)}
          >
            {index + 1}
          </Cell>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
