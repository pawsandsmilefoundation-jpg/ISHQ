const dial = document.getElementById("dial");
const audio = document.getElementById("audio");

let dragging = false;
let angle = 0;

dial.addEventListener("touchstart", e => {
  dragging = true;
  audio.pause();
});

window.addEventListener("touchmove", e => {
  if(!dragging) return;

  const touch = e.touches[0];
  const rect = dial.getBoundingClientRect();
  const cx = rect.left + rect.width/2;
  const cy = rect.top + rect.height/2;

  const dx = touch.clientX - cx;
  const dy = touch.clientY - cy;

  angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;

  dial.style.transform = `rotate(${angle}deg)`;

  if(audio.duration){
    const progress = (angle + 180) / 360;
    audio.currentTime = progress * audio.duration;
  }
});

window.addEventListener("touchend", () => {
  if(dragging){
    dragging = false;
    audio.play();
  }
});
