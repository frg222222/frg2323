function time() {
    const d = new Date();
    document.getElementById("timer").innerHTML = d.toLocaleTimeString();
}

function blink() {
    const timer = document.getElementById("timer");
    timer.style.opacity = timer.style.opacity === "1" ? "0" : "1";
}

time();
setInterval(time, 1000);
setInterval(blink, 500);
