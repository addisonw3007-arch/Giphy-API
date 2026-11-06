console.log("script.js loaded");

const apiKey = "2TnRyUWuYyPZjeg6OKcNjt2XxIpCJh3A";

const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=cats&limit=10&rating=g`;
async function fetchGifs(searchTerm) {
    try {
        const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=10&rating=g`;

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error("Failed to fetch GIFs");
        }

        const data = await response.json();

        const images = data.data.map(gif => gif.images.original.url);

        console.log(images);

        return images;
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        return [];
    }
}

const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

fetchButton.addEventListener("click", async function () {
    const searchTerm = searchInput.value.trim() || "cats";
    const images = await fetchGifs(searchTerm);

    gifContainer.innerHTML = "";

    images.forEach(function (imageUrl) {
        gifContainer.innerHTML += `<img src="${imageUrl}" class="col-3 mb-3" alt="Giphy GIF">`;
    });
});