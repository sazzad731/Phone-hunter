const loadData = async(search) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data)
}

const spinner = document.getElementById("spinner");

const displayData = (phoneData) => {
  const missingSms = document.getElementById("missing-sms");
  const phoneContainer = document.getElementById('phone-container');
  if (phoneData.length === 0) {
    missingSms.classList.remove("d-none");
  } else {
    missingSms.classList.add("d-none");
  }
  phoneContainer.innerHTML = "";
  phoneData.forEach((phone) => {
    const div = document.createElement('div');
    div.classList.add("col");
    div.innerHTML = `
      <div class="col">
            <div class="card pt-3">
              <img src="${phone.image}" class="img-thumbnail mx-auto d-block border border-0" alt="...">
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Check out</button>
              </div>
            </div>
          </div>
    `;
    phoneContainer.appendChild(div);
  })
  // hide spinner
  spinner.classList.add("d-none");
}

document.getElementById("search-field").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    displaySearch();
  }
})

const displaySearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadData(searchText);
  searchField.value = '';
  // show spinner
  spinner.classList.remove("d-none");
};


const loadPhoneDetails = async (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phoneDetail) => {
  const staticBackdropLabel = document.getElementById("staticBackdropLabel");
  staticBackdropLabel.innerText = phoneDetail.name;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
    <img class="w-50" src="${phoneDetail.image}" alt="${phoneDetail.name}" />
    <div class="border-start border-secondary">
    <h5 class="text-center">Main Features</h5>
      <ul class="p-0">
        <ol class="p-2"><span class="fw-medium">Brand:</span> ${
          phoneDetail.brand
        }</ol>
        <ol class="p-2"><span class="fw-medium">Chip set:</span> ${
          phoneDetail.mainFeatures.chipSet
        }</ol>
        <ol class="p-2"><span class="fw-medium">Display size:</span> ${
          phoneDetail.mainFeatures.displaySize
        }</ol>
        <ol class="p-2"><span class="fw-medium">Memory:</span> ${
          phoneDetail.mainFeatures.memory
        }</ol>
      </ul>
      <h5 class="text-center">Other Features</h5>
      <ul class="p-0">
        <ol class="p-2"><span class="fw-medium">GPS:</span> ${
          phoneDetail.others ? phoneDetail.others.GPS : "No GPS available"
        }</ol>
        <ol class="p-2"><span class="fw-medium">NFC:</span> ${
          phoneDetail.others ? phoneDetail.others.NFC : "No NFC available"
        }</ol>
        <ol class="p-2"><span class="fw-medium">Radio:</span> ${
          phoneDetail.others ? phoneDetail.others.Radio : "No radio available"
        }</ol>
        <ol class="p-2"><span class="fw-medium">USB:</span> ${
          phoneDetail.others ? phoneDetail.others.USB : "No USB available"
        }</ol>
        <ol class="p-2"><span class="fw-medium">WLAN:</span> ${
          phoneDetail.others ? phoneDetail.others.WLAN : "No WLAN available"
        }</ol>
        <ol class="p-2"><span class="fw-medium">Release date:</span> ${
          phoneDetail.releaseDate === ""
            ? "No date found"
            : phoneDetail.releaseDate
        }</ol>
      </ul>
    </div>
  `;
}

loadData("apple")