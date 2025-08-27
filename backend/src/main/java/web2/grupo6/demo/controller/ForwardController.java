package web2.grupo6.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


//isso daqui redireciona as requisições miscelaneas de volta para index.html (o aplicativo em si)
@Controller
public class ForwardController {

    @RequestMapping(value = {"/{path:[^\\.]*}", "/{path:[^\\.]*}/**"})
    public String forward() {
        return "forward:/index.html";
    }
}
