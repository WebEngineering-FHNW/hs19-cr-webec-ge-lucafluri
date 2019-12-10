package exercise

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        "/favorites"(view: "/Pictures/favorites")
        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
    }
}
