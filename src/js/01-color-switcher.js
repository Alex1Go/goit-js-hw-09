function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let changeColor = null
startBtn.addEventListener('click', () => {
    changeColor = setInterval(() => { document.body.style.backgroundColor = getRandomHexColor() }, 1000);
   if (startBtn) {
       startBtn.disabled = true;
       stopBtn.disabled = false;
    }; 
});

stopBtn.addEventListener('click', () => {
    clearInterval(changeColor);
    if(stopBtn) {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };
});

