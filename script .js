const imagewrapper =document.querySelector(".images");
const loadmorebtn =document.querySelector(".load-more");
const searchinput=document.querySelector(".search-box input");
const apikey ="C63VtYufkRk91MduFo5opdy6omsyDA6VIIizHEFsJ0aRAMb7zyeQuBPi";
const perpage=30;
let currentpage=1;
let searchterm=null;


const downloadimg=(imgURL)=>{
    
    fetch(imgURL).then(res => res.blob()).then(file => {
        console.log(file);
        const a=document.createElement("a");
        a.href=URL.createObjectURL(file);
        a.download = new Data().getTime();
    }).catch(() => alert("failed to download image!"));
}

const generateHTML= (images) =>{
    imagewrapper.innerHTML+=images.map(img =>
        ` <li class="card">
        <img src="${img.src.large2x}" alt="img">
            <div class="details">
                <div class="photographer">
                    <i class="uil uil-camera "></i>
                    <span>${img.photographer}</span>
                    
                    
                </div>
                <button onclick="downloadimg('${img.src.large2x}')">
                    <i class="uil uil-import"></i>
                    </button>
            </div>
            
            </li>
        `
    ).join("");
}


const getImages=(apiURL) => {

    loadmorebtn.innerText="Loading...";
    loadmorebtn.classList.add("disabled");
    fetch(apiURL,{
        headers:{Authorization: apikey }
    }).then(res => res.json()).then(data =>{
        console.log(data);
        generateHTML(data.photos);
        loadmorebtn.innerText="Load more";
    loadmorebtn.classList.remove("disabled");
    }).catch(()=>alert("failed to load images"));

}
const loadmoreimages=() =>{
    currentpage++;
    let apiURL=`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`;
    apiURL=searchterm?`https://api.pexels.com/v1/search?query=${searchterm}&page=${currentpage}&per_page=${perpage}`:apiURL;
    getImages(apiURL);
}

const loadsearchimages = (e) => {
    if(e.target ==="")return searchterm=null;
    if(e.key === "Enter"){
        console.log("enter key pressed");
        currentpage=1;
        searchterm=e.target.value;
         console.log(searchterm);
        imagewrapper.innerHTML="";
        getImages(`https://api.pexels.com/v1/search?query=${searchterm}&page=${currentpage}&per_page=${perpage}`);
    }
}

getImages(`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`);
// getImages(`https://api.pexels.com/v1/search?query=cat&per_page=1`);

loadmorebtn.addEventListener("click",loadmoreimages);
searchinput.addEventListener("keyup",loadsearchimages);
// "https://api.pexels.com/v1/search?query=nature&per_page=1"