import { CatalogTypeDto } from '../../../general/Dtos';
import './Option.css';

export function Option(
    { option, isSelected=false, onSelect }: 
    { option: CatalogTypeDto; isSelected: boolean; onSelect: CallableFunction }) {
        
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