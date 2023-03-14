const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden');
    }
}

const loadData = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data.tools.slice(0, 6));
    displayData(data.data.tools, dataLimit);

}
const displayData = (data, dataLimit) => {
    const dataContainer = document.getElementById('data-container');
    dataContainer.textContent = '';
    // display 6 data only 
    const showAll = document.getElementById('show-all');
    if (dataLimit && data.length > 6) {

        data = data.slice(0, 6);
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
    }

    // display data
    data.forEach(myData => {
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('card');
        dataDiv.innerHTML = `
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow md:h-[583px]">
            <div class="p-5">
            <a href="#">
                    <img class="rounded-t-lg" src="${myData.image}" alt="" />
                </a>
            </div>       
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Features</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 ">
                    <ol mb-4">
                        <li class="mb-1">1.${myData.features[0]}</li>
                        <li class="mb-1">2.${myData.features[1]}</li>
                        <li class="mb-1">${myData.features[2]?'3.'+ myData.features:""}</li>
                        <li class="mb-1">${myData.features[3]?'4.'+ myData.features:""}</li>
                    </ol>
                    </p>
                    <hr>
                    <div class="flex justify-between items-center mt-10">
                        <div>
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">${myData.name}</h5>
                            <p><i class="fa-regular fa-calendar-days"></i> ${myData.published_in}</p>
                        </div>
                        <div class="bg-red-50 rounded-full">

                
                            <label for="my-modal-5" onclick="loadDataDetails('${myData.id}')" class="btn btn-ghost  p-3 " type="button">
                            <svg aria-hidden="true" class="w-5 h-5 ml-1 -mr-0" fill="red" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                             <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                            </svg>
                            </label>
                            
                            

                        </div>
                    </div>

                </div>
        </div>
        `;
        dataContainer.appendChild(dataDiv);
        
       
    })
   

    // Add event listener to Sort by Date button
  const sortByDateBtn = document.getElementById('sort-by-date-btn');
  sortByDateBtn.addEventListener('click', () => {
    const sortedData = sortData(data);
    displayData(sortedData, dataLimit);
    
    if (dataLimit && data.length > 6) {

        data = data.slice(0, 6);
        // showAll.classList.add('hidden');
        showAll.classList.remove('hidden');
    }
    else if(dataLimit && data.length===6) {
        showAll.classList.remove('hidden');
    }
    else if(dataLimit && data.length===12) {
        showAll.classList.add('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
  });
   // stop loader 
   toggleSpinner(false);

}

const sortData = (data) => {
    // Sort data by published_in property
    const sortedData = data.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    return sortedData;
  }

const processSearch = (dataLimit) => {
    // start loader 
    
    loadData(dataLimit);
    toggleSpinner(true);

}
document.getElementById('show-all-btn').addEventListener('click', function () {
    processSearch();
    toggleSpinner(true);
    
})



processSearch(6)



// modal section 
const loadDataDetails = async id => {
   
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    
    displayDataDetails(data.data);



}

const displayDataDetails = data => {
    console.log(data);
    const dataDetails = document.getElementById('my-modal');
    dataDetails.innerHTML = `
    <div class="border-red-200 border-2 rounded-lg  w-full md:w-1/2 ">
    <div class="bg-red-50 p-5">
        <h2 class="text-black text-lg font-semibold">${data.description}</h2>
        <div class="flex flex-col p-1 md:flex-row justify-around items-center gap-10 text-center my-3 ">
        <div class="font-bold text-sm text-green-600 bg-white p-4 rounded-lg ">${data.pricing !==null ? data.pricing[0].price : 'Free Of Cost'} <br>  ${data.pricing !==null?data.pricing[0].plan:'Basic'}</div>
        <div class="font-bold text-sm text-yellow-600 bg-white p-4 rounded-lg">${data.pricing !==null ? data.pricing[1].price : 'Free Of Cost'} <br>  ${data.pricing !==null?data.pricing[1].plan:'Pro'}</div>
        <div class="font-bold text-sm text-red-500 bg-white p-4 rounded-lg">${data.pricing !==null ? data.pricing[2].price : 'Free Of Cost'} <br>  ${data.pricing !==null?data.pricing[2].plan:'Enterprise'}</div>
    </div>
        <div class="flex flex-col md:flex-row gap-2">
            <div>
                <h2 class="text-black text-lg font-semibold">Features</h2>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${data?.features[1].feature_name ? '&#9679 ' +data.features[1].feature_name : ""}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${data?.features[2].feature_name ? '&#9679 ' + data.features[2].feature_name : ""}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${data?.features[3].feature_name ? '&#9679 ' + data.features[3].feature_name : ""}</h3>
            </div>
            <div>
                <h2 class="text-black text-lg font-semibold">Integrations</h2>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${data.integrations === null||data.integrations[0] === undefined ?""  :'&#9679'+data.integrations[0]}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${data.integrations === null||data.integrations[1] === undefined ?""  :'&#9679'+data.integrations[1]}</h3>
                <h3 class="mb-1 font-normal text-sm text-gray-700">${data.integrations === null||data.integrations[2] === undefined ?""  :'&#9679'+data.integrations[2]}
                
                <h3 class="mb-1 font-normal text-sm text-gray-700">&#9679 ${data.integrations === null||data.integrations[3] === undefined ?"No Data found"  :data.integrations[3]}
                
                </h3>
        
            </div>
        </div>
    </div>
    </div>
<div class="w-full md:w-1/2 text-center">
    <div class="relative">
        <img class="p-8 " src="${data.image_link[0]}" alt="">
        <h2 class="text-black text-lg font-semibold">${data.input_output_examples !== null ? data.input_output_examples[0].input : 'Can You Give Me An Example?'}</h2>
        <p class="mb-1 font-normal text-gray-700">${data.input_output_examples !== null ? data.input_output_examples[0].output : 'No! Not Yet! Take A Break!!!'}</p>
        <div id="accuracy-div"
    class="text-white bg-red-500 font-medium rounded-lg text-xs px-5 py-1.5 top-12 right-12 absolute"
    style="${data.accuracy.score !== null ? '' : 'display: none;'}">
    ${data.accuracy.score !== null ? data.accuracy.score * 100 + '% accuracy' : ''}
</div>
</div>
    `;
}




