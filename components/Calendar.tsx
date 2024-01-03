'use client'
import { useCalendar } from "@h6s/calendar";
import { format, getDate, isValid } from "date-fns";
import { useEffect, useState } from "react";

import * as Popover from '@radix-ui/react-popover';
import { Button, Card } from "@radix-ui/themes";
//@ts-ignore
const getColor = (day) => {
  if (day.isWeekend && day.isCurrentDate) {
    return "red";
  }

  if (day.isWeekend) {
    return "red";
  }

  return "#151515";
};
//@ts-ignore
const getOpacity = (day) => {
  if (day.isWeekend && !day.isCurrentDate) {
    return 0.3;
  }

  if (day.isWeekend && day.isCurrentDate) {
    return 1;
  }

  if (!day.isCurrentMonth) {
    return 0.4;
  }

  if (day.isCurrentDate) {
    return 1;
  }

  return 1;
};

enum CalendarState {
  SELECTED_FIRST,
  SELECTED_SECOND,
  ALL_SELECTED
}
type DateRange = [Date|null, Date|null];
//@ts-ignore
const Calendar = (props) => {
  const [date, setDate] = useState([null, null]);

  const { onSelectDate, value } = props;
  //@ts-ignore
  const { headers, body, cursorDate, navigation } = useCalendar();

  useEffect(() => {
    if (!!value) {
      const isValidDate = isValid(new Date(value));
      if (isValidDate) {
        navigation.setDate(new Date(value));
      }
    }
  }, [value,navigation]);

  return (
    <>
    <Popover.Root>
      <Popover.Trigger className="flex items-center justify-between">
        <Button variant="ghost" >
          Start
        </Button>
        <Button variant="ghost">
          end
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Card className="opacity-100 justify-between w-full z-40">
        <div className="flex  items-center px-2 mb-3">
          <p>{format(cursorDate, "MMM yyyy")}</p>
          <div className="flex">
            <button
              type="button"
              onClick={navigation.toPrev}
              className="text-sm mr-2"
            >
              Prev
            </button>
            <button
              type="button"
              className="text-sm"
              onClick={() => {
                onSelectDate(format(new Date(), "yyyy-MM-dd"));
              }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={navigation.toNext}
              className="text-sm ml-2"
            >
              Next
            </button>
          </div>
        </div>

        <div>
        </div>
        <div className="flex w-full mb-1">
          {headers.weekDays.map(({ key, value }) => {
            return (
              <span key={key} className="w-12 text-center">
                {format(value, "E")}
              </span>
            );
          })}
        </div>
        <div className="w-full">
          {body.value.map(({ key, value: days }) => (
            <div key={key} className="flex">
              {days.map((day) => {
                const {
                  key,
                  date,
                  isCurrentDate,
                  isCurrentMonth,
                  isWeekend,
                  value
                } = day;

                const activeClass = isCurrentDate && "bg-sandrift";

                return (
                  <span
                    key={key}
                    className={`w-12 h-12 text-center cursor-pointer hover:bg-sandrift flex items-center justify-center rounded-full ${activeClass}`}
                    style={{
                      opacity: getOpacity(day),
                      fontWeight: isCurrentDate ? 700 : 400,
                      color: getColor(day)
                    }}
                    onClick={() => onSelectDate(format(value, "yyyy-MM-dd"))}
                  >
                    {getDate(value)}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        </Card>
      </Popover.Content>
    </Popover.Root>
    </>
  );
};

export default Calendar;
