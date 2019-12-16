package exercise

class Favorite {
    String url
    String imageUrl
    String title
    String username

    static constraints = {
        url(nullable: false, blank: false, url: true)
        imageUrl(nullable: false, blank: false, url: true)
        title(nullable: true, blank: true)
        username (minSize: 2, maxSize: 15)

    }
}
