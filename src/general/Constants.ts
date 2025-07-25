import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import { z } from "zod";

export const AddNewProductSchema = z.object({
  cantidad: z.coerce.number().min(1, "Ingrese una cantidad válida"),
  idSize: z.coerce.string().min(1, "Seleccione un tamaño"),
  precio: z.coerce.number().min(0.01, "Ingrese un precio válido"),
  caracteristicas: z.string().optional(),
});

export type AddNewProductForm = z.infer<typeof AddNewProductSchema>;

export const catalogs = {
    sabores:'sabores',
    gelatinas:'tipo_gelatina',
    pizzas: 'tipo_pizza',
    pastel: 'tipo_pastel',
    panes:'panes'
}


export const paginationInit = {
    pageSize: 10,
    page : 0,
    totalItems: 0
}



export const predefinedRanges = [
    {
      label: 'Hoy',
      value: [new Date(), new Date()] as [Date, Date],
      placement: 'left'
    },
    {
      label: 'Mañana',
      value: [addDays(new Date(), +1), addDays(new Date(), +1)] as [Date, Date],
      placement: 'left'
    },
    {
      label: 'Esta semana',
      value: [startOfWeek(new Date()), endOfWeek(new Date())] as [Date, Date],
      placement: 'left'
    },
    {
      label: 'Este mes',
      value: [startOfMonth(new Date()), endOfMonth(new Date())] as [Date, Date],
      placement: 'left'
    }
  ];
  

 

export const CATALOGS = {
  flavor:'flavor', 
  typePaymment:'typePaymment',
  typeProduct:'typeProduct',
  sizeProduct:'sizeProduct',
  products:'products'
};


export const convertImageToWebP = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const img = new Image();

      reader.onload = (e) => {
      img.src = e.target?.result as string;
      };

      img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = 150;
      canvas.height = 150;

      if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob(
          (blob) => {
              if (blob) resolve(blob);
              else reject(new Error('No se pudo convertir a WebP'));
          },
          'image/webp',
          0.8
          );
      } else {
          reject(new Error('Canvas context inválido'));
      }
      };

      reader.onerror = reject;
      img.onerror = reject;

      reader.readAsDataURL(file);
  });
  }

  export const CATALOG_ESTATUS = {
      ACTIVO: 'ACTIVO',
      INACTIVO: 'INACTIVO'
  }