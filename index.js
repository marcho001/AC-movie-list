(function () {
//test
  // write your code here
  const baseURL = 'https://movie-list.alphacamp.io/'

  const indexURL = baseURL + 'api/v1/movies'

  const postURL = baseURL + 'posters/'

  const data = []

  const dataPanel = document.querySelector('#data-panel')

  const searchForm = document.querySelector('#search')

  const searchInput = document.querySelector('#search-input')

  const pagination = document.querySelector('#pagination')

  const ITEM_PER_PAGE = 12

  const movies = []

  let paginationData = []


  // add listener to show modal

  dataPanel.addEventListener('click', (e) => {

    if (e.target.matches('.btn-show-movie')) {

      showMovie(e.target.dataset.id)

    } else if(e.target.matches('.btn-add-favorite')){

      addFavoriteItem(e.target.dataset.id)

    }
  })

  searchForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    let input = searchInput.value.toLowerCase()

    let results = data.filter((item)=>{

      return item.title.toLowerCase().includes(input)

    })

    getTotalPages(results)

    getPageData(1, results)

    searchInput.value = ''

  })

  // add page listener

  pagination.addEventListener('click',(e)=>{

    console.log(e.target.dataset.page)

    if(e.target.tagName === 'A'){

      getPageData(e.target.dataset.page)

    }
  })
  // insert data to card

  axios.get(indexURL)

    .then(resp => {

      data.push(...resp.data.results)

      // displayDataList(data)

      getTotalPages(data)

      getPageData(1, data)

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
              <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More </button>
              <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
          </div>
          
        </div>
       </div>
      `
    })

    dataPanel.innerHTML = htmlContent
  }

  // add item to favorite.html

  function addFavoriteItem(id){

    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []

    const movie = data.find(item => item.id === Number(id))

    if(list.some(item => item.id === Number(id))){

      alert(`${movie.title} is already in your favorite list!!`)

    } else{


      list.push(movie)

      alert(`Added ${movie.title} to your favorite list!!`)

    }

    localStorage.setItem('favoriteMovies', JSON.stringify(list))

    console.log(list)

  }

  // pagination function

  function getTotalPages(data){

    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1

    let pageItemContent = ''

    for(let i = 0; i < totalPages; i++){

      pageItemContent += `
      <li class="page-item">
        <a class"page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
      </li>
      `

      pagination.innerHTML = pageItemContent

    }

  }
  // get page function

  function getPageData(pageNum, data){

    paginationData = data || paginationData

    let offset = (pageNum - 1) * ITEM_PER_PAGE

    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)

    displayDataList(pageData)
  }
})()





