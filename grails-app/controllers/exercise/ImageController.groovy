package exercise

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*

class ImageController {

    ImageService imageService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond imageService.list(params), model:[imageCount: imageService.count()]
    }

    def show(Long id) {
        respond imageService.get(id)
    }

    def create() {
        respond new Image(params)
    }

    def save(Image image) {
        if (image == null) {
            notFound()
            return
        }

        try {
            imageService.save(image)
        } catch (ValidationException e) {
            respond image.errors, view:'create'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.created.message', args: [message(code: 'image.label', default: 'Image'), image.id])
                redirect image
            }
            '*' { respond image, [status: CREATED] }
        }
    }

    def edit(Long id) {
        respond imageService.get(id)
    }

    def update(Image image) {
        if (image == null) {
            notFound()
            return
        }

        try {
            imageService.save(image)
        } catch (ValidationException e) {
            respond image.errors, view:'edit'
            return
        }

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.updated.message', args: [message(code: 'image.label', default: 'Image'), image.id])
                redirect image
            }
            '*'{ respond image, [status: OK] }
        }
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        imageService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.deleted.message', args: [message(code: 'image.label', default: 'Image'), id])
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = message(code: 'default.not.found.message', args: [message(code: 'image.label', default: 'Image'), params.id])
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}
