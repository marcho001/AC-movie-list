(function () {

  const BASE_URL = 'https://movie-list.alphacamp.io'

  const INDEX_URL = BASE_URL + '/api/v1/movies/'

  const POSTER_URL = BASE_URL + '/posters/'

  const dataPanel = document.getElementById('data-panel')

  const data = JSON.parse(localStorage.getItem('favoriteMovies')) || []

  displayDataList(data)

  function displayDataList(data) {

    let htmlContent = ''

    data.forEach(function (item, index) {

      htmlContent += `

        <div class="col-sm-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
              <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
            </div>
          </div>
        </div>
      `
    })

    dataPanel.innerHTML = htmlContent
  }
  // add listener to btn for remove movie

  dataPanel.addEventListener('click',(e)=>{

    if(e.target.matches('.btn-show-movie')){

      showMovie(e.target.dataset.id)

    } else if(e.target.matches('.btn-remove-favorite')){

      removeMovie(e.target.dataset.id)

    }
    
  })

  // remove favorite move function

  function removeMovie(id){

    const index = data.findIndex(item => item.id === Number(id))

    if(index === -1) return

    data.splice(index, 1)

    localStorage.setItem('favoriteMovies',JSON.stringify(data))

    displayDataList(data)
    
  }
})()