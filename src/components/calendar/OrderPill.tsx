import React from 'react';
import { format } from 'date-fns';
import { Pedido } from '../../general/interfaces/pedido';
import './OrderPill.css';
import { useNavigate } from 'react-router-dom';

function firestoreTimestampToDate(ts: { seconds: number; nanoseconds: number }): Date {
  return new Date(ts.seconds * 1000);
}

export default function OrderPill({ pedido }: { pedido: Pedido }) {
  const navigate = useNavigate();
  const horaEntrega = format(firestoreTimestampToDate(pedido.fechaEntrega), 'HH:mm');
  const handleClick = () => {
    if (pedido.id) {
      navigate(`/order/${pedido.id}`);
    }
  };
  return (
    <li className="order-pill" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <span className="order-pill-hora">{horaEntrega}</span> <br />
      <span className="order-pill-cliente">{pedido.cliente}</span> <br/>
      <span className="order-pill-lugar">{pedido.lugarEntrega}</span>
    </li>
  );
} 