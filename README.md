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

* Al trabajar con el api y el front en origenes diferentes, el consumo de los servicios al api responderan con un 401 - falta la cabecera CORS 'Access-Control-Allow-Origin'.
    
    Asi por ejemplo tenemos:
    * api/back-end ->    http:/localhost:9080/
    * front-end ->       http:/localhost:3000/
    
 Una solucion a esto es instalar y configurar haproxy para que el api y el front esten en el mismo origin.

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


