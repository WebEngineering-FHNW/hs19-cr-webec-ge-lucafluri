<!DOCTYPE html>
<html>
    <head>
        <title>Favorites</title>
   </head>
    <body>
    <g:each in="${favorites}" var="favorite">
        <a href="${favorite.url}" target="_blank"><img src="${favorite.url}" alt="${favorite.title}"></a>
    </g:each>
    </body>
</html>
