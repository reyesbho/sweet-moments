export interface CatalogTypeDto{
    id: string;
    descripcion: string;
    estatus: boolean;
    selfDelete: CallableFunction | undefined ;
    selfUpdateEstatus: CallableFunction | undefined;
    tags?: string[];
    imagen?: string;
    tag?:string;
}


export interface NewCatalogTypeDto{
    id: string;
    descripcion: string;
    estatus: boolean;
    tags: string[];
}
