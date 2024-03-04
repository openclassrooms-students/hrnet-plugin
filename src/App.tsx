import { useState } from "react";
import { DatePicker } from ".";

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="mt-16 flex flex-col items-center gap-8">
      <DatePicker
        selected={selectedDate}
        onSelect={handleDateChange}
        name="mamdy"
        aria-label="Search"
      />
    </div>
  );
};

export default App;
