package exercise

import grails.plugin.springsecurity.annotation.Secured
import groovy.json.JsonSlurper
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder

@Secured(['ROLE_USER', 'ROLE_ADMIN'])
class FavoriteController {

    static allowedMethods = [add: 'POST']

    def index() {
        render controller: 'index', action: 'index'
    }

    //Gets the parameters from the POST request and adds new picture to db
    def add() {
        def jsonSlurper = new JsonSlurper()
        def params = jsonSlurper.parseText(request.getReader().text)

        //tutorial by https://www.baeldung.com/get-user-in-spring-security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication()


        //System.out.println(params.url)
        def picture = new Favorite(url: params.url, title: params.title, imageUrl: params.imageUrl, username: authentication.getName()).save()

        render controller: 'index', action: 'index'
    }

    //Shows the favorites view
    def favorites(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication()
        def favourites = Favorite.findAllByUsername(authentication.getName()).reverse()
        //println(Picture.getAll())
        render view: "favorites", model: [favorites: favourites]
    }


}
