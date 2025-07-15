export interface CatalogTypeDto{
    id: string;
    descripcion: string;
    estatus: boolean;
    selfDelete: CallableFunction | undefined ;
    selfUpdateEstatus: CallableFunction | undefined;
    tags: string[];
}
