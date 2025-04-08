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
// Initialize baseDate
let baseDate = null;

// Function to pad single digits with a leading zero
function checkMinutes(i) {
    return (i < 10) ? "0" + i : i;
}



// Function to fetch the current time data from the Netlify Function
async function getData() {
    const url = '/.netlify/functions/fetchTime';
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text();
            console.error('Error response:', text);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // Initialize baseDate with the fetched datetime
        baseDate = new Date(data.datetime);

        // Start the clock update loop
        updateTime();
    } catch (error) {
        console.error('Error fetching time data:', error);
    }
}



// Function to update the time display every second
function updateTime() {
    if (!baseDate) return;

    // Increment seconds
    baseDate.setSeconds(baseDate.getSeconds() + 1);

    let h = baseDate.getHours();
    const m = checkMinutes(baseDate.getMinutes());
    const s = checkMinutes(baseDate.getSeconds());
    const half = h < 12 ? "AM" : "PM";

    // Convert to 12-hour format
    h = h % 12 || 12;

    // Update the time display
    document.getElementById('curr-time').innerHTML = `${h}:${m}:${s} ${half} (PST)`;
    //console.log(s);

    // Schedule the next update
    setTimeout(updateTime, 1000);
}
