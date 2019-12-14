package exercise

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        //"/favorites"(view: "/Picture/favorites")
        "/"(controller:"index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
