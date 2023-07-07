export const dateOptions = {
    hour12 : true,
    hourCycle: "h12",
    month: "2-digit",
    year:"numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
}


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