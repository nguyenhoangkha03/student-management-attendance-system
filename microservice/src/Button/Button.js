import './Button.css'

export default function Button({children, onClick}){
    return (
        <button onClick={onClick} className="mt-4">
            {children}
        </button>
    )
}