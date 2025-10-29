
import './Checkbox.css'

function Checkbox({ checked, onChange, disabled }) {
    

    return (
        <label className="neon-checkbox">
            <input checked={checked} onChange={onChange} disabled={disabled} type="checkbox" />
            <div className={`neon-checkbox__frame ${disabled ? "cursor-not-allowed hover:non" : ""}`}>
                <div className="neon-checkbox__box">
                <div className="neon-checkbox__check-container">
                    <svg viewBox="0 0 24 24" className="neon-checkbox__check">
                    <path d="M3,12.5l7,7L21,5"></path>
                    </svg>
                </div>
                <div className="neon-checkbox__glow"></div>
                <div className="neon-checkbox__borders">
                    <span></span><span></span><span></span><span></span>
                </div>
                </div>
                <div className="neon-checkbox__effects">
                <div className="neon-checkbox__particles">
                    <span></span><span></span><span></span><span></span> <span></span
                    ><span></span><span></span><span></span> <span></span><span></span
                    ><span></span><span></span>
                </div>
                <div className="neon-checkbox__rings">
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                </div>
                <div className="neon-checkbox__sparks">
                    <span></span><span></span><span></span><span></span>
                </div>
                </div>
            </div>
        </label>
    )
}

export default Checkbox