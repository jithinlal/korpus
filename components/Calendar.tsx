import React, { useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, {
  DayValue,
} from "@hassanmojab/react-modern-calendar-datepicker";
import dayjs from "dayjs";
import { Input, useColorModeValue } from "@chakra-ui/react";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const App = () => {
  const modalInputBgColor = useColorModeValue("brand.white", "gray.700");

  const [selectedDay, setSelectedDay] = useState<DayValue>({
    day: dayjs().date(),
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });

  const renderCustomInput = ({ ref }: { ref: any }) => (
    <Input
      readOnly
      ref={ref}
      placeholder="Date"
      value={
        selectedDay
          ? `${selectedDay.day} ${monthNames[selectedDay.month - 1]} ${
              selectedDay.year
            }`
          : ""
      }
      backgroundColor={modalInputBgColor}
      _focus={{
        borderColor: modalInputBgColor,
      }}
    />
  );

  return (
    <DatePicker
      value={selectedDay}
      onChange={(e: any) => setSelectedDay(e)}
      renderInput={renderCustomInput}
      calendarClassName="responsive-calendar"
      calendarTodayClassName="custom-today-day"
      shouldHighlightWeekends
      colorPrimary="#6b6b6b"
    />
  );
};

export default App;
