//All API Keys
let APIKEY_GIPHY = "LYq9LkEJfZhdTV7obo3RZKZoZSfhgowP";
let APIKEY_Unsplash = "d477b088892e451cad488f834ccc346b710468a4755d0ccd2fcc6bb949314076";
let APIKEY_Pixabay = "7887844-2d6a765ef38e21e575e3e5ff7";

//Array of all images
let images = [];

//Booleans for checkboxes
let giphyBool = true;
let unsplashBool = true;
let pixabayBool = true;

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //Stop page reload

        //Check fo checkboxes
        giphyBool = document.getElementById("giphyCheckbox").checked;
        unsplashBool = document.getElementById("unsplashCheckbox").checked;
        pixabayBool = document.getElementById("pixabayCheckbox").checked;
        if(document.getElementById("search").value.trim() !== "") {
            if (giphyBool) getGiphy();
            if (unsplashBool) getUnsplash();
            if (pixabayBool) getPixabay();
        }

    });
}

function getGiphy(){
    let url = `https://api.giphy.com/v1/gifs/search?api_key=` + APIKEY_GIPHY + `&limit=1&q=`;
    let str = document.getElementById("search").value.trim();


    url = url.concat(str);
    //console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(content => {
            //  data, pagination, meta
            console.log(content.data);
            console.log("META", content.meta);
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
            })

        })
        .catch(err => {
            console.error(err);
        });
}


function getUnsplash(){
    let url = "https://api.unsplash.com/search/photos/?client_id=" + APIKEY_Unsplash + "&query=";
    let str = document.getElementById("search").value.trim();

    url = url.concat(str);

    fetch(url)
        .then(r => r.json())
        .then(content => {
            //  data, pagination, meta
            console.log(content);
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
            })
        });

}


function getPixabay(){
    let url = "https://pixabay.com/api/?key=" + APIKEY_Pixabay + "&q=";
    let str = document.getElementById("search").value.trim();


    url = url.concat(str);
    //console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(content => {
            //  data, pagination, meta
            console.log(content);
            let div = document.createElement("div");
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
