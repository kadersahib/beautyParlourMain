
 export function calendarData() {
    const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const SLOT_TIMES = [
        '8:30 am', '10:00 am', '10:30 am', '11:00 am',
        '11:30 am', '12:00 pm', '12:30 pm', '1:00 pm',
        '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm'
    ];
  

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;
    let selectedSlot = null;

    const monthLabel = document.getElementById('month-label');
    const calendarGrid = document.getElementById('calendar-grid');
    const selectedDateLabel = document.getElementById('selected-date-label');
    const slotsList = document.getElementById('slots-list');
    const closeBtn = document.getElementById('close-btn');
    const detailsSection = document.getElementById('details-section');

    function renderCalendar() {
        const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });
        if (monthLabel) monthLabel.textContent = monthName;
        if (!calendarGrid) return;

        calendarGrid.innerHTML = '';

        WEEK_DAYS.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            dayDiv.textContent = day;
            calendarGrid.appendChild(dayDiv);
        });

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement('div');
            calendarGrid.appendChild(blank);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dateDiv = document.createElement('div');
            dateDiv.className = 'calendar-date';
            dateDiv.textContent = day;

            if (
                selectedDate &&
                day === selectedDate.getDate() &&
                currentMonth === selectedDate.getMonth() &&
                currentYear === selectedDate.getFullYear()
            ) {
                dateDiv.classList.add('selected');
            }

            if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                dateDiv.classList.add('disabled');
            } else {
                dateDiv.addEventListener('click', () => {
                    // Remove existing selected classes
                    document.querySelectorAll('.calendar-date').forEach(d => d.classList.remove('selected'));
                    dateDiv.classList.add('selected');

                    // Set selected date and reset slot
                    selectedDate = date;
                    selectedSlot = null;

                    // Render updates
                    renderCalendar();
                    renderSlots();

                    // Add expanded class to details section
                    if (detailsSection) {
                        detailsSection.classList.add('expanded');
                    }
                });
            }

            calendarGrid.appendChild(dateDiv);
        }
    }

    function renderSlots() {
        slotsList.innerHTML = '';
        if (!selectedDate) {
            selectedDateLabel.textContent = 'Select a date';
            return;
        }

        selectedDateLabel.textContent = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        });

        SLOT_TIMES.forEach((slot, idx) => {
            const btn = document.createElement('button');
            btn.className = 'slot-btn';
            btn.textContent = slot;

            if (idx === 0) btn.disabled = true;

            if (selectedSlot === slot) btn.classList.add('selected');
            btn.onclick = () => handleSlotClick(slot);

            slotsList.appendChild(btn);
        });
    }

    function handleSlotClick(slot) {
        selectedSlot = slot;
        renderSlots();
    }

    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    if (prevMonthBtn) {
        prevMonthBtn.onclick = () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        };
    }

    if (nextMonthBtn) {
        nextMonthBtn.onclick = () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        };
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.querySelector('.main-overlay').style.display = 'none';

            // Remove expanded class when modal is closed
            if (detailsSection) {
                detailsSection.classList.remove('expanded');
            }
        });
    }

    renderCalendar();
}
