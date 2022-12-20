export default class Router {

    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.target.href)

        this.handle()
    }

    changeBackground() {
        const { pathname } = window.location;
      
        const { body } = document;
      
        switch (pathname) {
          case '/':
            body.className = 'home';
            break;
      
          case '/index.html':
            body.className = 'home';
            break;
        
          case '/universe':
            body.className = 'universe';
            break;
      
          case '/exploration':
            body.className = 'exploration';
            break;
      
          default:
            body.className = '';
            break;
        }
    }   

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
        this.changeBackground()

        fetch(route)
        .then((data) => data.text())
        .then((html) => {
            document.querySelector('#app').innerHTML = html
        })
    }

}