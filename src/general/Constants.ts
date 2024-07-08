import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

export const catalogs = {
    sabores:'sabores',
    gelatinas:'tipo_gelatina',
    pizzas: 'tipo_pizza',
    pastel: 'tipo_pastel',
    panes:'panes'
}


export const productModelInit = {
    id:0,
    text:'',
    size:0,
    comments: '',
    product: {
        nameProduct: '',
        thumbnail: '',    
        type: '',
        flavor:'',
    }
}

export const paginationInit = {
    pageSize: 10,
    page : 0,
    totalItems: 0
}



export const predefinedRanges = [
    {
      label: 'Hoy',
      value: [new Date(), new Date()],
      placement: 'left'
    },
    {
      label: 'Mañana',
      value: [addDays(new Date(), +1), addDays(new Date(), +1)],
      placement: 'left'
    },
    {
      label: 'Esta semana',
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
      placement: 'left'
    },
    {
      label: 'Este mes',
      value: [startOfMonth(new Date()), endOfMonth(new Date())],
      placement: 'left'
    }
  ];
  

 

export const CATALOGS = {
  flavor:'flavor', 
  typePaymment:'typePaymment',
  typeProduct:'typeProduct',
  sizeProduct:'sizeProduct'
};