// Logica Buscador
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

          // Pintar boton favoritos
          const favButton = document.createElement('button');
          favButton.textContent = 'Agregar evento a favoritos';
          card.appendChild(favButton);
          }
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



//Funcion singup
if (document.getElementById('signupButton')) {
  document.getElementById('signupButton').addEventListener('click', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
      name: name,
      email: email,
      password: password
    };

    fetch('api/user', {
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
if (document.getElementById('loginButton')) {
  document.getElementById('loginButton').addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
      email: email,
      password: password
    };

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => {
        if (response.ok) {
          // Crea la cookie
          //const cookieValue = JSON.stringify(UserData);
          //const expirationDate = new Date();
          //expirationDate.setTime(expirationDate.getTime() + (60 * 60 * 1000)); //Duracion de la cookie(milisegundos)
          //document.cookie = `cookieLogin=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;//Habilitada para toda la web

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

if (document.getElementById('logoutButton')) {
  document.getElementById('logoutButton').addEventListener('click', (event) => {
    event.preventDefault();
    
    // Obtener el valor de la cookie 'cookieLogin'
    const cookieValue = getCookieValue('cookieLogin');

    //Convertimos a JSON
    const data = JSON.parse(cookieValue);
    const email = data.email;
    const password = data.password;

    const postData = {
      email: email,
      password: password
    };

    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Logout perita ');
          // Elimina la cookie
          document.cookie = 'cookieLogin=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;';
        } else {
          console.error('Error en el logout');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  });
}

/*
if (document.getElementById('logoutButton')) {
  document.getElementById('logoutButton').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('llega?');
    const cookieValue = getCookieValue('cookieLogin');
*/






