const ShowTimer = ({ setRestTime, setTimerPicker }) => {
    const timers = Array.from({ length: 61 / 5 }, (_, index) => index * 5);

    const handleAdd = (seconds) => {
        setRestTime(seconds);
        setTimerPicker(false);
    };

    return (
        // absolute inset-0 bottom-0 
        <div className="overflow-y-auto h-48 bg-blue-700 fixed bottom-0 left-0 right-0 flex items-center flex-col rounded-lg">

            <div className="w-full flex justify-end">
                <button className='text-white font-bold mr-6 mt-2' onClick={() => setTimerPicker(false)}>
                    Done
                </button>
            </div>

            <p className='text-white font-bold mt-6'>
                Rest Timer - Bench Press
            </p>

            {timers.map((seconds) => (
                <button className="mt-2 text-white text-sm font-semibold  w-full rounded h-7"
                    key={seconds}
                    onClick={() => handleAdd(seconds)} >
                    {seconds === 0 ? 'OFF' : `${seconds}s`}
                </button>
            ))}
        </div>
    )
}

export default ShowTimer