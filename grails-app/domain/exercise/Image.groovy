package exercise

class Image {
    String title;
    String url;


    static constraints = {
        title(blank: true, nullable: false)
        url(blank: false, nullable: false)
    }
}
