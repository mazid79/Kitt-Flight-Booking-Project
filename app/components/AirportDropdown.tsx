"use client"; 

import { useState, useEffect } from 'react';
import airportsData from '../data/airports.json';
import { ChevronDown } from 'lucide-react';

interface Airport {
    name: string;
    code: string;
    city: string;
    country: string;
}

interface AirportDropdownProps {
    placeholder: string;
    onSelect: (airport: Airport) => void;
}

export default function AirportDropdown({ placeholder, onSelect }: AirportDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
    const [filteredAirports, setFilteredAirports] = useState<Airport[]>(airportsData.airports);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (airport: Airport) => {
        setSelectedAirport(airport);
        onSelect(airport); 
        setIsOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        const filtered = airportsData.airports.filter((airport) =>
            airport.name.toLowerCase().includes(searchTerm)
        );
        setFilteredAirports(filtered);
    };

    useEffect(() => {
        setFilteredAirports(airportsData.airports);
    }, []);
    
    return (
        <div className="relative">
            <div className="flex items-center">
                
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img 
                        src="/images/mark.png" 
                        alt="Location Icon" 
                        className="w-4 h-4"
                    />
                </div>

                
                <input
                    type="text"
                    placeholder={placeholder}
                    value={selectedAirport?.name || ''}
                    onChange={handleInputChange}
                    className="block w-full pl-10 p-2 pr-10 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-indigo-300"
                    onClick={toggleDropdown}
                />
                <ChevronDown 
                    className="absolute inset-y-0 right-3 mt-3 h-5 w-5 text-gray-700 cursor-pointer" 
                    onClick={toggleDropdown} 
                />
            </div>
            {isOpen && (
                <ul className="absolute z-10 w-full lg:w-[400px] bg-white border border-gray-300 rounded-md mt-1 max-h-60 dark:bg-gray-900 overflow-y-auto shadow-lg">
                    {filteredAirports.map((airport) => (
                        <li
                            key={airport.code}
                            className="p-2 hover:bg-indigo-500 cursor-pointer"
                            onClick={() => handleSelect(airport)}
                        >
                            {airport.name} ({airport.code})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}