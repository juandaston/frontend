# Consultorio

## Tabla de contenidos
* [Instalación](#Instalación)
* [Compilación](#Compilación)
* [Ejecución](#Ejecución)
* [Desarrollo](#Desarrollo)
* [Pruebas](#Pruebas)
* [Ambiente](#Ambiente)

## Instalación
* Instalar y configurar en su ambiente las siguientes dependencias:
   
    * [NodeJS](https://nodejs.org) 

    Instalar con npm las dependencias asociadas: bower y gulp.
    ```
    npm install -g bower gulp tsd
    ```

    Instalar dependencias del proyecto npm, bower y tsd.
    ```
    npm install
    bower install
    tsd install
    ```

## Compilación

* `package.json` se encuentra la especificación de dependencias de desarrollo nodejs.

* `bower.json` se encuentran las dependencias javascript necesarias al momento de correr la aplicación.

* `gulpfile.js` se encuentra la especificación del build para compilar la aplicación a su versión de distribución.

* `build.gradle` se especifica que la distribución compilada por gulp debe ser empaquetada en un war.

* `tsd.json` se especifican las definiciones Typescript de las librerias bower que estamos usando.

  ### Tareas disponibles en `gradle`

  ### Tareas disponibles en `gulp`

    Como referencia documentación [Generador](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/README.md)

    * `gulp` or `gulp build` to build an optimized version of your application in `/dist`
    * `gulp serve` to launch a browser sync server on your source files
    * `gulp serve:dist` to launch a server on your optimized application
    * `gulp test` to launch your unit tests with Karma
    * `gulp test:auto` to launch your unit tests with Karma in watch mode
    * `gulp protractor` to launch your e2e tests with Protractor
    * `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

## Ejecución

* Desplegar el WAR en el contenedor de destino.
    * WAS Liberty Profile en desarrollo
        * `gradle run` Copiar war en defaultServer/dropins - Definir variable de entorno WLP_HOME apuntando al directorio wlp en su maquina. Esta tarea asume que 
        su servidor es el `defaultServer`

## Desarrollo

### Modulos

* `src/app/index.module.ts` Es el entry point de la aplicación donde se define el modulo principal y se referencian los modulos secundarios.

* `src/app/nombremodulo/nombremodulo.module.ts` Por cada bloque funcional de la aplicación se debe trabajar en su modulo respectivo. 
Estos modulos se definen como namespaces de Typescript y dentro del namespace se define el modulo de angular.
En la definición del modulo angular se deben referenciar todos los artefactos (servicios, directivas, componentes, filtros, bloques de configuración del modulo, etc).

```
import { config } from './nombremodulo.config';
import { run } from './nombremodulo.run';
import { routes } from './nombremodulo.routes';

import { ServiceA } from './services/a.service';
import { ServiceB } from './services/b.service';

import { ComponentA } from './components/a.component';
import { ComponentB } from './components/b.component';
import { DirectiveC } from './directives/c.component';

namespace advance.nombremodulo {
  'use strict';

  angular.module('advance.nombremodulo', [])    
    .config(config)
    .config(routes)
    .run(run)
    .factory('ServiceA', ServiceA)
    .factory('ServiceB', ServiceB)
    .component('advance-component-a', ComponentA)
    .component('advance-component-b', ComponentB)
    .directive('advance-directive-c', DirectiveC);
}
```

* `src/app/core/core.module.ts` El modulo comun donde se deben desarrollar los artefactos comunes de varios modulos.

* `src/app/layout/layout.module.ts` El modulo donde se encuentran los layouts principales de la aplicación, asi como los estados ui.router (URIs) principales.

### Componentes y Directivas

* El desarrollo de la aplicación estara guiado exclusivamente mediante el uso de componentes web. Esto significa que NO se hará el uso del metodo .controller() angular,
o de templates que no esten asociados a un componente.
    * [Link de referencia](https://www.airpair.com/angularjs/posts/preparing-for-the-future-of-angularjs)
    * [Link de referencia](http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html)

* Todo componente web que tenga un template asociado debe crearse usando el metodo .directive() de tipo element. Se puede hacer uso del metodo .component(). 
    * [Link de referencia](http://toddmotto.com/exploring-the-angular-1-5-component-method/)

* Todo componente web que no tenga template asociado, que tenga cierto comportamiento como manipular el DOM deb ser una directiva de tipo atributo.

* Los templates asociados a un estado de ui.router (URIs) deben ser inline y referenciar el componente web asociado.

```
$stateProvider.state('miestado', {
    url: '/miestado',
    template: `<mi-componente-web></mi-componente-web>`
});
```

### Estilos CSS

* `src/app/index.scss` es el archivo principal de los estilos donde gulp inyectara automaticamente en la compilación los otros archivos .scss que se encuentren en el proyecto.

* Cada componente web debe tener asociado sus estilos CSS usando SASS en un archivo con extensión .scss

## Pruebas

## Validacion de campos obligatorios

*   la validación de los campos obligatorios se centralizo en una directgiva de tipo atributo llamada advance-validations la forma de empleo es la siguiente:
 ```
  <input type="text" ... form="vm.form" name="primerNombre" required advance-validations/>
 ```
*   Es obligatorio tener en la etiqueta hml los atributos name, form, las validaciones correspondientes a ese campo como required o minlength y el atributo creado para la directiva.

## Ambiente

* Al trabajar con el api y el front en origenes diferentes, el consumo de los servicios al api responderan con un 401 - falta la cabecera CORS 'Access-Control-Allow-Origin'.
    
    Asi por ejemplo tenemos:
    * api/back-end ->    http:/localhost:9080/
    * front-end ->       http:/localhost:3000/
    
 Una solucion a esto es instalar y configurar haproxy para que el api y el front esten en el mismo origin.
   
### Instalar HAProxy ubunto/mint
* `add-apt-repository ppa:vbernat/haproxy-1.5`
* `apt-get update`
* `apt-get install haproxy  `

### Configurar HAProxy

En el archivo de configuracion del HAPRoxy `/etc/haproxy/haproxy.cfg`

```
frontend in-http
        bind *:80
        # ACL
        acl path_api path_beg -i  /api
        use_backend api-backend if path_api
        default_backend web-backend

backend web-backend
        server miwww1 localhost:3000 check

backend api-backend
        # REWRITE
        reqrep ^([^\ ]*\ /)api[/]?(.*)     \1\2
        server miback1 localhost:9080 check    
```
 * `sudo service haproxy restart`

De esta forma todas las peticiones a http://localhost redireccionan al puerto 3000 a no ser que el path comience con /api que en este caso redireccionan al 9080 con lo cual debemos cambiar las uri de los recursos por http://localhost/api/...

# Mysql

## Primero descargar la imagen de docker:

docker pull mysql/mysql-server:lastet

## Luego correr la imagen de la siguiente manera:

sudo docker run -p 3306:3306 --name=mysql1 -d mysql/mysql-server

## Mirar el pass generado de forma automatica:

docker logs mysql1 2>&1 | grep GENERATED.

## Y con ese pasword entrar a 

docker exec -it mysql1 mysql -uroot -p

## Crear un nuevo usuario de la siguiente manera para que pueda ingresar desde sql developer desde afuera. es importante el % para
que pueda acceder desde afuera

CREATE USER 'admin'@'%' IDENTIFIED BY 'tu_contrasena';

# Luego darle todos los permisos:

GRANT ALL PRIVILEGES ON * . * TO 'admin'@'%';

# Por si las dudas consultar esta pagina para dar acceso desde mas afuera

https://github.com/docker-library/mysql/issues/275


