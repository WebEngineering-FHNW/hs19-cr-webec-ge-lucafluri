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
let giphyBool = true;
let unsplashBool = true;
let pixabayBool = true;

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", displayImages);
}


async function displayImages(ev) {
    ev.preventDefault(); //Stop page reload
    //clear image array and clear html div
    images = [];
    document.querySelector(".out").innerHTML = "";


    //Check fo checkboxes
    giphyBool = document.getElementById("giphyCheckbox").checked;
    unsplashBool = document.getElementById("unsplashCheckbox").checked;
    pixabayBool = document.getElementById("pixabayCheckbox").checked;
    if(document.getElementById("search").value.trim() !== "") {
        if (giphyBool) await getGiphy();
        if (unsplashBool) await getUnsplash();
        if (pixabayBool) await getPixabay();
    }

    for(let i = 0; i<Math.max(imagesGiphy.length, imagesUnsplash.length, imagesPixabay.length); i++){
        if(imagesGiphy.length > 0) images.unshift(imagesGiphy.shift());
        if(imagesUnsplash.length > 0) images.unshift(imagesUnsplash.shift());
        if(imagesPixabay.length > 0) images.unshift(imagesPixabay.shift());
    }

    console.log(images);
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
        link.target = "_blank";
        link.appendChild(img);
        div.appendChild(link);
        div.appendChild(btn);
        div.className = "image";
        let out = document.querySelector(".out");
        out.insertAdjacentElement("afterbegin", div);
        document.querySelector("#search").value = "";

        btn.addEventListener("click", ev => {
            addToFavorites(img.src, img.alt);
        })

    }




}


async function getGiphy(){
    let url = `https://api.giphy.com/v1/gifs/search?api_key=` + APIKEY_GIPHY + `&q=`;
    let str = document.getElementById("search").value.trim();

    //clear old array
    imagesGiphy = [];


    url = url.concat(str);
    //console.log(url);

    await fetch(url)
        .then(response => response.json())
        .then(content => {
            //  data, pagination, meta
            console.log("Giphy: " + content);
            // console.log("META", content.meta);
            let images = content.data;
            for(let i = 0; i<images.length; i++){
                //console.log("image: " + images[i].url)
                imagesGiphy.push({
                    title: images[i].title,
                    imageUrl: images[i].images.downsized.url,
                    url: images[i].url
                })
            }
            console.log(imagesGiphy.toString());

/*
            let div = document.createElement("div");
            let link = document.createElement("a");
            let img = document.createElement("img");
            let btn = document.createElement("button");
            btn.class = "btn";
            btn.textContent = "Favorite";
            img.src = content.data[0].images.downsized.url;
            img.alt = content.data[0].title;
            link.href = img.src;
            link.target = "_blank";
            link.appendChild(img);
            div.appendChild(link);
            div.appendChild(btn);
            div.className = "image";
            let out = document.querySelector(".out");
            out.insertAdjacentElement("afterbegin", div);
            document.querySelector("#search").value = "";

            btn.addEventListener("click", ev => {
                addToFavorites(img.src, img.alt);
            })*/

        })
        .catch(err => {
            console.error(err);
        });
}


async function getUnsplash(){
    let url = "https://api.unsplash.com/search/photos/?client_id=" + APIKEY_Unsplash + "&query=";
    let str = document.getElementById("search").value.trim();

    //clear old array
    imagesUnsplash = [];

    url = url.concat(str);

    await fetch(url)
        .then(r => r.json())
        .then(content => {
            //  data, pagination, meta
            console.log("unsplash" + content);

            let images = content.results;
            for(let i = 0; i<images.length; i++){
                //console.log("image: " + images[i].url)
                imagesUnsplash.push({
                    title: images[i].alt_description,
                    imageUrl: images[i].urls.regular,
                    url: images[i].urls.regular,
                })
            }
            console.log(imagesUnsplash.toString());

            /*
            let div = document.createElement("div");
            let link = document.createElement("a");
            let img = document.createElement("img");
            let btn = document.createElement("button");
            btn.class = "btn";
            btn.textContent = "Favorite";
            let results = content.results;
            img.src = results[0].urls.regular;
            img.alt = results[0].alt_description;
            link.href = img.src;
            link.target = "_blank";
            link.appendChild(img);
            div.appendChild(link);
            div.appendChild(btn);
            div.className = "image";
            let out = document.querySelector(".out");
            out.insertAdjacentElement("afterbegin", div);
            document.querySelector("#search").value = "";

            btn.addEventListener("click", ev => {
                addToFavorites(img.src, img.alt);
            })*/
        });

}


async function getPixabay(){
    let url = "https://pixabay.com/api/?key=" + APIKEY_Pixabay + "&q=";
    let str = document.getElementById("search").value.trim();

    //clear old array
    imagesPixabays = [];

    url = url.concat(str);
    //console.log(url);

    await fetch(url)
        .then(response => response.json())
        .then(content => {
            //  data, pagination, meta

            console.log("Pixabay " + content);

            let images = content.hits;
            for(let i = 0; i<images.length; i++){
                //console.log("image: " + images[i].url)
                imagesPixabay.push({
                    title: images[i].tags,
                    imageUrl: images[i].largeImageURL,
                    url: images[i].largeImageURL,
                })
            }
            console.log(imagesPixabay.toString());





            /*let div = document.createElement("div");
            let link = document.createElement("a");
            let img = document.createElement("img");
            let btn = document.createElement("button");
            btn.class = "btn";
            btn.textContent = "Favorite";
            img.src = content.hits[0].largeImageURL;
            img.alt = content.hits[0].tags;
            link.href = img.src;
            link.target = "_blank";
            link.appendChild(img);
            div.appendChild(link);
            div.appendChild(btn);
            div.className = "image";
            let out = document.querySelector(".out");
            out.insertAdjacentElement("afterbegin", div);
            document.querySelector("#search").value = "";

            btn.addEventListener("click", ev => {
                addToFavorites(img.src, img.alt);
            })
*/

        })
        .catch(err => {
            console.error(err);
        });
}



function addToFavorites(url, title){
    fetch("/Picture/add", {
        method: "POST",
        body: JSON.stringify({
            url: url,
            title: title,
        })
    }).then(r => {
        console.log("Added to Favorites");})
}


