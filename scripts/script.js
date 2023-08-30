const loadData = async (isShowAll) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
  const data = await res.json()
  aiProducts = data.data.tools
  displayLoadData(aiProducts, isShowAll)
  //   console.log(aiProducts)
}
const displayLoadData = (aiProducts, isShowAll) => {
  const showAllContainer = document.getElementById("show-all-container")
  const aiProductContainer = document.getElementById("ai-product-container")
  // empty aiProductContainer after showing one time
  aiProductContainer.textContent = ""

  // show all button conditions
  if (!isShowAll) {
    aiProducts = aiProducts.slice(0, 5)
  }
  if (aiProducts.length === 5 && !isShowAll) {
    showAllContainer.classList.remove("hidden")
  } else {
    showAllContainer.classList.add("hidden")
  }

  aiProducts.forEach((product) => {
    // console.log(product.description)
    const cardDiv = document.createElement("div")
    cardDiv.classList = `card bg-gray-100 p-4 shadow-xl`

    // an array of formatted features
    const features = product.features.map(
      (feature, index) => `${index + 1}. ${feature}`
    )
    cardDiv.innerHTML = `
    <div class="card-body">
    <div><img class="w-auto h-[340px]" src="${product.image}"/></div>
    <p class="text-xl font-bold">Features</p>
    <ul>
        ${features.map((feature) => `<li>${feature}</li>`).join("")}
    </ul>
    <hr class="mt-2 mb-2 ">
   <div class="flex justify-between items-center">
   <div class="flex flex-col">
   <p><span class="text-lg font-bold">${product.name}</span></p>
   <p><i class="fa-regular fa-calendar-days"></i><span> ${
     product.published_in
   }</span></p>
   </div>
   
  <button onclick="modalDataHandle('${
    product.id
  }')" class="flex justify-center items-center w-10 h-10 text-white bg-gray-200 hover:bg-slate-400 rounded-full">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75" stroke="#EB5757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
  </div>
  </div>
    `
    aiProductContainer.appendChild(cardDiv)
  })
}

// sort products based on date
const sorted = () => {
  const sortedProducts = aiProducts.sort(
    (a, b) => new Date(a.published_in) - new Date(b.published_in)
  )
  // console.log(sortedProducts)
  displayLoadData(aiProducts, true)
}
// handle show all button
const handleShowAllButton = () => {
  loadData(true)
}

// modal
const modalDataHandle = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  )
  const data = await res.json()
  const dataDetails = data.data
  showDetails(dataDetails)
}
const showDetails = (dataDetails) => {
  const modalContainer = document.getElementById("modal-container")
  // const div = document.createElement("div")
  const theFeatures = dataDetails.features
  const featureNames = []
  for (const key in theFeatures) {
    if (theFeatures.hasOwnProperty(key)) {
      const feature = theFeatures[key]
      featureNames.push(feature.feature_name)
    }
  }
  const integrations = dataDetails.integrations
  console.log(integrations)
  modalContainer.innerHTML = `
  
  <section class=" max-w-5xl bg-white p-5 md:p-16 ">

  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-center ">
  <div class="flex flex-col max-w-max bg-orange-100 rounded-lg p-5 border-2 border-[#EB5757]">
  <h2 class="mb-5 text-xl font-bold pb-2">${dataDetails.description}</h2>
  <div class="grid grid-rows-1 md:grid-cols-3 gap-3">
  <div class="bg-white text-[#03A30A] text-sm font-bold p-2 items-center justify-center flex flex-col rounded-lg">
  <h2>${dataDetails?.pricing[0]?.price}</h2>
  <h2>${dataDetails?.pricing[0]?.plan}</h2>
  </div>
  <div class="bg-white text-[#F28927] text-sm font-bold p-2 items-center justify-center flex flex-col rounded-lg">
  <h2 class="">${dataDetails?.pricing[1]?.price}</h2>
  <h2>${dataDetails?.pricing[1]?.plan}</h2>
  </div>
  <div class="bg-white text-[#EB5757] font-bold p-2 items-center text-center text-sm justify-center flex flex-col rounded-lg">
  <h2 class="">${dataDetails?.pricing[2]?.price.slice(0, 10)}</h2>
  <h2 class="">${dataDetails?.pricing[2]?.plan}</h2>
  </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 pl-5"><div>
  <ul class="list-disc"><span class=" text-lg font-bold">Features</span>
  ${featureNames
    .map((featureName, index) => `<li class="text-sm">${featureName}</li>`)
    .join("")}
  </ul>
  </div>
  <div>
  <ul class="list-disc"><span class="text-lg font-bold">Integrations</span>${integrations
    .map((item) => `<li class="text-sm">${item}</li>`)
    .slice(0, 3)
    .join("")}
  </ul>
  </div></div>
  </div>
  
 <div class="flex flex-col rounded-lg">
 <div>
 <img src="${dataDetails?.image_link[0]}"/>
 </div>
 <div class="flex flex-col justify-center items-center text-center ">
 <p class="text-lg font-bold ">${dataDetails.input_output_examples[0].input}</p>
 <p>${dataDetails.input_output_examples[0].output}</p>
 </div>
 </div>
  </div>

</section>
  `
  // modalContainer.appendChild(div)
  // const modal = document.getElementById("my-modal")
  my_modal.showModal()
  console.log(dataDetails)
}
loadData()
