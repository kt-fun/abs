import {useCalendar} from "@h6s/calendar";
import {format, getDate} from "date-fns";
import {useCallback, useMemo, useState} from "react";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import {Button } from "@/components/ui/button";
import {Select, SelectItem, SelectContent, SelectTrigger} from "@/components/ui/select";
import * as Popover from "@/components/ui/popover";
import dayjs from "dayjs";

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

const dayIsBetween = (day: Date, dateRange?:DateRange) => {
  if (!dateRange) return true;
  let [start, end] = dateRange;
  start = start ? start : new Date("1970-01-01");
  end = end ? end : new Date("2100-01-01");
  return dayjs(day).isBetween(dayjs(start), dayjs(end), 'day', '[]');
}

type DateRange = [Date?, Date?];

interface DateRangePickerProps {
  dateRange: [Date?, Date?];
  setDateRange: (dateRange: DateRange) => void;
}

const DateRangePicker = ({dateRange,setDateRange}:DateRangePickerProps) => {
  // const [dateRange, setDateRange] = useState([undefined,undefined] as DateRange);
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startSelectableRange, setStartSelectableRange] = useState([undefined, new Date()] as DateRange);
  const [endSelectableRange, setEndSelectableRange] = useState([undefined, new Date()] as DateRange);
  const [value, setValue] = useState("");
  const handleValueChange = (value: string) => {
    setValue(value)
    if (value === "") {
      return
    }
    let start: Date | undefined = undefined
    if (value === "7d") {
      start = dayjs().subtract(7, "day").toDate()
    }
    if (value === "1m") {
      start = dayjs().subtract(1, "month").toDate()
    }
    if (value === "3m") {
      start = dayjs().subtract(3, "month").toDate()
    }
    if (value === "24h") {
      start = dayjs().subtract(1, "day").toDate()
    }
    setDateRange([start, undefined])
    setEndSelectableRange([start, new Date()])
  }
  return (
    <div className="flex justify-between items-center">
    <div className="flex justify-center items-center space-x-1">
      <Popover.Popover open={startOpen} onOpenChange={(open) => setStartOpen(open)}>
        <Popover.PopoverTrigger asChild>
          <Button variant="ghost" className="text-xs p-1">
            {dateRange[0] ? format(dateRange[0], "yyyy-MM-dd") : "Start Date"}
          </Button>
        </Popover.PopoverTrigger>
        <Popover.PopoverContent className={"z-[100]"}>
          <Calender
            selectedDate={dateRange}
            onSelectDate={(date: Date) => {
              if (dateRange[0] && dayjs(date).isSame(dayjs(dateRange[0]))) {
                setDateRange([undefined, dateRange[1]]);
                setEndSelectableRange([undefined, endSelectableRange[1]]);
              } else {
                setDateRange([date, dateRange[1]]);
                setEndSelectableRange([date, endSelectableRange[1]]);
              }
              setStartOpen(false);
              if(!dateRange[1]){
                setEndOpen(true);
              }
              setValue("")
            }}
            selectableRange={startSelectableRange}
            type={0}
          />
        </Popover.PopoverContent>
      </Popover.Popover>
      <div>~</div>
      <Popover.Popover open={endOpen} onOpenChange={(open) => setEndOpen(open)}>
        <Popover.PopoverTrigger  asChild>
          <Button variant="ghost" className="text-xs p-1">
            {dateRange[1] ? format(dateRange[1], "yyyy-MM-dd") : "End Date"}
          </Button>
        </Popover.PopoverTrigger>
        <Popover.PopoverContent className={"z-[100]"}>
          <Calender
            selectedDate={dateRange}
            onSelectDate={
              (date: Date) => {
                if (dateRange[1] && dayjs(date).isSame(dayjs(dateRange[1]))) {
                  setDateRange([dateRange[0], undefined]);
                  setStartSelectableRange([undefined, new Date()]);
                } else {
                  setDateRange([dateRange[0], date]);
                  setStartSelectableRange([undefined, date])
                }
                setEndOpen(false)
                setValue("")
              }
            }
            selectableRange={endSelectableRange}
            type={1}
          />
        </Popover.PopoverContent>
      </Popover.Popover>
    </div>
    <div>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger
        className="border-0 h-6 w-6 rounded-full bg-transparent focus:ring-0 p-0 ring-offset-0 focus:ring-opacity-0"
        />
        <SelectContent  className={"z-[100]"}>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="7d">1 Week</SelectItem>
          <SelectItem value="1m">1 Month</SelectItem>
          <SelectItem value="24h">24h</SelectItem>
          <SelectItem value="3m">3 Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
  )
}

interface CalendarProps {
  onSelectDate: (date: Date) => void;
  selectedDate?: DateRange;
  selectableRange?: DateRange;
    type:0|1
}

