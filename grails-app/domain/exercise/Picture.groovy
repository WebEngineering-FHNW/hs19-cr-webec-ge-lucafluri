package exercise

class Picture {
    String url
    String imageUrl
    String title

    static constraints = {
        url(nullable: false, blank: false)
        imageUrl(nullable: false, blank: false)
        title(nullable: true, blank: true)
    }
}
