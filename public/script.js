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
      const response = await fetch(`/api/search?search=${searchInput}&location=${locationInput}`);
      const data = await response.json();
  
      const resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';
      
      // Pinta en el DOM desde MondoDB
      if (Array.isArray(data.mongoDB) && data.mongoDB.length > 0) {
        data.mongoDB.forEach(result => {
          const card = createCard(result);
          const favButton = createFavButton(card, result);
          card.appendChild(favButton);
          resultsContainer.appendChild(card);
        });
      }
      
      // Pinta en el DOM desde el Scraping
      if (Array.isArray(data.scrapedData) && data.scrapedData.length > 0) {
        data.scrapedData.forEach(result => {
          const alreadyExists = data.mongoDB.find(item => item.name === result.name);
          
          if (!alreadyExists) {
            const card = createCard(result);
            const favButton = createFavButton(card, result);
            card.appendChild(favButton);
            resultsContainer.appendChild(card);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
}

function createCard(result) {
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

  return card;
}

function createFavButton(card, result) {
  const favButton = document.createElement('button');
  favButton.textContent = 'Agregar evento a favoritos';

  favButton.addEventListener('click', async function() {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
      });

      if (response.ok) {
        // Elimina boton de favoritos: after click :)
        favButton.textContent = 'Agregado a favoritos';
        favButton.disabled = true;
      } else {
        console.error('Error al agregar a favoritos');
      }
    } catch (error) {
      console.error(error);
    }
  });

  return favButton;
}

//MENU HAMBURGUESA

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


// ************************DASHBOARD**************************

//POST ADMIN
/**
 * Maneja el evento de envío del formulario.
 *
 * @param {Event} event - El objeto del evento de envío del formulario.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando se completa el evento.
 */
