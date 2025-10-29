import { useEffect, useRef } from 'react'
import './ShowResult.css'

export default function ShowResult({ children, classResult }) {
    
    const divRef = useRef()

    useEffect(() => {
        if(classResult === 'success'){
            divRef.current.classList.remove('error')
            divRef.current.classList.add('success')
            divRef.current.classList.add('show')
        }
        else {
            divRef.current.classList.remove('success')
            divRef.current.classList.add('error')
            divRef.current.classList.add('show')
        }
    }, [])

    return (
        <div ref={divRef} className="show-result">
            {children}
        </div>
    )
}