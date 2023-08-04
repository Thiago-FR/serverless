import './toggle.css'

export const Toggle = ({ label, toggled, onClick }) => {

    return (
        <>
            <div className='switch-container'>
                <span>{label}</span>
                <label className="switch">
                    <input type="checkbox" checked={toggled} onClick={onClick}/>
                    <span className="slider"></span>
                </label>
            </div>
        </>
    )
}