import React from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { Input, useColorModeValue } from "@chakra-ui/react";
import { MonthName } from "../utils/monthName";

const Calendar = ({
  selectedDay,
  changeSelectedDay,
}: {
  selectedDay: any;
  changeSelectedDay: any;
}) => {
  const modalInputBgColor = useColorModeValue("brand.white", "gray.700");

  // const [selectedDay, setSelectedDay] = useState<DayValue>({
  //   day: dayjs().date(),
  //   month: dayjs().month() + 1,
  //   year: dayjs().year(),
  // });

  const renderCustomInput = ({ ref }: { ref: any }) => (
    <Input
      readOnly
      ref={ref}
      placeholder="Date"
      value={
        selectedDay
          ? `${selectedDay.day} ${MonthName[selectedDay.month - 1]} ${
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
      onChange={(e: any) => changeSelectedDay(e)}
      renderInput={renderCustomInput}
      calendarClassName="responsive-calendar"
      calendarTodayClassName="custom-today-day"
      shouldHighlightWeekends
      colorPrimary="#6b6b6b"
    />
  );
};

export default Calendar;
