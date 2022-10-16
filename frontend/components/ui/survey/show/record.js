import { useReactMediaRecorder} from 'react-media-recorder';
import React, {useState} from 'react';

export default function Recorder({blobCallback}) {

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true,blobPropertyBag: { type: "audio/webm" } });

  const [isNowRecording, setIsNowRecording] = useState(false)
  const [previewAudio, setPreviewAudio] = useState(false)

  function onStart() {
    startRecording()
    setIsNowRecording(true)
    setPreviewAudio(false)
  }

  function onStop() {
    stopRecording()
    setIsNowRecording(false)
    setPreviewAudio(true)
  }

  if (setPreviewAudio) {
    blobCallback(mediaBlobUrl)
  }

  return (
    <div>
        <div>
          <div>
            <button onClick={onStart} type="button" className="m-5 btn btn-primary">Record</button>
            <button onClick={onStop} type="button" className="m-5 btn btn-secondary">Stop</button>
          </div>
          <div className="card bg-neutral w-96">
            {previewAudio ? <div><audio src={mediaBlobUrl} controls className="m-8 mx-auto"/></div> : <p></p>}
          </div>
        <div>
            {isNowRecording ? <p>Recording...</p> : <p></p>}
          </div>
        </div>
    </div>
  )
}