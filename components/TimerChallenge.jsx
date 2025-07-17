import { useState, useRef } from 'react';
import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();

    const [started, setStarted] = useState(false);
    const [expired, setExpired] = useState(false);

    function handleStart() {
        setStarted(true);
        timer.current = setTimeout(() => {
            setExpired(true);
            dialog.current.showModal();
        }, targetTime * 1000);
    }

    function handleStop() {
        clearTimeout(timer.current);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} seconds{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={started ? handleStop : handleStart}>
                        {started ? 'Stop' : 'Start'} challenge
                    </button>
                </p>
                <p className={started ? 'active' : ''}>
                    {started ? 'Time is running...' : 'Timer inactivated'}
                </p>
            </section>
        </>
    );
}