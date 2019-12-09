<!DOCTYPE html>
<html>
    <head>
        <title>Favorites</title>
   </head>
    <body>
    <g:each in="${favorites}" var="favorite">
        <img src="${favorite.url}" alt="${favorite.title}">
    </g:each>
    </body>
</html>
