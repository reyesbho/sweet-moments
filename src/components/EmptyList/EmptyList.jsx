import './EmptyList.css'
export function EmptyList({message}){
    return (
        <div className="empty-list">
            {message}
        </div>
    )
}
