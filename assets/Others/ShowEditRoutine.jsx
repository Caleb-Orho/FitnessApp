import { useState } from "react";
import { pen, remove, duplicate } from "../SVG";

const ShowEditRoutine = ({ setEditRoutineIndex, setShowOption }) => {
    const [index, setIndex] = useState(-1);


    return (
        // absolute inset-0 bottom-0 
        <div className="px-5 overflow-y-auto h-48 fixed bottom-0 left-0 right-0 rounded-lg flex flex-col justify-between gap-2">

            <div className="w-full grid divide-y bg-blue-700 h-full rounded-md">

                <button className="w-full text-white text-sm font-semibold h-full flex flex-row items-center justify-center gap-3"
                    onClick={() => {
                        // setEditRoutineIndex(prevOptionIndex => [prevOptionIndex[0], 0]);
                        setShowOption(false);
                    }}
                >
                    <img src={duplicate} className='w-6' alt="add" />
                    Duplicate
                </button>

                <button className="w-full text-white text-sm font-semibold h-full flex flex-row items-center justify-center gap-3 "
                    onClick={() => {
                        setEditRoutineIndex(2);
                        setShowOption(false);
                    }}
                >
                    <img src={pen} className='w-6' alt="add" />
                    Edit Routine
                </button>

                <button
                    className="w-full text-white text-sm font-semibold h-full flex items-center justify-center gap-3"
                    onClick={() => {
                        // setEditRoutineIndex(prevOptionIndex => [prevOptionIndex[0], 2]);
                        setEditRoutineIndex(1);
                        setShowOption(false);
                    }}
                >
                    <img src={remove} className='w-6' alt="add" />
                    Delete Routine
                </button>

            </div>

            <button className="h-16 bg-blue-700 rounded-md mb-2 text-white text-sm font-semibold"
                onClick={() => {
                    setShowOption(false);
                }}
            >
                Cancel
            </button>
        </div>
    )
}

export default ShowEditRoutine