if (document.getElementById('searchButton')) {
  document.getElementById('searchButton').addEventListener('click', async function(event) {
    event.preventDefault();
  
    const searchInput = document.getElementById('searchInput').value;
  
    try {
      
      const response = await fetch(`/api/search?search=${searchInput}`);
      const data = await response.json();
  
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
      
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(result => {
          const card = document.createElement('div');
          card.classList.add('card');
  
          const title = document.createElement('h3');
          title.textContent = result.name;
  
          const image = document.createElement('img');
          image.src = result.img;
  
          const description = document.createElement('p');
          description.textContent = result.description;
  
          card.appendChild(title);
          card.appendChild(image);
          card.appendChild(description);
  
          resultsContainer.appendChild(card);
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
}