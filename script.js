const apiKey = "AIzaSyAx2APCQqJRJRFw1pmrIRLDlu8I1v8zaw4"; // Replace with your actual YouTube API key

// Function to analyze mood based on user input (basic mock sentiment analysis)
async function analyzeMood() {
    const moodInput = document.getElementById('moodInput').value;

    if (!moodInput) {
        alert("Please enter how you're feeling!");
        return;
    }

    // Mock sentiment analysis (replace with a more sophisticated analysis if needed)
    let detectedMood = 'neutral';
    if (moodInput.includes("happy") || moodInput.includes("great")) {
        detectedMood = "happy";
    } else if (moodInput.includes("sad") || moodInput.includes("down")) {
        detectedMood = "sad";
    } else if (moodInput.includes("motivated") || moodInput.includes("excited")) {
        detectedMood = "motivated";
    } else if (moodInput.includes("relaxed") || moodInput.includes("calm")) {
        detectedMood = "relaxed";
    }

    // Clear previous content
    document.getElementById('contentContainer').innerHTML = "";

    // Fetch and display YouTube content based on the detected mood
    fetchYouTubeContent(detectedMood);
}

// Function to fetch YouTube content based on mood
async function fetchYouTubeContent(mood) {
    const contentContainer = document.getElementById('contentContainer');
    let query;

    // Define queries based on the detected mood
    switch (mood) {
        case "happy":
            query = "funny videos";
            break;
        case "sad":
            query = "uplifting videos";
            break;
        case "motivated":
            query = "motivational speeches";
            break;
        case "relaxed":
            query = "relaxing music";
            break;
        default:
            query = "general feel-good videos";
    }

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${apiKey}`);
        const data = await response.json();

        data.items.forEach(item => {
            const videoItem = document.createElement('div');
            videoItem.className = 'content-item';
            videoItem.innerHTML = `
                <h3>${item.snippet.title}</h3>
                <iframe width="100%" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
            `;
            contentContainer.appendChild(videoItem);
        });
    } catch (error) {
        console.error("Error fetching YouTube content:", error);
        contentContainer.innerHTML = "<p>Sorry, there was an error fetching the content.</p>";
    }
}

// Attach the function to the button
document.getElementById('analyzeButton').addEventListener('click', analyzeMood);
