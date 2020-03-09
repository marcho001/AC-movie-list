(function () {
  // write your code here
  const baseURL = 'https://movie-list.alphacamp.io/'

  const indexURL = baseURL + 'api/v1/movies'

  const postURL = baseURL + 'posters/'

  const data = []

  const dataPanel = document.querySelector('#data-panel')

  const searchForm = document.querySelector('#search')

  const searchInput = document.querySelector('#search-input')

  const movies = []

  // add listener to show modal

  dataPanel.addEventListener('click', (e) => {

    if (e.target.matches('.btn-show-movie')) {

      showMovie(e.target.dataset.id)

    }
  })

  searchForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    console.log(data[0].title)

    let input = searchInput.value.toLowerCase()

    let results = data.filter((item)=>{

      return item.title.toLowerCase().includes(input)

    })

    displayDataList(results)

    searchInput.value = ''
    
  })

  // insert data to card

  axios.get(indexURL)

    .then(resp => {

      data.push(...resp.data.results)

      displayDataList(data)

    })

    .catch(err => console.log(err))


  //  function
  // modal show movie detail function
  function showMovie(id) {

    const modalTitle = document.getElementById('show-movie-title')

    const modalImage = document.getElementById('show-movie-image')

    const modalDate = document.getElementById('show-movie-date')

    const modalDescription = document.getElementById('show-movie-description')

    const url = indexURL + '/' + id

    axios.get(url)

      .then((resp) => {

        const data = resp.data.results

        modalTitle.textContent = data.title

        modalImage.innerHTML = `<img src="${postURL}${data.image}" class="img-fluid" alt="Responsive image">`

        modalDate.innerText = `Release At : ${data.release_date}`

        modalDescription.innerText = `${data.description}`

      }).catch((err) => { console.log(err) })
  }

  //display data list in card function

  function displayDataList(data) {

    let htmlContent = ''

    data.forEach(item => {

      htmlContent += `
       <div class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top" src='${postURL}${item.image}' alt="Card image cap">
          <div class="card-body movie-item-body">
           <h6 class="card-title">${item.title}</h6>
          </div>
          <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
          </div>
          
        </div>
       </div>
      `
    })

    dataPanel.innerHTML = htmlContent
  }
})()





