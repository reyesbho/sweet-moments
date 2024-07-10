import { useState } from "react";

export function TableComponent({title, children, configTable, hasImage=false}:
    {title?:string, children:any, configTable:{columns:string[]}, hasImage?:boolean}){
        const [columns, setColumns] = useState<string[]>(
            (hasImage ? configTable.columns : configTable.columns.filter((column) => column!=='Imagen'))
        )
    return(
        <div className="table-container">
            <div className="table-title">
                {title && <h3>{title}</h3>}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        {columns && columns.map((head)=>(
                            <th key={head}>{head}</th>    
                        ))}
                    </tr>
                </thead>
                    {children}
            </table>
    </div>
    )
}