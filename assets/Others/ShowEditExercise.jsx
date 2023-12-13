import { useState } from "react";
import { add2, remove, repeat, updown } from "../SVG";

const ShowEditExercise = ({ setOptionIndex, setShowOption }) => {
    const [index, setIndex] = useState(-1);

    const handleAdd = (seconds) => {
        setRestTime(seconds);
        setTimerPicker(false);
    };

    return (
        // absolute inset-0 bottom-0 
        <div className="px-5 overflow-y-auto h-40 fixed bottom-0 left-0 right-0 rounded-lg flex flex-col justify-between gap-2">

            <div className="w-full grid divide-y bg-blue-700 h-full rounded-md">

                {/* <button className="w-full text-white text-sm font-semibold h-full flex flex-row items-center justify-center gap-3"
                    onClick={() => {
                        setOptionIndex(prevOptionIndex => [prevOptionIndex[0], 0]);
                        setShowOption(false);
                    }}
                >
                    <img src={updown} className='w-6' alt="add" />
                    Reorder Exercises
                </button> */}

                <button className="w-full text-white text-sm font-semibold h-full flex flex-row items-center justify-center gap-3 "
                    onClick={() => {
                        setOptionIndex(prevOptionIndex => [prevOptionIndex[0], 1]);
                        setShowOption(false);
                    }}
                >
                    <img src={repeat} className='w-6' alt="add" />
                    Replace Exercise
                </button>

                <button
                    className="w-full text-white text-sm font-semibold h-full flex items-center justify-center gap-3"
                    onClick={() => {
                        setOptionIndex(prevOptionIndex => [prevOptionIndex[0], 2]);
                        setShowOption(false);
                    }}
                >
                    <img src={remove} className='w-6' alt="add" />
                    Remove Exercise
                </button>

            </div>

            <button className="h-16 bg-blue-700 rounded-md mb-2 text-white text-sm font-semibold"
                onClick={() => {
                    setOptionIndex(prevOptionIndex => [prevOptionIndex[0], 3]);
                    setShowOption(false);
                }}
            >
                Cancel
            </button>
        </div>
    )
}

export default ShowEditExercise