
//All API Keys
let APIKEY_GIPHY = "LYq9LkEJfZhdTV7obo3RZKZoZSfhgowP";
let APIKEY_Unsplash = "d477b088892e451cad488f834ccc346b710468a4755d0ccd2fcc6bb949314076";
let APIKEY_Pixabay = "7887844-2d6a765ef38e21e575e3e5ff7";

//Array of all images
//Elememts are JS Object with Attributes title, url (full Image url or redirect url)
// and imagePreview Url
let images = [];
let imagesGiphy = [];
let imagesUnsplash = [];
let imagesPixabay = [];

//Booleans for checkboxes
let giphyBool = false;
let unsplashBool = false;
let pixabayBool = false;

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", displayImages);
}


async function displayImages(ev) {
    ev.preventDefault(); //Stop page reload

    //clear image array and clear html div
    images = [];
    imagesGiphy = [];
    imagesUnsplash = [];
    imagesPixabay = [];
    document.querySelector(".out").innerHTML = "";


    //Check fo checkboxes and fetch from sources accordingly
    giphyBool = document.getElementById("giphyCheckbox").checked;
    unsplashBool = document.getElementById("unsplashCheckbox").checked;
    pixabayBool = document.getElementById("pixabayCheckbox").checked;
    if(document.getElementById("search").value.trim() !== "") {
        if (giphyBool) await getGiphy();
        if (unsplashBool) await getUnsplash();
        if (pixabayBool) await getPixabay();
    }

    //Create images array by interlacing all sources
    while(imagesGiphy.length>0 || imagesUnsplash.length>0 || imagesPixabay.length>0){
        if(imagesGiphy.length > 0) images.unshift(imagesGiphy.shift());
        if(imagesUnsplash.length > 0) images.unshift(imagesUnsplash.shift());
        if(imagesPixabay.length > 0) images.unshift(imagesPixabay.shift());
    }

    //reverse for correct order
    images = images.reverse();
    console.log("Total Images: " + images.length);

    //Create the html elements for each image and favorite button
    for(let i = 0; i < images.length; i++){
        let div = document.createElement("div");
        let link = document.createElement("a");
        let img = document.createElement("img");
        let btn = document.createElement("button");
        btn.class = "btn";
        btn.textContent = "Favorite";
        img.src = images[i].imageUrl;
        img.alt = images[i].title;
        link.href = images[i].url;
        link.target = "_blank"; //Open in new tab
        link.appendChild(img);
        div.appendChild(link);
        div.appendChild(btn);
        div.className = "image";
        let out = document.querySelector(".out");
        out.insertAdjacentElement("beforeend", div);

        btn.addEventListener("click", ev => {
            addToFavorites(link.href, img.alt, img.src);
        })
    }

    //If no images where found
    if(images.length === 0){
        let div = document.createElement("div");
        let par = document.createElement("p");
        par.textContent = "No Images found...";
        div.appendChild(par);
        let out = document.querySelector(".out");
        out.insertAdjacentElement("beforeend", div);
    }

    //Orders all Images(divs) in a masonry grid using macy.js
    Macy({
        container: ".out",
        trueOrder: true,
        waitForImages: false,
        margin: 24,
        useImageLoader: true,
        mobileFirst: false,
        columns: 5,
        breakAt: {
            1550: 4,
            1250: 3,
            950: 2,
            650: 1,
            350: 1,
            0: 1,
        }
    });


    //clear search input
    document.querySelector("#search").value = "";
}


async function getGiphy(){
    let url = `https://api.giphy.com/v1/gifs/search?api_key=` + APIKEY_GIPHY + `&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);

    await fetch(url)
        .then(response => response.json())
        .then(content => {
            let images = content.data;
            for(let i = 0; i<images.length; i++){
                imagesGiphy.push({
                    title: images[i].title,
                    imageUrl: images[i].images.downsized.url,
                    url: images[i].url
                })
            }
            console.log("# from GIPHY: "+ imagesGiphy.length);

        })
        .catch(err => {
            console.error(err);
        });
}


async function getUnsplash(){
    let url = "https://api.unsplash.com/search/photos/?client_id=" + APIKEY_Unsplash + "&query=";
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);

    await fetch(url)
        .then(r => r.json())
        .then(content => {
            let images = content.results;
            for(let i = 0; i<images.length; i++){
                imagesUnsplash.push({
                    title: images[i].alt_description,
                    imageUrl: images[i].urls.regular,
                    url: images[i].urls.regular,
                })
            }
            console.log("# from Unsplash: "+ imagesUnsplash.length);
        }).catch(err => {
            console.error(err);
        });

}


async function getPixabay(){
    let url = "https://pixabay.com/api/?key=" + APIKEY_Pixabay + "&q=";
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);

    await fetch(url)
        .then(response => response.json())
        .then(content => {
           let images = content.hits;
            for(let i = 0; i<images.length; i++){
                imagesPixabay.push({
                    title: images[i].tags,
                    imageUrl: images[i].largeImageURL,
                    url: images[i].largeImageURL,
                })
            }
            console.log("# from Pixabay: "+ imagesPixabay.length);
        })
        .catch(err => {
            console.error(err);
        });
}


//makes a post request to the favorite controller to add an image to the database
function addToFavorites(url, title="title", imageUrl){
    fetch("/Favorite/add", {
        method: "POST",
        body: JSON.stringify({
            url: url,
            imageUrl: imageUrl,
            title: title,
        })
    }).then(r => {
        console.log("Added " + title + " to favorites");
    })
}


