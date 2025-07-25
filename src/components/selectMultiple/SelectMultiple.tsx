import { CatalogTypeDto } from "../../general/Dtos";
import { Producto } from "../../general/interfaces/pedido";
import { Option } from "./option/Option";
import './SelectMultiple.css';

export function SelectMultiple({ options, selectedValues, onChange }:
    { options: CatalogTypeDto[], selectedValues: Producto[], onChange: CallableFunction}) {
    
    return (
        <div className="select-multiple">
            {options.map(option => (
                <Option
                    key={option.id}
                    option={option}
                    isSelected={selectedValues.some(reg => reg.id === option.id)}
                    onSelect={onChange}
                />
            ))}
        </div>
    );
}