"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; 
import { CircleX, ArrowLeft, Loader2 } from "lucide-react";
import { Sheet, SheetContent} from "@/components/ui/sheet";
import airportsData from "../data/airports.json"; 

interface FlightResult {
    id: number; 
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    name: string;
    departureTime: string;
    arrivalTime: string;
    flightCode: string;
    totalTravelTime: string;
    stops: string; 
    price: number; 
}

export default function ResultsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [flightResults, setFlightResults] = useState<FlightResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0); 
    const [selectedFlight, setSelectedFlight] = useState<FlightResult | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isCardVisible, setIsCardVisible] = useState(true); 

    useEffect(() => {
        const from = searchParams.get("from") || "";
        const to = searchParams.get("to") || "";
        const departureDate = searchParams.get("departureDate") || "";
        const returnDate = searchParams.get("returnDate") || "";

        const fromAirport = airportsData.airports.find(airport => airport.city === from)?.code || "";
        const toAirport = airportsData.airports.find(airport => airport.city === to)?.code || "";
        

        const fetchedResults: FlightResult[] = [
            {
                id: 1,
                from,
                to,
                departureDate,
                returnDate,
                name: "Emirates • EK 202",
                departureTime: "9:45 AM",
                arrivalTime: "01:15 pM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "3h 30min",
                stops: "2 Stops",
                price: 2404, 
            },
            {
                id: 2,
                from,
                to,
                departureDate,
                returnDate,
                name: "Lufthansa • LH 762",
                departureTime: "2:10 PM",
                arrivalTime: "4:10 PM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "2h",
                stops: "1 Stop",
                price: 2600, 
            },
            {
                id: 3,
                from,
                to,
                departureDate,
                returnDate,
                name: "Emirates • EK 203",
                departureTime: "10:30 AM",
                arrivalTime: "12:30 PM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "2h",
                stops: "Non-stop",
                price: 2450, 
            },
            {
                id: 4,
                from,
                to,
                departureDate,
                returnDate,
                name: "Emirates • EK 443",
                departureTime: "3:15 PM",
                arrivalTime: "8:35 PM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "5h 20min",
                stops: "2 Stops",
                price: 2650, 
            },
            {
                id: 5,
                from,
                to,
                departureDate,
                returnDate,
                name: "Lufthansa • LH 7643",
                departureTime: "11:00 AM",
                arrivalTime: "1:00 PM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "2h",
                stops: "Non-stop",
                price: 2500, 
            },
            {
                id: 6,
                from,
                to,
                departureDate,
                returnDate,
                name: "Lufthansa • LH 7642",
                departureTime: "6:30 AM",
                arrivalTime: "11:15 AM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "4h 45min",
                stops: "1 Stop",
                price: 2700, 
            },
            {
                id: 7,
                from,
                to,
                departureDate,
                returnDate,
                name: "Emirates • EK 205",
                departureTime: "12:00 PM",
                arrivalTime: "9:40 PM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "9h 40min",
                stops: "2 Stops",
                price: 2550, 
            },
            {
                id: 8,
                from,
                to,
                departureDate,
                returnDate,
                name: "Lufthansa • LH 765",
                departureTime: "10:45 PM",
                arrivalTime: "1:45 AM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "3h",
                stops: "2 Stops",
                price: 2750, 
            },
            {
                id: 9,
                from,
                to,
                departureDate,
                returnDate,
                name: "Lufthansa • LH 7642",
                departureTime: "4:30 PM",
                arrivalTime: "7:45 PM",
                flightCode: `${fromAirport} EK202 ${toAirport}`,
                totalTravelTime: "3h 15min",
                stops: "1 Stop",
                price: 2700, 
            }
        ];

        setLoading(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) return prev + 10;
                clearInterval(interval);
                return prev;
            });
        }, 100);

        setTimeout(() => {
            setFlightResults(fetchedResults);
            setLoading(false);
            clearInterval(interval);
        }, 2000);

        setTimeout(() => {
            setFlightResults(fetchedResults);
            setLoading(false);
            setIsCardVisible(false); 
        }, 1500);

        return () => clearInterval(interval); 
    }, [searchParams]);

    const handleFlightClick = (flight: FlightResult) => {
        setSelectedFlight(flight);
        setIsSheetOpen(true);
    };

    const handleCircleX = () => {
        router.back(); 
    };

    const handleCloseSheet = () => {
        setIsSheetOpen(false); 
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            {/* Loading Card */}
            {isCardVisible && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg">
                        <img 
                            src="/images/paperfly.gif" 
                            alt="Loading animation"
                            className="w-32 h-32 mb-4"
                        />
                        <div className="flex items-center space-x-2 mb-2">
                            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                            <span className="text-lg font-semibold">Searching for available flights...</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                            <span className="text-lg font-semibold">Attaching company rules...</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
                            <span className="text-lg font-semibold">Serving best results...</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full p-4 flex items-center justify-between border border-gray-600 shadow-md mt-0">
                <div className="flex-1 mx-4 text-center">
                    {selectedFlight ? (
                        <div className="bg-gray-200 text-gray-800 rounded-lg p-2">
                            <strong>{selectedFlight.name}</strong> - {selectedFlight.from} to {selectedFlight.to}
                        </div>
                    ) : (
                        <span className="text-gray-400">Flight details will appear here</span>
                    )}
                </div>

                <button onClick={handleCircleX} className="flex items-center p-2">
                    <CircleX className="h-8 w-8 text-gray-700" />
                </button>
            </div>

            {/* Progress Bar */}
            {loading && (
                <div className="relative w-full m-0">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}
            {/* Showing results text */}
            <div className="text-sm text-gray-600 py-4">
                Showing {flightResults.length} of {flightResults.length} results
            </div>

            {/* Flight Results */}
            {!loading && (
                <div className="flex flex-col w-full max-w-4xl space-y-4">
                    {flightResults.map((flight, index) => {
                        const secondFlight = flightResults[index + 1];
                        return (
                            <div key={flight.id} className="flex flex-col p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                                {/* First Flight */}
                                <div className="flex flex-row items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <img
                                            src={flight.name.includes("Emirates") ? '/images/emi.png' : '/images/luf.png'}
                                            alt={`${flight.name} logo`}
                                            className="h-16 w-16 mr-4"
                                        />
                                        <div className="flex flex-col">
                                            <h2 className="text-sm text-gray-500">{flight.name}</h2>
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-900 font-semibold">{flight.departureTime} - {flight.arrivalTime}</span>
                                                <div className="ml-4 text-sm text-gray-400 text-center">
                                                <span className="text-gray-700 text-sm font-medium tracking-wider uppercase opacity-80 ml-32">{flight.flightCode}</span>
                                                <div className="text-lg font-bold text-gray-800 mt-1 ml-32">{flight.totalTravelTime}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative items-center">                      
                                        <div className="text-sm text-gray-900 px-4 mr-32 py-1 bg-gray-100 rounded-full border border-gray-300 shadow-sm">
                                            {flight.stops}
                                        </div>
                                    </div>
                                    <div className="relative">
                                            <div className="absolute left-0 top-0 h-full border-l border-gray-300"></div>
                                            
                                    </div>       
                                    
                                </div>

                                {/* Second Flight */}
                                {secondFlight && (
                                    <div className="flex flex-row items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <img
                                                src={secondFlight.name.includes("Emirates") ? '/images/emi.png' : '/images/luf.png'}
                                                alt={`${secondFlight.name} logo`}
                                                className="h-16 w-16 mr-4"
                                            />
                                            <div className="flex flex-col">
                                                <h2 className="text-sm text-gray-500">{secondFlight.name}</h2>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-900 font-semibold">{secondFlight.departureTime} - {secondFlight.arrivalTime}</span>
                                                    <div className="ml-4 text-sm text-gray-400 text-center">
                                                        <span className="text-gray-700 text-sm font-medium tracking-wider uppercase opacity-80 ml-32">{secondFlight.flightCode}</span>
                                                        <div className="text-lg font-bold text-gray-900 mt-1 ml-32">{secondFlight.totalTravelTime}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative items-center">
                                            <div className="text-sm text-gray-900 px-4 py-1 bg-gray-100 rounded-full border border-gray-300 shadow-sm ml-24">{secondFlight.stops}</div>
                                        </div>
                                        <div className="relative">
                                        <div className="absolute left-0 top-0 -mt-12 h-[calc(100%+64px)] border-l border-gray-300"></div>
                                            <div className="flex flex-col items-end ml-8">
                                                <span className="text-xs text-gray-500 mb-1 mr-40">from</span>
                                                <span className="text-lg font-bold mb-1 mr-24 dark:text-gray-900">AED {flight.price.toLocaleString()}</span>
                                                <Button
                                                    className="w-48 h-10 bg-green-900 text-white rounded-lg hover:bg-green-800"
                                                    onClick={() => handleFlightClick(flight)}
                                                >
                                                    Select
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            {/* Sheet Component */}
            <Sheet open={isSheetOpen} onOpenChange={handleCloseSheet}>
                <SheetContent 
                    side="right" 
                    className="inset-y-0 right-0 h-full w-4/5 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-lg"
                >
                    <div className="flex items-center">
                        <Button variant="outline" onClick={handleCloseSheet} className="rounded-full p-2">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h2 className="text-lg font-semibold ml-2">Flight Details</h2>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    
                    <div className="flex items-center justify-between p-4">
                        {/* Meter SVG on the left side */}
                        <div className="flex-shrink-0">
                            <img 
                                src="/images/meter.svg" 
                                alt="Flight Route Meter" 
                                className="h-64 w-auto" 
                            />
                        </div>

                        {/* Flight details on the right side */}
                        {selectedFlight && (
                            <div className="flex flex-col ml-4">
                                <div className="flex items-center justify-center h-12 w-12 border border-gray-300 rounded-md">
                                    <img 
                                        src={selectedFlight.name.includes("Emirates") ? '/images/emi.png' : '/images/luf.png'} 
                                        alt={`${selectedFlight.name} logo`} 
                                        className="h-10 w-10"
                                    />
                                </div>
                                <h3 className="text-lg font-bold">{selectedFlight.name}</h3>
                                <p className="text-sm text-gray-500">Economy • A330</p>
                                <p className="text-sm text-gray-700">Flight Time: {selectedFlight.totalTravelTime}</p>
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}