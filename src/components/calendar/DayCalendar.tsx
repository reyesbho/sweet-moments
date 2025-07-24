import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import './DayCalendar.css';
import { Pedido } from '../../general/interfaces/pedido';
import OrderPill from './OrderPill';
import { useNavigate } from 'react-router-dom';

function firestoreTimestampToDate(ts: { seconds: number; nanoseconds: number }): Date {
  return new Date(ts.seconds * 1000);
}

export default function DayCalendar({ date, pedidos, isOutsideMonth = false }: { date: Date, pedidos: Pedido[], isOutsideMonth?: boolean }) {
  // Ordenar pedidos por hora de entrega
  const pedidosOrdenados = [...pedidos].sort((a, b) => {
    const horaA = firestoreTimestampToDate(a.fechaEntrega);
    const horaB = firestoreTimestampToDate(b.fechaEntrega);
    return horaA.getTime() - horaB.getTime();
  });

  const diaSemana = format(date, 'EEEE', { locale: es });
  const navigate = useNavigate();
  const handleClick = (event:React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if(isOutsideMonth || !pedidos || pedidos.length == 0){
      return;
    }
    const formattedDate = format(date, 'dd-MM-yyyy');
    navigate(`/`, {state:{date: formattedDate}});
  };

  return (
     <div className={`dia-calendar${isOutsideMonth ? ' dia-calendar-outside-month' : ''}`}>
      <span className='dia-calendar-dia-semana' onClick={handleClick} ><span> {diaSemana}</span><span>{format(date, 'd')}</span></span>
      <ul className="dia-calendar-lista">
        {pedidosOrdenados.length === 0 ? (
          <li className="dia-calendar-sin-pedidos">Sin pedidos</li>
        ) : (
          pedidosOrdenados.map((pedido, idx) => (
            <OrderPill key={pedido.id || idx} pedido={pedido} />
          ))
        )}
      </ul>
    </div>
  );
} 