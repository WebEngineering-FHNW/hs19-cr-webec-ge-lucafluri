package exercise

import grails.gorm.services.Service

@Service(Image)
interface ImageService {

    Image get(Serializable id)

    List<Image> list(Map args)

    Long count()

    void delete(Serializable id)

    Image save(Image image)

}