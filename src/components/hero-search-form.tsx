"use client"; 

import React from 'react';
import { MapPin, Calendar as CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function HeroSearchForm() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="w-full max-w-4xl bg-white p-2 md:p-4 rounded-xl md:rounded-full shadow-lg border border-slate-200">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0">
        <div className="flex items-center flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-slate-100">
          <MapPin className="h-5 w-5 text-slate-400 shrink-0" />
          <input type="text" placeholder="Where you want to go?" className="w-full p-3 bg-transparent focus:outline-none" />
        </div>

        <div className="flex items-center flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-slate-100">
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn("flex items-center w-full text-left py-3", !date && "text-slate-400")}>
                <CalendarIcon className="mr-2 h-5 w-5" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} /></PopoverContent>
          </Popover>
        </div>

        <div className="w-full md:w-auto p-1">
          <Button className="w-full md:w-auto md:px-4 py-1 rounded-full bg-blue-600">
            <Search className=" h-4 w-4" /> Search
          </Button>
        </div>
      </div>
    </div>
  );
}