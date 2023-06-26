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
        });
      }
      
    } catch (error) {
      console.error(error);
    }
  });
}


//MENU HAMBURGUESA
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

//POST ADMIN
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
      const eventsContainer = document.querySelector('.event-list-container')
      const newEvent = `
          <p class='data'>Evento: ${eventData.name}</p>
          <p class='data'>Imagen: ${eventData.image}</p>
          <p class='data'>Localización: ${eventData.info}</p>
          <p class='data'>Descripcion: ${eventData.description}</p>
          <button class='detele'>Eliminar</button>
          <button class='edit'>Editar</button>`

      eventsContainer.innerHTML += newEvent;    

      // const deleteButton = document.createElement('button');
      // deleteButton.textContent = 'Eliminar';
      // deleteButton.classList.add('delete');
      
      // const editButton = document.createElement('button');
      // editButton.textContent = 'Editar';
      // editButton.classList.add('edit');    

      
      // newEvent.appendChild(deleteButton);
      // newEvent.appendChild(editButton);
    } else {
      throw new Error('Error al enviar el formulario');
    }
  } catch (error) {
    console.error(error);
  }
});

//PUT ADMIN
const updateButton = document.querySelectorAll('.edit');
updateButton.forEach(updateButton => {
  updateButton.addEventListener('click', async function() {
    const updatedName = document.getElementById('name').value;
    const updatedImage = document.getElementById('image').value;
    const updatedInfo = document.getElementById('info').value;
    const updatedDescription = document.getElementById('description').value;
  
    const updatedEventData = {
      name: updatedName,
      image: updatedImage,
      info: updatedInfo,
      description: updatedDescription
    };
  
    try {
      const response = await fetch('/api/ads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEventData)
      });
  
      if (response.ok) {
        const data = await response.json();
        eventInfo.textContent = `
          Evento: ${data.updatedEventData.name},
          Imagen: ${data.updatedEventData.image},
          Localización: ${data.updatedEventData.info},
          Descripción: ${data.updatedEventData.description}`;
  
        
      } else {
        throw new Error('Error al actualizar el evento');
      }
    } catch (error) {
      console.error(error);
    }
  })
})

//DELETE ADMIN
const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(deleteButton => {
  deleteButton.addEventListener('click', async function() {
    const eventElement = deleteButton.parentElement;
    const events = eventElement.getElementsByTagName('p');

    const confirmDelete = confirm(`Vas a eliminar:  ${eventName}, ¿Segur0?`);

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/ads/${eventName}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          eventElement.remove();
        } else {
          throw new Error('Error al eliminar el evento');
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
});




