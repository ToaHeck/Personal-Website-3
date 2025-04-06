import 'bootstrap';

// Create the cursor glow element dynamically
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

// Update the glow position directly on mouse move
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cursorGlow.style.left = `${mouseX}px`;
    cursorGlow.style.top = `${mouseY}px`;
});



document.addEventListener("DOMContentLoaded", function() {
    // Function to close the splash screen
    function closeSplash() {
        const splash = document.getElementById("splash-screen");
        splash.classList.add("hidden"); // Trigger the fade-out

        // Wait for the transition to complete before removing from DOM
        setTimeout(() => splash.remove(), 800); // Matches the CSS transition duration
    }

    // Attach the event listener to the button after the DOM is fully loaded
    const enterButton = document.querySelector("#splash-screen button");
    if (enterButton) {
        enterButton.addEventListener("click", closeSplash);
    }

    
    //start clock
    getData();
});




// Clock update
let baseDate;

function checkMinutes(i) {
    return (i < 10) ? "0" + i : i;
}

async function getData() {
    const url = 'https://timeapi.io/api/time/current/zone?timeZone=America%2FLos_Angeles';

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);

        // Using dateTime from the API response
        baseDate = new Date(data.dateTime);
        updateTime();
    } catch (error) {
        console.error("Error fetching time:", error);
    }
}

function updateTime() {
    if (!baseDate) return;

    // Increment seconds
    baseDate.setSeconds(baseDate.getSeconds() + 1);

    let h = baseDate.getHours();
    const m = checkMinutes(baseDate.getMinutes());
    const s = checkMinutes(baseDate.getSeconds()); // Using checkMinutes for seconds
    const half = h < 12 ? "AM" : "PM";

    // Fix hour display
    let hour = h;
    if (h > 12) {
        hour = h - 12;
    } else if (h === 0) {
        hour = 12; // Handle midnight
    }

    document.getElementById('curr-time').innerHTML = `${hour}:${m}:${s} ${half} (PST)`;
    
    setTimeout(updateTime, 1000);
}

