import './EmptyList.css'
export function EmptyList({message}:{message:string}){
    return (
        <div className="empty-list">
            {message}
        </div>
    )
}
