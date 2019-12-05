//All API Keys
let APIKEY_GIPHY = "LYq9LkEJfZhdTV7obo3RZKZoZSfhgowP";

//Array of all images
let images = [];


document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page reload
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
            let fig = document.createElement("figure");
            let img = document.createElement("img");
            img.src = content.data[0].images.downsized.url;
            img.alt = content.data[0].title;
            fig.appendChild(img);
            let out = document.querySelector(".out");
            out.insertAdjacentElement("afterbegin", fig);
            document.querySelector("#search").value = "";
        })
        .catch(err => {
            console.error(err);
        });
}
