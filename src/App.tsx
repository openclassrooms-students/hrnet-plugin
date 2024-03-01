import { useState } from "react";
import { format } from "date-fns";
import { DatePicker } from ".";

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSetToday = () => setCurrentDate(new Date());

  return (
    <div className="mt-16 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <p>
          <strong>Selected Date: </strong>
          {format(currentDate, "dd LLLL yyyy")}
        </p>

        <button onClick={handleSetToday}>Today</button>
      </div>

      {/* <Calendar value={currentDate} onChange={setCurrentDate} /> */}
      <div className="">
        <DatePicker value={currentDate} onChange={setCurrentDate} />
      </div>
    </div>
  );
};

export default App;
