
import { FaCheckSquare, FaHourglassStart, FaQuestion } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { ReactNode } from "react";

// Enum único para todos los estatus
export enum STATUS {
  DONE = "DONE",
  BACKLOG = "BACKLOG",
  CANCELED = "CANCELED",
  INCOMPLETE = "INCOMPLETE",
  DELETE = "DELETE",
  ALL = "ALL",
}

// Mapeo centralizado de clases por estatus
export const classBorderStatusEnum: Record<STATUS, string> = {
  [STATUS.DONE]: "border-status-success",
  [STATUS.BACKLOG]: "border-status-backlog",
  [STATUS.CANCELED]: "border-status-wrong",
  [STATUS.INCOMPLETE]: "border-status-incomplete",
  [STATUS.DELETE]: "border-status-default",
  [STATUS.ALL]: "border-status-default",
};

export const classColorStatusEnum: Record<STATUS, string> = {
    [STATUS.DONE]: "color-success",
    [STATUS.BACKLOG]: "color-backlog",
    [STATUS.CANCELED]: "color-wrong",
    [STATUS.INCOMPLETE]: "color-incomplete",
    [STATUS.DELETE]: "color-wrong",
    [STATUS.ALL]: "color-success",
  };

// Mapeo centralizado de iconos por estatus
const statusIconMap: Record<STATUS, (size: string) => ReactNode> = {
  [STATUS.DONE]: (size) => (
    <FaCheckSquare title="Listo" size={size} className="color-success" />
  ),
  [STATUS.BACKLOG]: (size) => (
    <FaHourglassStart title="Por hacer" size={size} className="color-backlog" />
  ),
  [STATUS.CANCELED]: (size) => (
    <MdOutlineCancel title="Cancelado" size={size} className="color-wrong" />
  ),
  [STATUS.INCOMPLETE]: (size) => (
    <FaQuestion title="Incompleto" size={size} className="color-incomplete" />
  ),
  [STATUS.DELETE]: (size) => (
    <FaQuestion title="Eliminado" size={size} className="color-default" />
  ),
  [STATUS.ALL]: (size) => (
    <FaQuestion title="Todos" size={size} className="color-default" />
  ),
};

// Función para obtener el icono según el estatus
export const iconStatusEnum = (status: STATUS, size: string): ReactNode => {
  return statusIconMap[status]?.(size) ?? <FaQuestion title="Desconocido" size={size} className="color-default" />;
};

// Array para filtros de botones
export const estatusButtonsArray = [
  { label: "Todo", value: STATUS.ALL },
  { label: "Incompleto", value: STATUS.INCOMPLETE },
  { label: "Por hacer", value: STATUS.BACKLOG },
  { label: "Entregado", value: STATUS.DONE },
  { label: "Cancelado", value: STATUS.CANCELED },
];