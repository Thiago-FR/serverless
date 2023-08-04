import React from 'react';
import { Toggle } from './Toggle';
import data from './data/data.json'

function SideBar({
    editGraphic,
    handleGraphic,
    setUser,
    user
}) {
    const { years, buttonGraphics } = data;

    return(
        <aside className='leftBar'>
            <div className='d-flex flex-column m-3'>
                {
                    years.map((year) => (
                        <button
                            className='btn btn-primary mt-1 btn-lg'
                            type='button'
                            onClick={() => setUser({ ...user, ano: year })}
                        >
                            {year}
                        </button>
                    ))
                }
            </div>
            <div>
                {
                    Object.keys(buttonGraphics).map((key) => (
                        <Toggle
                            label={key}
                            toggled={editGraphic[buttonGraphics[key]]}
                            onClick={() => handleGraphic({ [buttonGraphics[key]]: !editGraphic[buttonGraphics[key]] })}
                        />
                    ))
                }
                <div className='d-flex flex-column'>
                    <label>
                        <strong>PointColor</strong>
                    </label>
                    <input
                        type='color'
                        value={editGraphic.pointColor}
                        onChange={({ target }) => handleGraphic({ pointColor: target.value })}
                    />
                </div>
            </div>
        </aside>
    );
}

export default SideBar;