if(document.getElementById('event-form')) {
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
          <p class='data'>${eventData.name}</p>
          <p class='data'>${eventData.image}</p>
          <p class='data'>${eventData.info}</p>
          <p class='data'>${eventData.description}</p>
          <button id='delete'>Eliminar</button>
          <button id='edit'>Editar</button>`

      section.innerHTML += newEvent;
    } else {
      throw new Error('Error al enviar el formulario');
    }
  } catch (error) {
    console.error(error);
  }
})
}

//PUT ADMIN
const eventsDetails = document.querySelector('.event-list-container');
if(document.querySelector('.event-list-container')) {
eventsDetails.addEventListener('click', async function(event) {
  if (event.target.id === 'edit') {
    const eventContainer = event.target.closest('.event-container');
    const eventName = eventContainer.querySelector('p:nth-child(1)').textContent;

    const editForm = document.createElement('form');
    editForm.classList.add('edit-form');

    const currentName = eventContainer.querySelector('p:nth-child(1)').textContent;
    const currentImage = eventContainer.querySelector('p:nth-child(2)').textContent;
    const currentInfo = eventContainer.querySelector('p:nth-child(3)').textContent;
    const currentDescription = eventContainer.querySelector('p:nth-child(4)').textContent;

    editForm.innerHTML = `
      <label for="edit-name">Evento:</label>
      <input type="text" id="edit-name" value="${currentName}">
      <label for="edit-image">Imagen:</label>
      <input type="text" id="edit-image" value="${currentImage}">
      <label for="edit-info">Localización:</label>
      <input type="text" id="edit-info" value="${currentInfo}">
      <label for="edit-description">Descripción:</label>
      <textarea id="edit-description">${currentDescription}</textarea>
      <button type="submit">Actualizar</button>
    `;

    eventContainer.appendChild(editForm);

    editForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const updatedName = document.getElementById('edit-name').value;
      const updatedImage = document.getElementById('edit-image').value;
      const updatedInfo = document.getElementById('edit-info').value;
      const updatedDescription = document.getElementById('edit-description').value;

      const eventData = {
        name: currentName,
        image: currentImage,
        info: currentInfo,
        description: currentDescription,
        new_name: updatedName,
        new_image: updatedImage,
        new_info: updatedInfo,
        new_description: updatedDescription
      };

      try {
        const response = await fetch('/api/ads', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(eventData)
        });

        if (response.ok) {
          const data = await response.json();

          eventContainer.querySelector('p:nth-child(1)').textContent = eventData.new_name;
          eventContainer.querySelector('p:nth-child(2)').textContent = eventData.new_image;
          eventContainer.querySelector('p:nth-child(3)').textContent = eventData.new_info;
          eventContainer.querySelector('p:nth-child(4)').textContent = eventData.new_description;

          editForm.remove();
        } else {
          throw new Error('Error al actualizar el evento');
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
})
};
    

// DELETE ADMIN
const eventsContainer = document.querySelector('.event-list-container');
if(document.querySelector('.event-list-container')) {
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


//***********************SIGN UP Y LOGIN***************************/
// Sign Up
if (document.getElementById('signUpForm')) {
  document.getElementById('signUpForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userData = {
      name: name,
      email: email,
      password: password
    };
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Datos enviados correctamente');
        } else {
          console.error('Error al enviar los datos');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  });
}
//Funcion login
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userData = {
      email: email,
      password: password
    };
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Estado actualizado');
        } else {
          console.error('Error');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  });
}
// Logout
if (document.getElementById('logoutButton')) {
  document.getElementById('logoutButton').addEventListener('click', (event) => {
    event.preventDefault();
  
    window.location.href = ("/logout")
  });
}


//Pintar Favoritos de usuario
if (document.getElementById('getFavs')) {
  document.getElementById('getFavs').addEventListener('click', function(event) {
    event.preventDefault();

    var email = 'prueba@gmail.com';
    var url = '/api/favorites?email=' + encodeURIComponent(email);

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var favorites = Array.isArray(data) ? data : [];
        var mainContainer = document.querySelector('.main-container');

        mainContainer.innerHTML = '';

        favorites.forEach(function(favorite) {
          var favoriteData = {
            name: favorite.name || '',
            date: favorite.date ? favorite.date.slice(0, 10) : '',
            image: favorite.image || '',
            description: favorite.description || ''
          };

          var ulElement = document.createElement('ul');

          Object.keys(favoriteData).forEach(function(key) {
            var liElement = document.createElement('li');
            liElement.textContent = key + ': ' + favoriteData[key];
            ulElement.appendChild(liElement);
          });

          mainContainer.appendChild(ulElement);
        });
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  });
}
//Tarjetas AllUsers
if (document.getElementById('getUsers')) {
  document.getElementById('getUsers').addEventListener('click', function(event) {
    event.preventDefault();

    var url = '/api/user';

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var profiles = Array.isArray(data) ? data : [];
        var mainContainer = document.querySelector('.main-container');

        mainContainer.innerHTML = '';

        profiles.forEach(function(profile) {
          var profileData = {
            name: profile.name || '',
            email: profile.email || '',
            password: '****'
          };

          var ulElement = document.createElement('ul');

          Object.keys(profileData).forEach(function(key) {
            var liElement = document.createElement('li');
            liElement.textContent = key + ': ' + profileData[key];
            ulElement.appendChild(liElement);
          });

          mainContainer.appendChild(ulElement);
        });
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  });
}


//Datos Profile
if (document.querySelector('section.loadProfile')) {
  var email = 'prueba@gmail.com';
  var url = '/api/user?email=' + encodeURIComponent(email);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      var profiles = Array.isArray(data) ? data : [];
      var mainContainer = document.querySelector('section.loadProfile');
      var ulElement = document.createElement('ul');

      profiles.forEach(function(profile) {
        var profileData = {
          name: profile.name,
          email: profile.email,
          password: '****'
        };

        Object.keys(profileData).forEach(function(key) {
          var liElement = document.createElement('li');
          liElement.textContent = key + ': ' + profileData[key];
          ulElement.appendChild(liElement);
        });
      });

      mainContainer.innerHTML = '';
      mainContainer.appendChild(ulElement);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}