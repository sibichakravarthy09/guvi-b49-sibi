import FullCalendar from '@fullcalendar/react';
import Card from 'components/card/Card';
import { useEffect, useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import AddTask from 'views/admin/task/components/addTask';
import EventView from 'views/admin/task/eventView';

const Calender = (props) => {
    const { data, fetchData } = props;
    const [eventView, setEventView] = useState(false);
    const [info, setInfo] = useState(null);
    const [date, setDate] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDateClick = (arg) => {
        setDate(arg.dateStr);
        onOpen();
    };

    const handleEventClick = (info) => {
        setInfo(info);
        setEventView(true);
    };

    const [currentView, setCurrentView] = useState('');

    useEffect(() => {
        setCurrentView('dayGridMonth');
    }, []);

    return (
        <div>
            <Card>
                <AddTask isOpen={isOpen} fetchData={fetchData} onClose={onClose} date={date} />
                <EventView fetchData={fetchData} isOpen={eventView} onClose={() => setEventView(false)} info={info} />

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, multiMonthPlugin]}
                    initialView={currentView}
                    height="600px"
                    dateClick={handleDateClick}
                    events={data}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,multiMonthFourMonth',
                    }}
                    eventClick={handleEventClick}
                    buttonText={{
                        today: 'Today',
                        dayGridMonth: 'Month',
                        timeGridWeek: 'Week',
                        timeGridDay: 'Day',
                        listWeek: 'List',
                    }}
                    views={{
                        multiMonthFourMonth: {
                            type: 'multiMonth',
                            buttonText: 'Multi Month',
                            duration: { months: useBreakpointValue({ base: 4, lg: 4, xl: 6 }) },
                        },
                    }}
                    eventClassNames="custom-fullcalendar"
                />
            </Card>
        </div>
    );
};

export default Calender;
