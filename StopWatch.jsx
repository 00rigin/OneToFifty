import React, {useState, useEffect} from "react";

const StopWatch = ({timerIsRunning, reset}) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (timerIsRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!timerIsRunning && !reset) {
            clearInterval(interval);
        }
        else if (reset) {
            clearInterval(interval);
            setTime(0);
        }
        return () => clearInterval(interval);
    },[timerIsRunning, reset]);

    return(
        <>
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
            <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </>
    );


};

export default StopWatch;