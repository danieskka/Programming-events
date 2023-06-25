
if (document.getElementById('searchButton')) {
  document.getElementById('searchButton').addEventListener('click', async function(event) {
    event.preventDefault();
  
    const searchInput = document.getElementById('searchInput').value;
    const locationInput = document.getElementById('locationInput').value;
  
    try {
      
      // Fetch al endpoint que llama a las 2 funciones de buscar (scrap/BBDD Mongodb)
      const response = await fetch(`/api/search?search=${searchInput}&location=${locationInput}`);
      const data = await response.json();
  
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
      
      // Pinta en el DOM desde MondoDB
      if (Array.isArray(data.mongoDB) && data.mongoDB.length > 0) {
        data.mongoDB.forEach(result => {
          const card = document.createElement('div');
          card.classList.add('card');
      
          const title = document.createElement('h3');
          title.textContent = result.name;
      
          const image = document.createElement('img');
          image.src = result.imageg;
      
          const description = document.createElement('p');
          description.textContent = result.description;
      
          card.appendChild(title);
          card.appendChild(image);
          card.appendChild(description);
      
          resultsContainer.appendChild(card);
        });
      }
      
      // Pinta en el DOM desde el Scraping
      if (Array.isArray(data.scrapedData) && data.scrapedData.length > 0) {
        data.scrapedData.forEach(result => {

          const alreadyExists = data.mongoDB.find(item => item.name === result.name);

          if (!alreadyExists) {

          const card = document.createElement('div');
          card.classList.add('card');
      
          const title = document.createElement('h3');
          title.textContent = result.name;
      
          const image = document.createElement('img');
          image.src = result.image;
      
          const description = document.createElement('p');
          description.textContent = result.description;
      
          card.appendChild(title);
          card.appendChild(image);
          card.appendChild(description);
      
          resultsContainer.appendChild(card);
        }
        });
      }
      
    } catch (error) {
      console.error(error);
    }
  });
}

