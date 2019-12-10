package exercise

import groovy.json.JsonSlurper

class PictureController {

    static allowedMethods = [add: 'POST']

    def index() {
        render view: 'index'
    }

    def add(String url, String title) {
        def jsonSlurper = new JsonSlurper();
        def params = jsonSlurper.parseText(request.getReader().text)

        //System.out.println(params.url)
        def picture = new Picture(url: params.url, title: params.title).save()

        render view: 'index'
    }

    def favorites(){
        def favourites = Picture.getAll()
        render view: "favorites", model: [favorites: favourites.reverse()]
    }


}
