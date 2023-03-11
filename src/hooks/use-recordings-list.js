import { useState, useEffect } from "react";
import { deleteAudio } from "../handlers/recordings-list";

export default function useRecordingsList(audio) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio)
      setRecordings((prevState) => {
        return [...prevState, { key: 1, audio }];
      });
  }, [audio]);

  return {
    recordings,
    deleteAudio: (audioKey) => deleteAudio(audioKey, setRecordings),
  };
}
