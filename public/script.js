// if (document.getElementById('searchButton')) {
//   document.getElementById('searchButton').addEventListener('click', async function(event) {
//     event.preventDefault();
  
//     const searchInput = document.getElementById('searchInput').value;
  
//     try {
//       if (searchInput.trim() === '') {
//         console.log('Ingresa un término de búsqueda válido');
//         return;
//       }

//       const response = await fetch(`/api/search?search=${searchInput}`);
//       const data = await response.json();
  
//       const resultsContainer = document.getElementById('results');
//       resultsContainer.innerHTML = '';
      
//       if (Array.isArray(data) && data.length > 0) {
//         data.forEach(result => {
//           const card = document.createElement('div');
//           card.classList.add('card');
  
//           const title = document.createElement('h3');
//           title.textContent = result.name;
  
//           const image = document.createElement('img');
//           image.src = result.img;
  
//           const description = document.createElement('p');
//           description.textContent = result.description;
  
//           card.appendChild(title);
//           card.appendChild(image);
//           card.appendChild(description);
  
//           resultsContainer.appendChild(card);
//         });
//       } else {
//         const noResultsMessage = document.createElement('p');
//         noResultsMessage.textContent = 'No se encontraron resultados.';
//         resultsContainer.appendChild(noResultsMessage);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   });
// }

if (document.getElementById('searchButton')) {
  document.getElementById('searchButton').addEventListener('click', async function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value;

    try {
      const response = await fetch(`/api/search?search=${searchInput}`);
      const html = await response.text();

      // Inserta el HTML recibido en el DOM
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = html;

    } catch (error) {
      console.error(error);
    }
  });
}

