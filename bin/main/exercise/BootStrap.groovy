package exercise

class BootStrap {

    def init = { servletContext ->
        // In production or test, this might already be in the DB
        Role adminRole = save(Role.findOrCreateWhere(authority: Role.ADMIN))
        Role userRole = save(Role.findOrCreateWhere(authority: Role.USER))

        User user = save(new User(username: 'user', password: 'user'))
        User admin = save(new User(username: 'admin', password: 'admin'))

        UserRole.create(user, userRole, true)
        UserRole.create(admin, adminRole, true)

        // Plausibility check
        assert Role.count() == 2
        assert User.count() == 2
        assert UserRole.count() == 2
    }

    static save(domainObject) {
        domainObject.save(failOnError: true, flush: true)
    }
    def destroy = {

    }
}
