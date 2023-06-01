<script lang="ts">
  export const ssr = false;

  export let audio: HTMLMediaElement;
  export let isPlaying: boolean;

  let audioContext: AudioContext;
  let analyserNode: AnalyserNode;
  let track: MediaElementAudioSourceNode;
  let dataArray: Uint8Array;
  let canvas: HTMLCanvasElement;
  let canvasCtx: CanvasRenderingContext2D;

  const init = () => {
    audio?.setAttribute('crossorigin', 'anonymous');
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 1024;
    analyserNode.maxDecibels = -25;
    analyserNode.minDecibels = -60;
    analyserNode.smoothingTimeConstant = 1;

    track = audioContext.createMediaElementSource(audio);

    track.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    const bufferLength = analyserNode.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    analyserNode.getByteTimeDomainData(dataArray);

    canvas = document.querySelector('#oscilloscope');
    canvasCtx = canvas.getContext('2d');

    function draw() {
      requestAnimationFrame(draw);

      analyserNode.getByteTimeDomainData(dataArray);

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      canvasCtx.fillStyle = 'rgba(255, 255, 255, 0)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = '#ff0000';

      canvasCtx.beginPath();

      var sliceWidth = (canvas.width * 1.0) / bufferLength;
      var x = 0;

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    }

    draw();
  };

  $: {
    if (isPlaying && audioContext == null) {
      init();
    } else if (!isPlaying && canvasCtx) {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
</script>

<canvas
  id="oscilloscope"
  class="align-absolute pointer-events-none absolute z-10 aspect-square w-2/3 select-none rounded-full"
/>
