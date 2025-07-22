import { Producto } from '../../../general/interfaces/pedido';
import './Option.css';

export function Option(
    { option, isSelected, onSelect }: 
    { option: Producto; isSelected: boolean; onSelect: CallableFunction }) {
        
    return (
        <div
            className={`option ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(option)}
        >
            <img className="option-image" src={option.imagen} alt={option.descripcion} />
            <span className='option-label'>{option.descripcion}</span>
        </div>
    );
}