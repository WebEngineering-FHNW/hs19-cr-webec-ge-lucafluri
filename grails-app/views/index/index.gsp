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
    <div id="header">

        <h2 id="title">Image Searcher</h2>

        <div id="links">
            <a class="links" id="favLink" href="/Favorite/favorites">Favorites</a>
            <g:if test="${loggedIn}">
                <b> Hi ${username}!</b>
                <a class="links" href="/logout">Logout</a>
            </g:if>
            <g:else>
                <a class="links" href="/account/createUsersView">Sign Up</a>
                <a class="links" href="/login/auth">Login</a>
            </g:else>
       </div>
    </div>
        <form>
            <label for="search"></label><input id="search" type="search" value="Funny Stuff..." onclick='this.value=""'/>
            <button id="btnSearch">Search</button>
            <div id="checkboxes">
                <label>
                    <input type="checkbox" id="giphyCheckbox" class="checkbox" checked>
                </label>GIPHY
                <label>
                    <input type="checkbox" id="unsplashCheckbox" class="checkbox" checked>
                </label>Unsplash
                <label>
                    <input type="checkbox" id="pixabayCheckbox" class="checkbox" checked>
                </label>Pixabay

            </div>

        </form>

    <div class="resultsText"></div>
    <div class="out"></div>

</body>
</html>
