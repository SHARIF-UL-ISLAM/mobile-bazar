//Error show
const error = document.getElementById('error')

//Field function
const clearField = () => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = '';
    const infoContainer = document.getElementById('info-container')
    infoContainer.innerHTML = '';
}

//Mobile Data
const phone = () => {

//Input Value

const inputField = document.getElementById('input-field');
const searchText = inputField.value;
document.getElementById('input-field').value = '';

//Error Handleing

  if (searchText === typeof 'number' || searchText == '') {
    error.innerText = "Phone Search"
    clearField()
  } else if (searchText < 0) {
    error.innerText = "Negative not allow"
    clearField()
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.data.length === 0) {
          clearField()
          error.innerText = "Not Found Result"
        } else {
          showPhone(data.data.slice(0, 20))
          error.innerText = " "

        }
      })

  }
}

const showPhone = (phones) => {
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.innerHTML = '';
  const infoContainer = document.getElementById('info-container')
  infoContainer.innerHTML = '';

  phones.forEach(phone => {
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = ` 
    <div class="card p-3 text-center">
    <img  src="${phone.image}" class="card-img-top  w-50 mx-auto" alt="...">
    <div class="card-body border-0  ">
      <h5 class="card-title">Brand: ${phone.brand}</h5>
      <p class="card-text"> Model: ${phone.phone_name}</p>
      <button onClick="moreInfo('${phone.slug}')" class="btn btn-outline-primary">Details</button>
    </div>
  </div>
     `
    phoneContainer.appendChild(div)
  })

}

//Fetch Api
const moreInfo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => showInfo(data.data))
}

const showInfo = (information) => {
  const infoContainer = document.getElementById('info-container')
  infoContainer.innerHTML = '';
  const div = document.createElement('div')
  div.classList.add('col')
  div.innerHTML = ` 
  <div class="card p-3">
  <img   src="${information.image}" class="card-img-top img-fluid w-50 mx-auto" alt="...">
  <div class="card-body">
    <p class="card-title"> <span class="fw-bold">Brand</span> : ${information.brand}</p>
    <p class="card-text"> <span class="fw-bold">Model</span> : ${information.name}</p>
    <p class="card-text"><span class="fw-bold"> ChipSet</span> : ${information.mainFeatures.chipSet}</p>
    <p class="card-text"> <span class="fw-bold"> Disply Size</span> : ${information.mainFeatures.displaySize}</p>
    <p class="card-text"> <span class="fw-bold">Memory</span>  : ${information.mainFeatures.memory}</p>
    <p class="card-text"> <span class="fw-bold">Sensor</span>  : ${information.mainFeatures.sensors}</p>
    <p id="date" class="card-text"> <span class="fw-bold">Relese Date</span>  : ${information.releaseDate ? information.releaseDate : 'Not Found'} </p>
  </div>
</div>
  `
  infoContainer.appendChild(div)

}