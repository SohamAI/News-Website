const API_KEY = "3e256e60325c43dfb8e5549878184500";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load' , ()=> fetch_News('India'));

async function fetch_News(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    addData(data.articles);
}

function addData(articles){
    const HTMLcontainer = document.getElementById('Card-Container');
    const cardTemplate = document.getElementById('news-temp');

    HTMLcontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return; 

        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataInTemplate(article,cardClone);
        HTMLcontainer.appendChild(cardClone);
    });
}


function fillDataInTemplate(article, cardClone){
    const cardImg = cardClone.querySelector('#card-img')
    const cardTitle = cardClone.querySelector("#card-title");
    const cardSource = cardClone.querySelector("#card-source");
    const cardDesc = cardClone.querySelector("#card-descp");


    cardImg.src = article.urlToImage;
    cardTitle.innerHTML = article.title;
    cardDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone : "Asia/Jakarta"
    });
    
    cardSource.innerHTML = `${article.source.name} ${date}`;


    //so whenever we will click on the Card it will Open its respective URL...

    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, '_blank');
    });

    console.log('Done');
}

let curr_ele = null;
function navClick(id){
    fetch_News(id);
    const navItem = document.getElementById(id);
    curr_ele?.classList.remove('active');
    curr_ele = navItem;
    curr_ele.classList.add('active');


    //clear the text Field..
    if(document.getElementById('search-text').value!=null){
        document.getElementById('search-text').value = '';
    }
}

const searchText = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click' , ()=>{
    if(!searchText.value) return;
    fetch_News(searchText.value);
    curr_ele?.classList.remove('active');
    curr_ele = null;

});

console.log('SuccessFull');