"use client";
import React, { useState, useEffect, useCallback } from "react";
import './styles/calendar.css';
// Ensure you have necessary CSS for the classes (calendar-container, headercalendar, today, day-number, fade-in/fade-out)
// For simplicity, the CSS is omitted here.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TODAY = new Date();

/**
 * Utility function to get the number of days in a given month and year.
 * @param {number} month - 0 (Jan) to 11 (Dec)
 * @param {number} year
 * @returns {number}
 */
const getDaysInMonth = (month, year) => {
    // This trick works because asking for day 32 of a month rolls over to the next month, 
    // and subtracting the date gives the days in the *original* month.
    return 32 - new Date(year, month, 32).getDate();
};

/**
 * Renders a full calendar component using React's state and rendering capabilities.
 */
export default function Calendar({ onSelect }) {
    // 1. STATE MANAGEMENT: Track the displayed month/year and the selected date

    const [currentDate, setCurrentDate] = useState(TODAY); // Used to determine month/year to display
    const [selectedDate, setSelectedDate] = useState(null); // Used to track user selection
    const [fadeState, setFadeState] = useState('fade-in'); // Used for the transition effect

    // Extract the month and year from the state date object
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // 2. NAVIGATION FUNCTIONS: Update state to change month/year
    
    // useCallback is used to memoize these functions, which is good practice for functions
    // that rely on state and are passed down to child components or used in useEffect.

    const nextMonth = useCallback(() => {
        setFadeState('fade-out'); // Start fade-out
        setTimeout(() => {
            setCurrentDate(prevDate => {
                let month = prevDate.getMonth();
                let year = prevDate.getFullYear();
                // If December, go to January of next year
                year = (month === 11) ? year + 1 : year;
                month = (month + 1) % 12;
                return new Date(year, month, 1);
            });
            setFadeState('fade-in'); // Start fade-in after state update
        }, 200); // Match CSS transition duration
    }, []);

    const prevMonth = useCallback(() => {
        setFadeState('fade-out'); // Start fade-out
        setTimeout(() => {
            setCurrentDate(prevDate => {
                let month = prevDate.getMonth();
                let year = prevDate.getFullYear();
                // If January, go to December of previous year
                year = (month === 0) ? year - 1 : year;
                month = (month === 0) ? 11 : month - 1;
                return new Date(year, month, 1);
            });
            setFadeState('fade-in'); // Start fade-in after state update
        }, 200); // Match CSS transition duration
    }, []);

    // 3. CORE RENDERING LOGIC: Generate the calendar grid data

    const renderCalendar = useCallback(() => {
        let firstDay = (new Date(currentYear, currentMonth)).getDay(); // 0 (Sun) to 6 (Sat)
        let daysInMonth = getDaysInMonth(currentMonth, currentYear);
        let date = 1;
        const calendarRows = [];

        for (let i = 0; i < 6; i++) {
            const row = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    // Empty cells before the first day
                    row.push(<td key={`empty-${i}-${j}`}></td>);
                } else if (date > daysInMonth) {
                    // Cells after the last day
                    row.push(<td key={`empty-${i}-${j}`}></td>);
                } else {
                    const dayNumber = date;
                    const fullDate = new Date(currentYear, currentMonth, dayNumber);
                    
                    // Check if it's today
                    const isToday = dayNumber === TODAY.getDate() && currentYear === TODAY.getFullYear() && currentMonth === TODAY.getMonth();
                    
                    // Check if it's the selected date
                    const isSelected = selectedDate && 
                        dayNumber === selectedDate.getDate() && 
                        currentMonth === selectedDate.getMonth() && 
                        currentYear === selectedDate.getFullYear();

                    // Click handler
                    const handleDayClick = () => {
                        setSelectedDate(fullDate);
                        if (onSelect) onSelect(fullDate);
                        console.log(`You clicked on ${MONTHS[currentMonth]} ${dayNumber}, ${currentYear}`);
                    };

                    // Combine CSS classes
                    let className = 'day-number';
                    if (isToday) className += ' today';
                    if (isSelected) className += ' selected'; // Add a new 'selected' class

                    // Render the cell
                    row.push(
                        <td key={dayNumber} onClick={handleDayClick}>
                            <span className={className}>{dayNumber}</span>
                        </td>
                    );
                    date++;
                }
            }
            calendarRows.push(<tr key={i}>{row}</tr>);
            
            // Stop loop if no more days are needed (to avoid rendering an empty 6th row)
            if (date > daysInMonth && i >= 4) { // Only stop if month fits within 5 rows
                break;
            }
        }
        return calendarRows;
    }, [currentMonth, currentYear, selectedDate]); // Dependencies: Re-run when month/year/selection changes

    // 4. DISPLAY MESSAGE
    const selectedDateDisplay = selectedDate 
        ? `Selected: ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}` 
        : 'Click a date to select it.';

    // 5. RENDER THE COMPONENT
    return (
        <div className="calendar-container">
            <div className="headercalendar">
                <button id="prevBtn" onClick={prevMonth}>&laquo; Prev</button>
                <h2 id="monthYear">{MONTHS[currentMonth]} {currentYear}</h2>
                <button id="nextBtn" onClick={nextMonth}>Next &raquo;</button>
            </div>
            <table id="calendar">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                {/* Apply the fade-state class directly to the tbody for the transition */}
                <tbody id="calendar-body" className={fadeState}>
                    {renderCalendar()}
                </tbody>
            </table>
            <p id="clicked-date-display" style={{ marginTop: '15px', textAlign: 'center', color: '#555' }}>
                {selectedDateDisplay}
            </p>
        </div>
    );
}