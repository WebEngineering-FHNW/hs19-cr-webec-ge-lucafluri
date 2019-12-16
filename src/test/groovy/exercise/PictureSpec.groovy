package exercise

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class PictureSpec extends Specification implements DomainUnitTest<Picture> {

    def setup() {
        Picture p1 = new Picture(url: "http://google.ch", imageUrl: "http://google.ch", title: "Test", username: "user").save() //Working
        Picture p2 = new Picture(url: "http://google.ch", imageUrl: "http://google.ch", title: "Test", username: "u").save() //Should fail due to length of username
        Picture p3 = new Picture(url: "http://google.ch", imageUrl: "noUrl", title: "Test", username: "user").save() //Fail due to incorrect url
    }

    def cleanup() {
        Picture.getAll().removeAll()
    }

    void "count of pictures"() {
        expect:
            Picture.count() == 1
    }

    void "test entry by User"() {
        expect:
            Picture.findByUsername("user").title == "Test";
    }

    void "username too short"() {
        expect:
        Picture.findAllByUsername("u").size() == 0
    }

    void "url wrong"() {
        expect:
        Picture.findAllByUsername("user").size() == 1 //not 2
    }
}