// @ts-ignore
const Calender = ({
  onSelectDate,
  selectedDate,
  selectableRange,
  type
  }:CalendarProps) => {
  //@ts-ignore
  const defaultV = selectedDate?.[type]?? selectedDate?.[type ^ 1]
  const { headers, body, cursorDate, navigation } = useCalendar({
    defaultDate:defaultV,
  });

  const canNavigateToPrev = useCallback(() => {
    return !(selectableRange && selectableRange[0] && dayjs(cursorDate).isSameOrBefore(selectableRange[0], 'month'));
  }, [selectableRange,cursorDate]);
  const canNavigateToNext = useCallback(() => {
    return !(selectableRange && selectableRange[1] && dayjs(cursorDate).isSameOrAfter(selectableRange[1], 'month'));
  }, [selectableRange,cursorDate]);


  return (
    <>
        <div className="justify-between w-full">
            <div className="flex justify-between items-center px-2 mb-3">
          <p>{type==0?'Start:':'End:'} {format(cursorDate, "MMM yyyy")}</p>
          <div className="flex">
            <Button variant="ghost"
              disabled={!canNavigateToPrev()}
              onClick={navigation.toPrev}
              className="text-sm mx-2"
            ><FaAngleLeft/></Button>
            <Button variant="ghost"
              disabled={!canNavigateToNext()}
              onClick={navigation.toNext}
              className="text-sm mx-2"
            >
                <FaAngleRight/>
            </Button>
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
          {body.value.map(({ key, value: days }) => {
            const handleClick = (day: { value: Date; }) => {
              if (dayIsBetween(day.value, selectableRange)){
                onSelectDate(day.value);
              }
            }
          return (
            <div key={key} className="flex h-8 my-2 items-center">
              <div className="flex h-8 items-center">
                {
                 days.filter(it=> {
                   if (selectedDate && selectedDate[0]) {
                     return dayjs(it.value).isBefore(dayjs(selectedDate?.[0]))
                   }
                   if (selectedDate && selectedDate[1]) {
                     return dayjs(it.value).isBefore(dayjs(selectedDate?.[1]))
                   }
                   return dayjs(it.value).isBefore(dayjs())
                 })
                 .map((day) => {
                   const opacityClass = dayIsBetween(day.value, selectableRange) ? "cursor-pointer" : "opacity-50 cursor-default"
                   return(
                     <Item
                       key={day.key}
                       day={day}
                       className={` flex items-center justify-center ${opacityClass}`}
                       onClick={()=>{handleClick(day)}}
                     />
                   )
                 })
                }
              </div>
              <div  className="flex bg-gradient-to-r from-red-500 to-blue-500 rounded-full h-8  items-center">
                {
                  days.filter(it=> {
                    if (selectedDate && selectedDate[0] && selectedDate[1]) {
                      return dayjs(it.value).isBetween(dayjs(selectedDate?.[0]),dayjs(selectedDate?.[1]),"day","[]")
                    }
                    if (selectedDate && selectedDate[0]) {
                      return dayjs(it.value).isSame(dayjs(selectedDate?.[0]))
                    }
                    if (selectedDate && selectedDate[1]) {
                      return dayjs(it.value).isSame(dayjs(selectedDate?.[1]))
                    }
                    return false
                  })
                    .map((day) => {
                      return(
                        <Item
                          key={day.key}
                          day={day}
                          className="w-12 h-8 text-center cursor-pointer hover:bg-sandrift flex items-center justify-center text-white"
                          onClick={()=>{handleClick(day)}}
                        />
                      )
                    })
                }
              </div>
              <div  className="flex  h-8  items-center">
                {
                  days.filter(it=> {
                    if (selectedDate && selectedDate[0] && selectedDate[1]) {
                      return  dayjs(it.value).isAfter(dayjs(selectedDate?.[1]))
                    }
                    if (selectedDate && selectedDate[0]) {
                      return dayjs(it.value).isAfter(dayjs(selectedDate?.[0]))
                    }
                    if (selectedDate && selectedDate[1]) {
                      return dayjs(it.value).isAfter(dayjs(selectedDate?.[1]))
                    }
                    return dayjs(it.value).isAfter(dayjs())
                  })
                    .map((day) => {
                      const opacityClass =  dayIsBetween(day.value,selectableRange) ? "cursor-pointer" : "opacity-50 cursor-default"
                      return(
                        <Item
                          key={day.key}
                          day={day}
                          className={` flex items-center justify-center ${opacityClass}`}
                          onClick={()=>{handleClick(day)}}
                        />
                      )
                    })
                }
              </div>
            </div>
          )}
          )}
        </div>
      </div>
    </>
  );
};

const Item = ({
  day,
  onClick,
  className
}:{
  day:any,
  onClick:()=>void,
  className:string
}) => {

  const {
    key,
    value
  } = day;
  const isToday = useMemo(() => {
    return dayjs(value).isSame(dayjs(), 'day');
  }, [value]);
  return (
    <span
      key={key}
      className={`w-12 h-8 text-center hover:bg-sandrift flex items-center justify-center ${className}`}
      style={{
        fontWeight: isToday ? 700 : 400,
      }}
      onClick={onClick}
    >
          {getDate(value)}
    </span>
  )
}


// a function given a start hex, end hex, total step count
// query the hex color at a  specific step range
// example: stepGradient('#ff0000', '#0000ff', 10, 1, 5) => '#subStepStartHex', '#subStepEndHex'
const stepGradient = (totalStartHex:string, totalEndHex:string, totalStep:number, startStep:number, endStep:number) => {
  console.log("start step", startStep, "end step", endStep, "total step", totalStep)
  const startHex = totalStartHex.replace('#', '');
  const endHex = totalEndHex.replace('#', '');
  // total step is 10
  const subStepStartHex = startHex.match(/.{2}/g)!.map((hex) => parseInt(hex, 16));
  const subStepEndHex = endHex.match(/.{2}/g)!.map((hex) => parseInt(hex, 16));

  const startStepHexRes = subStepStartHex.map((start, i) => {
    const end = subStepEndHex[i];
    const subStep = (end - start) / totalStep;
    return Math.round(start + subStep * (startStep));
  });
  const endStepHexRes = subStepStartHex.map((start, i) => {
    const end = subStepEndHex[i];
    const subStep = (end - start) / totalStep;
    return Math.round(start + subStep * (startStep+1));
  })
  const mapToHex = (hexs:number[]) => {
    return `#${hexs.map((hex) => hex.toString(16).padStart(2,'0')).join('')}`;
  }
  return [mapToHex(startStepHexRes), mapToHex(endStepHexRes)]
}



export default DateRangePicker;
