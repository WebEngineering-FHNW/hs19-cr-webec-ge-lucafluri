<!DOCTYPE html>
<html>
    <head>
        <title>Favorites</title>
        <asset:javascript src="macy.min.js"></asset:javascript>
        <asset:stylesheet src="custom.css"></asset:stylesheet>
   </head>
    <body>
    <a href="/">Go Back</a>
    <div class="out">
        <g:each in="${favorites}" var="favorite">
            <a href="${favorite.url}" target="_blank"><img src="${favorite.imageUrl}" alt="${favorite.title}"></a>
        </g:each>
    </div>
    <script type="text/javascript">
        Macy({
            container: ".out",
            trueOrder: true,
            waitForImages: false,
            margin: 24,
            useImageLoader: true,
            mobileFirst: true,
            columns: 5,
            breakAt: {
                1550: 5,
                1250: 4,
                950: 3,
                650: 2,
                350: 1,
                0: 1,
            }
        });
    </script>
    </body>
</html>
