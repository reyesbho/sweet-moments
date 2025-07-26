import React, { useState } from 'react';
import DayCalendar from '../../components/calendar/DayCalendar';
import { getDaysInMonth, format, startOfMonth, endOfMonth, addMonths, subMonths, getDay, addDays, subDays } from 'date-fns';
import './Calendar.css';
import { Pedido } from '../../general/interfaces/pedido';
import { useOrders } from '../../hooks/useOrders';
import { STATUS } from '../../general/Status';

function getWeeksOfMonth(date: Date) {
  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = startOfMonth(date);
  const firstDayWeek = (getDay(firstDayOfMonth) + 6) % 7; // Lunes=0, Domingo=6
  const days: Date[] = [];

  // Días del mes anterior para completar la primera semana
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    const d = subDays(firstDayOfMonth, i + 1);
    days.push(d);
  }
  // Días del mes actual
  for (let i = 0; i < daysInMonth; i++) {
    const d = new Date(firstDayOfMonth);
    d.setDate(i + 1);
    days.push(d);
  }
  // Días del mes siguiente para completar la última semana
  const lastDayOfMonth = new Date(firstDayOfMonth);
  lastDayOfMonth.setDate(daysInMonth);
  const lastDayWeek = (getDay(lastDayOfMonth) + 6) % 7;
  if (lastDayWeek !== 6) {
    for (let i = 1; i <= 6 - lastDayWeek; i++) {
      days.push(addDays(lastDayOfMonth, i));
    }
  }
  // Agrupar en semanas
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

function firestoreTimestampToDate(ts: { seconds: number; nanoseconds: number }): Date {
  return new Date(ts.seconds * 1000);
}

function formatDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { orders, loading, handleDateFilter } = useOrders(STATUS.ALL);

  const weeks = getWeeksOfMonth(currentDate);

  // Filtrar pedidos por mes mostrado
  const pedidosMes: Pedido[] = orders.filter(p => {
    const d = firestoreTimestampToDate(p.fechaEntrega);
    return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
  });

  const handleMonthChange = (date: Date) => {
    setCurrentDate(date);
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    handleDateFilter(formatDDMMYYYY(firstDay), formatDDMMYYYY(lastDay));
  };

  return (
    <div>
      <div className="calendar-controls">
        <button onClick={() => handleMonthChange(subMonths(currentDate, 1))}>{'<'}</button>
        <input
          type="month"
          value={format(currentDate, 'yyyy-MM')}
          onChange={e => handleMonthChange(addMonths(new Date(e.target.value), 1))}
        />
        <button onClick={() => handleMonthChange(addMonths(currentDate, 1))}>{'>'}</button>
      </div>
      {loading ? (
        <div>Cargando pedidos...</div>
      ) : (
        <div className="calendar-days">
          {weeks.map((week, idx) => (
            <div className="calendar-week" key={idx} >
              {week.map(date => {
                // Pedidos de este día
                const pedidosDia = pedidosMes.filter(p => {
                  const d = firestoreTimestampToDate(p.fechaEntrega);
                  return format(d, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                });
                return (
                  <DayCalendar
                    key={format(date, 'yyyy-MM-dd')}
                    date={date}
                    pedidos={pedidosDia}
                    isOutsideMonth={date.getMonth() !== currentDate.getMonth()}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 