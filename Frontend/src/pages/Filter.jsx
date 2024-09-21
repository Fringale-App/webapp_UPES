import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Filter() {
    const navigate = useNavigate()
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [data, setData] = useState({})
    function changeHandler(e) {
        setData({ ...data, [e.target.id]: e.target.checked })
    }
    console.log(data)
    function submitHandler (e){
        e.preventDefault();
        navigate('/swipe-filter', {state:data})

    }

    // const handleSelect = (level) => {
    //     setSelectedLevel((prevLevel) => (prevLevel === level ? null : level));
    // };
    return (
        <div className='p-4 flex flex-col gap-2'>
            <div className='flex flex-col justify-center leading-tight'>
                <p className='font-extrabold text-[20px]'>Filtration</p>
                <p className='font-normal text-[12px]'>Lets filter out what you might like to have!</p>
            </div>
            <div className='w-full h-[1px] bg-black'></div>
            <div className='flex flex-col justify-center leading-tight'>
                <p className='font-semibold text-[16px]'>Dietary Preference</p>
                <p className='font-light text-[12px]'>Choose what you prefer for yourself</p>
                <div className='text-[16px] font-semibold text-[rgba(0,0,0,0.5)] flex gap-3 py-2 px-2'>
                    <div className='border-2 p-1 rounded-md'>
                        <input type="checkbox" id='veg' onChange={changeHandler} />VEG

                    </div>
                    <div className='border-2 p-1 rounded-md'>
                        <input type="checkbox" id='nonveg' onChange={changeHandler} />NON VEG

                    </div>
                    <div className='border-2 p-1 rounded-md'>
                        <input type="checkbox" />EGG

                    </div>
                </div>
            </div>
            <div className='w-full h-[1px] bg-black'></div>
            <div>
                <p className='text-[16px] font-semibold'>Any Specific Cuisines</p>
                <p className='text-[12px] font-light'>Select the cuisine you want to have</p>
                <div className="flex justify-between p-2">
                    {/* Left side checkboxes */}
                    <div className="flex flex-col space-y-1">
                        <label className="flex items-center text-[16px] font-semibold">
                            <input type="checkbox" className="mr-2" />
                            Fast Food
                        </label>
                        <label className="flex items-center text-[16px] font-semibold">
                            <input type="checkbox" className="mr-2" />
                            Home Cooked
                        </label>
                        <label className="flex items-center text-[16px] font-semibold">
                            <input type="checkbox" className="mr-2" />
                            Desserts
                        </label>
                        <label className="flex items-center text-[16px] font-semibold">
                            <input type="checkbox" className="mr-2" />
                            Chinese
                        </label>
                    </div>

                    {/* Right side checkboxes */}
                    <div className="flex flex-col space-y-1">
                        <label className="flex items-center text-[16px] font-semibold">
                            <input type="checkbox" className="mr-2" />
                            North Indian
                        </label>
                        <label className="flex items-center text-[16px] font-semibold">
                            <input type="checkbox" className="mr-2" />
                            Italian
                        </label>
                        <label className="flex items-center text-[16px] font-semibold">
                            <input type="checkbox" className="mr-2" />
                            Street Food
                        </label>
                        <label className="flex items-center text-[16px] font-semibold">
                            <input type="checkbox" className="mr-2" />
                            South Indian
                        </label>
                    </div>
                </div>

            </div>
            {/* <div className='w-full h-[1px] bg-black'></div> */}

            {/* <div>
            <h1 className='font-bold text-[18px]'>Spice Level</h1>
            <p className='text-[12px] font-black-300 leading-[20px]'>
                How Much Spice you can handle
            </p>
            <div className='ml-4 flex gap-4'>
                {["Normal", "Moderate", "High"].map((level) => (
                    <div
                        key={level}
                        onClick={() => handleSelect(level)}
                        className={`border-2 p-2 rounded-md cursor-pointer ${
                            selectedLevel === level ? 'bg-green-200 border-green-500' : 'bg-white'
                        }`}
                    >
                        {level}
                    </div>
                ))}
            </div>
        </div> */}


            <button type="button" onClick={submitHandler} className="mx-auto bg-[rgba(0,100,60,1)] w-full text-white flex justify-center items-center p-1 rounded-md text-[20px] font-bold">
                START SWIPING{">>"}
            </button>


        </div>
    )
}

export default Filter