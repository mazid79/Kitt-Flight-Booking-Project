"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Search, ArrowRightLeft } from "lucide-react";
import { DatePickerDemo } from "./DatePicker"; 
import { Button } from "@/components/ui/button";
import AirportDropdown from './AirportDropdown'; 

interface Airport {
    name: string;
    code: string;
    city: string;
    country: string;
}

export default function Hero() {
    const [fromAirport, setFromAirport] = useState<Airport | null>(null);
    const [toAirport, setToAirport] = useState<Airport | null>(null);
    const [departureDate, setDepartureDate] = useState<string>(""); 
    const [returnDate, setReturnDate] = useState<string>(""); 
    const router = useRouter(); 

    const handleFromSelect = (airport: Airport) => {
        setFromAirport(airport);
    };

    const handleToSelect = (airport: Airport) => {
        setToAirport(airport);
    };

    const handleSearchClick = () => {
        // Validate inputs
        if (!fromAirport || !toAirport || !departureDate || !returnDate) {
            alert("Please fill in all fields before searching for flights.");
            return; // Stop the function if any field is empty
        }

        const queryString = `?from=${encodeURIComponent(fromAirport.name)}&to=${encodeURIComponent(toAirport.name)}&departureDate=${encodeURIComponent(departureDate)}&returnDate=${encodeURIComponent(returnDate)}`;
        
       
        router.push(`/results${queryString}`);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center py-10 space-y-8 relative">
            

            <div className="absolute top-5 right-5">
                <ModeToggle />
            </div>

            <Link href="/" className="font-bold text-3xl text-center">
                Good afternoon, <span className="text-primary">Brian</span>
            </Link>

            <div className="w-full max-w-4xl px-6 py-10 bg-gray-100 rounded-lg shadow-lg dark:bg-slate-900"> 
                
                <h2 className="relative w-24 px-4 py-2 mb-7 ml-1 text-lg font-semibold text-gray-900 bg-slate-200 rounded-md shadow-sm mx-auto lg:w-32 lg:text-xl">
                    Flights
                </h2>

                <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 mb-6 w-full">
                    <div className="relative w-full lg:w-1/5">
                        <AirportDropdown 
                            placeholder="Where from?" 
                            onSelect={handleFromSelect} 
                        />
                    </div>

                    <div className="flex items-center justify-center w-10 h-10 bg-slate-200 rounded-full mx-auto lg:mx-0">
                        <ArrowRightLeft className="h-4 w-4 text-gray-700" />
                    </div>

                    <div className="relative w-full lg:w-1/5">
                        <AirportDropdown 
                            placeholder="Where to?" 
                            onSelect={handleToSelect} 
                        />
                    </div>

                    <div className="relative w-full lg:w-1/5"> 
                        <DatePickerDemo 
                            placeholder="Departure" 
                            selectedDate={departureDate} 
                            setSelectedDate={setDepartureDate} 
                        />
                    </div>

                    <div className="relative w-full lg:w-1/5"> 
                        <DatePickerDemo 
                            placeholder="Return" 
                            selectedDate={returnDate} 
                            setSelectedDate={setReturnDate} 
                        />
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                    <Button
                        onClick={handleSearchClick}
                        className="flex items-center px-6 py-4 bg-green-900 text-white rounded-lg shadow-lg hover:bg-green-800 lg:ml-[35rem]"
                    >
                        <Search className="mr-2 h-5 w-5" />
                        Search Flight
                    </Button>
                </div>
            </div>
        </div>
    );
}