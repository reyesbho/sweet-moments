import { STATUS } from "../Status";

// Marca de tiempo tipo Firestore
export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Producto {
  imagen:string | undefined,
  descripcion: string;
  id: string;
  tag: string;
}

export interface Size {
  id: string;
  descripcion: string;
  tags: string[];
}

export interface ProductoPedido {
  id?: string;
  size: Size;
  cantidad: number;
  producto: Producto;
  caracteristicas: string[];
  precio: number;
}

export interface Pedido {
  id: string | undefined;
  total?: number;
  cliente: string;
  lugarEntrega: string;
  fechaCreacion?: FirestoreTimestamp;
  estatusPago?: 'PENDIENTE' | 'PAGADO';
  registradoPor?: string;
  productos?: ProductoPedido[];
  estatus?: STATUS.BACKLOG | STATUS.CANCELED | STATUS.DELETE | STATUS.DONE | STATUS.INCOMPLETE;
  fechaEntrega: FirestoreTimestamp;
}


export interface PedidosResponse {
  pedidos:Pedido[],
  nextCursor: string,
  hasMore: boolean,
  total: number
}