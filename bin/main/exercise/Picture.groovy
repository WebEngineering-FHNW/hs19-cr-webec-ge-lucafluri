package exercise

class Picture {
    String url
    String imageUrl
    String title
    String username

    static constraints = {
        url(nullable: false, blank: false)
        imageUrl(nullable: false, blank: false)
        title(nullable: true, blank: true)
        username minSize: 2

    }
}
