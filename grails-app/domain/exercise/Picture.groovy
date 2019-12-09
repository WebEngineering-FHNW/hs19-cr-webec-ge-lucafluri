package exercise

class Picture {
    String url
    String title

    static constraints = {
        url(nullable: false, blank: false)
        title(nullable: false, blank: false)
    }
}
