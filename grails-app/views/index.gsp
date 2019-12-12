<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Image Searcher</title>

    <asset:javascript src="main.js"></asset:javascript>
    <asset:javascript src="macy.min.js"></asset:javascript>
    <asset:stylesheet src="custom.css"></asset:stylesheet>

</head>
<body>
<main>
    <div id="login">
        <a href="/account/createUsersView">Sign Up</a>
        <a href="/login/auth">Login</a>
        <a href="/logout">Logout</a>
    </div>
    <form>
        <label for="search"></label><input id="search" type="search" />
        <div>
            <label>
                <input type="checkbox" id="giphyCheckbox" checked>
            </label>GIPHY<br>
            <label>
                <input type="checkbox" id="unsplashCheckbox" >
            </label>Unsplash<br>
            <label>
                <input type="checkbox" id="pixabayCheckbox" >
            </label>Pixabay<br>

        </div>
        <button id="btnSearch">Seach</button>
    </form>
    <div class="favorites">
       <a href="/Picture/favorites">Favorites</a>
    </div>
    <div class="out"></div>
</main>
</body>
</html>
