package exercise

import grails.testing.web.controllers.ControllerUnitTest
import spock.lang.Specification

class ApiTestControllerSpec extends Specification implements ControllerUnitTest<ApiTestController> {

    def setup() {
    }

    def cleanup() {
    }

    void "test something"() {
        expect:"fix me"
            true == false
    }
}
