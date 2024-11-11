import React from 'react'
import { ModeToggle } from '../mode-toggle'

const Navbar = () => {
    return (
        <div className='flex justify-between p-8 shadow-2xl'>

            <div>
                <p className='font-serif font-bold text-xl'>Where in the world?</p>
            </div>

            <div className='flex'>

                <div className='cursor-pointer mx-1'>
                    <ModeToggle />
                </div>

            </div>
        </div>
    )
}

export default Navbar