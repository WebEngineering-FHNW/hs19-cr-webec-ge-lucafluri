package exercise

import grails.plugin.springsecurity.annotation.Secured
import grails.validation.Validateable

@Secured('permitAll')
class AccountController {

    def index() {
        createUsersView()
    }

    def createUsersView() {
        render view: 'accounts', model: 'AccountModel'
    }

    def createUsers(String userName, String password) {
        User user = new User(username: userName, password: password).save(flush: true)
        Role userRole = Role.findOrCreateWhere(authority: Role.USER).save(flush: true)
        new UserRole(user: user, role: userRole).save(flush: true)

        redirect(controller: 'index', action: 'index')
    }

}

class AccountModel implements Validateable{
}


