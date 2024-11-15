const dataApiUrl = 'https://api.slingacademy.com/v1/sample-data/photos?limit=20';

function generateCard(container, data, total){
    const imgId = 'cardImg' + data.id;
    container.innerHTML += 
    `<div class="card-container">
        <div class="card-header">
            <h4 class="card-title">${data.title}</h4>
            <p class="card-index"> ${data.id} / ${total}</p>
        </div>
        <div class="card-img" id="${imgId}"></div>
        <div class="card-footer">${data.description}</div>
    </div>`
    
    const imgContainer = document.getElementById(imgId);
    imgContainer.appendChild(addImage(data.url))
}

function addImage(url){
    const imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.style.maxWidth = "500px";
    return imgElement
}


async function fetchImageUrls(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

function generateCardList(fullData) {
    const total = fullData.photos.length;
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    fullData.photos.forEach(data => {
        generateCard(container, data, total)
    });
}

(async () => {
    const cardsData = await fetchImageUrls(dataApiUrl);
    generateCardList(cardsData);
})();
