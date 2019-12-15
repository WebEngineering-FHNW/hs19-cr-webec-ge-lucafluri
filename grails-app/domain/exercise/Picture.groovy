package exercise

class Picture {
    String url
    String imageUrl
    String title
    String username

    static constraints = {
        url(nullable: false, blank: false, url: true)
        imageUrl(nullable: false, blank: false, url: true)
        title(nullable: false, blank: true)
        username (minSize: 2, maxSize: 15)

    }
}
