import { useRef, useEffect } from 'react'
import './Toast.css'
function Toast({ type, message, onClose }){

    const toastRef = useRef(null)

    useEffect(() => {
        toastRef.current.classList.remove('hide-toast')
        if(type === 'success'){
            toastRef.current.classList.add('success')
        }
        else {
            toastRef.current.classList.add('error')
        }

        const timeout1 = setTimeout(() => {
            toastRef.current.classList.add('hide-toast')
        }, 3000)

        const timeout2 = setTimeout(() => {
            onClose()
        }, 6000)

        return () => {
            clearTimeout(timeout1)
            clearTimeout(timeout2)
        }
    }, [onClose, message, type])

    return (
        <div className="toast" ref={toastRef}>
            {type === "success" ? <i class="fa-solid fa-circle-check"></i> 
                                : <i class="fa-solid fa-circle-exclamation"></i> }
            <span class="message">{message}!</span>
            <span class="countdown"></span>
        </div>
    )
}

export default Toast