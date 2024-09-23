import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../css/rangeinput.css'

function Filter() {
    const navigate = useNavigate()
    // const [priceRange,setPriceRange] = useState(40)
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [data, setData] = useState({price:20})
    function changeHandler(e) {
        if(e.target.type==="range"){
            setData({ ...data, [e.target.id]: e.target.value })
        }else{
        setData({ ...data, [e.target.id]: e.target.checked })
        }
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
                    {/* <div className='border-2 p-1 rounded-md'>
                        <input type="checkbox" />EGG

                    </div> */}
                </div>
            </div>
            <div className='w-full h-[1px] bg-black'></div>
            <div className='flex gap-3'>
                <input type="range" id='price' className='min-w-52 max-w-52 price-range-input' min={5} max={400} value={data.price} onChange={changeHandler} />
                <p className='text-xs'>Set Price Range: <span className='font-bold text-sm text-center'>{data.price}</span></p>
            </div>
            <div className='w-full h-[1px] bg-black'></div>
           
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


            <button type="button" onClick={submitHandler} className="mx-auto mt-2 bg-[rgba(0,100,60,1)] w-full text-white flex justify-center items-center p-1 rounded-md text-[20px] font-bold">
                START SWIPING{">>"}
            </button>


        </div>
    )
}

export default Filter