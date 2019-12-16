package exercise

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class FavoriteSpec extends Specification implements DomainUnitTest<Favorite> {

    def setup() {
        Favorite p1 = new Favorite(url: "http://google.ch", imageUrl: "http://google.ch", title: "Test", username: "user").save() //Working
        Favorite p2 = new Favorite(url: "http://google.ch", imageUrl: "http://google.ch", title: "Test", username: "u").save() //Should fail due to length of username
        Favorite p3 = new Favorite(url: "http://google.ch", imageUrl: "noUrl", title: "Test", username: "user").save() //Fail due to incorrect url
    }

    def cleanup() {
        Favorite.getAll().removeAll()
    }

    void "count of pictures"() {
        expect:
            Favorite.count() == 1
    }

    void "test entry by User"() {
        expect:
            Favorite.findByUsername("user").title == "Test";
    }

    void "username too short"() {
        expect:
        Favorite.findAllByUsername("u").size() == 0
    }

    void "url wrong"() {
        expect:
        Favorite.findAllByUsername("user").size() == 1 //not 2
    }
}
