/**
 * Función para el event listener de click en el botón de búsqueda.
 * Realiza una búsqueda utilizando los valores de los campos de búsqueda y ubicación.
 * Muestra los resultados en el DOM.
 * @param {Event} event - El objeto de evento del click.
 */

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

          // Pintar boton favoritos
          const favButton = document.createElement('button');
          favButton.textContent = 'Agregar evento a favoritos';
          card.appendChild(favButton);
        });
      }
      
      // Pinta en el DOM desde el Scraping
      if (Array.isArray(data.scrapedData) && data.scrapedData.length > 0) {
        data.scrapedData.forEach(result => {
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

          // Pintar boton favoritos
          const favButton = document.createElement('button');
          favButton.textContent = 'Agregar evento a favoritos';
          card.appendChild(favButton);
        });
      }
      
    } catch (error) {
      console.error(error);
    }
  });
}


//*********************MENU HAMBURGUESA*********************

/**
 * Función para controlar el toggle del botón del menú y del contenedor de navegación del DOM
 */

const toggleButton = document.getElementById('menu');
const navWrapper = document.getElementById('nav')

toggleButton.addEventListener('click',() => {
  toggleButton.classList.toggle('close')
  navWrapper.classList.toggle('show')
})

navWrapper.addEventListener('click',e => {
  if(e.target.id === 'nav'){
    navWrapper.classList.remove('show')
    toggleButton.classList.remove('close')
  }
})


//Funcion singup
if (document.getElementById('signupButton')) {
  document.getElementById('signupButton').addEventListener('click', function(event) {
    event.preventDefault();
}

// ************************DASHBOARD**************************

//POST ADMIN
//POST ADMIN
/**
 * Maneja el evento de envío del formulario.
 *
 * @param {Event} event - El objeto del evento de envío del formulario.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa el evento.
 */
const form = document.getElementById('event-form');

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  console.log('Formulario enviado'); 

  const name = document.getElementById('name').value;
  const image = document.getElementById('image').value;
  const info = document.getElementById('info').value;
  const description = document.getElementById('description').value;

  const eventData = {
    name,
    image,
    info,
    description
  };

  
  try {
    const response = await fetch('/api/ads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById("message").innerHTML = "Evento creado" 
      console.log(data);
      const eventsContainer = document.querySelector('.event-list-container');
      const section = document.createElement('section');
      section.classList.add('event-container');
      eventsContainer.appendChild(section)

      const newEvent = `
          <p class='data'>Evento: ${eventData.name}</p>
          <p class='data'>Imagen: ${eventData.image}</p>
          <p class='data'>Localización: ${eventData.info}</p>
          <p class='data'>Descripcion: ${eventData.description}</p>
          <button id='delete'>Eliminar</button>
          <button id='edit'>Editar</button>`

      section.innerHTML += newEvent;
    } else {
      throw new Error('Error al enviar el formulario');
    }
  } catch (error) {
    console.error(error);
  }
});

//PUT ADMIN

// const updateButtons = document.querySelectorAll('.edit');

// updateButtons.forEach(updateButton => {
//   updateButton.addEventListener('click', async function() {
//     const eventContainer = updateButton.closest('.event-container');
   

//     const editForm = document.createElement('form');
//     editForm.classList.add('edit-form');

//     editForm.innerHTML = `
//       <label for="edit-name">Nombre:</label>
//       <input type="text" id="edit-name" value="${eventContainer.querySelector('.name').textContent}">
//       <label for="edit-image">Imagen:</label>
//       <input type="text" id="edit-image" value="${eventContainer.querySelector('.image').src}">
//       <label for="edit-info">Información:</label>
//       <input type="text" id="edit-info" value="${eventContainer.querySelector('.info').textContent}">
//       <label for="edit-description">Descripción:</label>
//       <textarea id="edit-description">${eventContainer.querySelector('.description').textContent}</textarea>
//       <button type="submit">Actualizar</button>
//     `;

//     eventContainer.appendChild(editForm);

//     editForm.addEventListener('submit', async function(event) {
//       event.preventDefault();

//       const updatedName = document.getElementById('edit-name').value;
//       const updatedImage = document.getElementById('edit-image').value;
//       const updatedInfo = document.getElementById('edit-info').value;
//       const updatedDescription = document.getElementById('edit-description').value;

//       const updatedEventData = {
//         name: updatedName,
//         image: updatedImage,
//         info: updatedInfo,
//         description: updatedDescription
//       };

//       try {
//         const response = await fetch(`/api/ads`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(updatedEventData)
//         });

//         if (response.ok) {
//           const data = await response.json();

//           eventContainer.querySelector('.name').textContent = data.name;
//           eventContainer.querySelector('.image').src = data.image;
//           eventContainer.querySelector('.info').textContent = data.info;
//           eventContainer.querySelector('.description').textContent = data.description;

//           editForm.remove();
//         } else {
//           throw new Error('Error al actualizar el evento');
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     });
//   });
// })


// const updateButtons = document.querySelectorAll('.edit');
// updateButtons.forEach(updateButton => {
//   updateButton.addEventListener('click', function(event) {
//     if(event.target.textContent === 'Editar'){
//       const eventContainer = updateButton.parenElement.parenElement;
//       const editForm = document.createElement('form');
//       editForm.classList.add('edit-form');
//       editForm.innerHTML = `
//       <label for="name">Nombre:</label>
//       <input type="text" id="name" value="${eventContainer.querySelector('p:nth-child(1)').textContent}">
//       <label for="image">Imagen:</label>
//       <input type="text" id="image" value="${eventContainer.querySelector('p:nth-child(2)').textContent}">
//       <label for="info">Información:</label>
//       <input type="text" id="info" value="${eventContainer.querySelector('p:nth-child(3)').textContent}">
//       <label for="description">Descripción:</label>
//       <textarea id="description">${eventContainer.querySelector('p:nth-child(4)').textContent}</textarea>
//       <button type="submit">Actualizar</button>
//     `;
//     eventContainer.innerHTML += editForm;

//     }
    


// DELETE ADMIN

// const eventsContainer = document.querySelector('.event-list-container');

// eventsContainer.addEventListener('click', function(event) {
//   if (event.target.id === 'delete') {
//     const eventContainer = event.target.closest('.event-container');
//     eventContainer.remove();
//   }
// });

// DELETE ADMIN
const eventsContainer = document.querySelector('.event-list-container');
eventsContainer.addEventListener('click', async function(event) {
  if (event.target.id === 'delete') {
    const eventContainer = event.target.closest('.event-container');
    const eventName = document.querySelector('event-container>p:nth-child(1)')

    try {
      const response = await fetch('/api/ads', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: eventName })
      });

      if (response.ok) {
        eventContainer.remove();
      } else {
        throw new Error('Error al eliminar el evento');
      }
    } catch (error) {
      console.error(error);
    }
  }
});
}
