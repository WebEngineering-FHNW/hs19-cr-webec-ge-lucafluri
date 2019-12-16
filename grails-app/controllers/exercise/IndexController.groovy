package exercise

import grails.plugin.springsecurity.annotation.Secured
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder

@Secured('permitAll')
class IndexController {

    String getUsername(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication()
        return authentication.getName();
    }

    boolean loggedIn(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication()
        //Checking for username because somehow the anonymous user is always authenticated?!
        return authentication.getName() != "__grails.anonymous.user__"
    }

    def index() {
        render view: "index", model: [loggedIn: loggedIn(), username: getUsername()];
    }
}
