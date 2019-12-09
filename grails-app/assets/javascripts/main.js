//All API Keys
let APIKEY_GIPHY = "LYq9LkEJfZhdTV7obo3RZKZoZSfhgowP";

//Array of all images
let images = [];


document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //Stop page reload
        getGiphy();

    });
}

function getGiphy(){
    let url = `https://api.giphy.com/v1/gifs/search?api_key=` + APIKEY_GIPHY + `&limit=1&q=`;
    let str = document.getElementById("search").value.trim();

    url = url.concat(str);
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(content => {
            //  data, pagination, meta
            console.log(content.data);
            console.log("META", content.meta);
            let fig = document.createElement("div");
            let img = document.createElement("img");
            img.src = content.data[0].images.downsized.url;
            img.alt = content.data[0].title;
            fig.appendChild(img);
            fig.className = "image";
            let out = document.querySelector(".out");
            out.insertAdjacentElement("afterbegin", fig);
            document.querySelector("#search").value = "";

            addToFavorites(img.src, img.alt);
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
