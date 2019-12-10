package exercise

import groovy.json.JsonSlurper

class PictureController {

    static allowedMethods = [add: 'POST']

    def index() {
        render view: 'index'
    }

    def add() {
        def jsonSlurper = new JsonSlurper();
        def params = jsonSlurper.parseText(request.getReader().text)

        //System.out.println(params.url)
        def picture = new Picture(url: params.url, title: params.title, imageUrl: params.imageUrl).save()

        render view: 'index'
    }

    def favorites(){
        def favourites = Picture.getAll().reverse()
        //println(Picture.getAll())
        render view: "favorites", model: [favorites: favourites]
    }


}
