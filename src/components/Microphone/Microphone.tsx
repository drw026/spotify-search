import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './Microphone.module.scss';

interface Props {
    setQuery: (query: string) => void
}

const Microphone = ({ setQuery }: Props) => {
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
        resetTranscript
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({ continuous: true });

    if (!browserSupportsSpeechRecognition) {
        return null;
    }

    const startRecording = () => {
        resetTranscript();
        startListening();
    }

    const stopRecording = () => {
        SpeechRecognition.stopListening();
        setQuery(transcript);
    }

    const buttonHandler = () => {
        if (!listening) return startRecording();
        stopRecording();
    }

    return (
        <>
            <button
                className={`${styles.microphone}${listening ? ` ${styles.microphone__on}` : ''}`}
                onMouseDown={buttonHandler}
            >
                <span className={styles.microphone__icon} />
            </button>
        </>
    );
}

export default Microphone;
