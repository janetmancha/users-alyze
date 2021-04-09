# users-alyze

Demostración operativa de gestion de usuarios (CRUD) mediante API REST.

Este programa hace uso del servicio Firebase de Google Cloud Platform. En concretro usa los servicios Functions y Firestore.

## API

La API esta documentada con OpenAPI v3.0 en el fichero "users-alyze-openapi.yaml"

Se puede visualizar en linea aqui: <https://validator.swagger.io/?url=https://raw.githubusercontent.com/janetmancha/users-alyze/main/users-alyze-openapi.yaml>

## Requisitos

- Nodejs v12 o superior
- firebase-tools: npm install -g firebase-tools

## Preparativos Firebase

```bash
firebase login --reauth
firebase use users-alyze
```

NOTA: se supone el proyecyo users-alyze creado en la cuenta logada y el firestore inicializado.

## Instalar dependencias

Dentro del directorio *functions*

```bash
npm install
```

## Ejecutar en local con emulador

En el directorio raiz del proyecto

```bash
firebase emulators:start
```

Una vez ejecutado se puede ver el emulador de Firebase en "http://localhost:4000/"

NOTA: Cada vez que termina el emulador se pierden los datos del Firestore emulado.

## Ejecutar tests unitarios y emulador a la vez

Dentro del directorio *functions*

```bash
firebase emulators:exec --project=users-alyze 'npm run test'
```

## Probar en local

```bash
curl -H 'content-type: application/json' -d '{"id":"55555555K", "name": "Janet"}' http://localhost:5001/users-alyze/us-central1/users
curl http://localhost:5001/users-alyze/us-central1/users/55555555K
curl -H 'content-type: application/json' -d '{"id":"11111111A", "name": "Maria"}' http://localhost:5001/users-alyze/us-central1/users
curl http://localhost:5001/users-alyze/us-central1/users
curl -X PUT -H 'content-type: application/json' -d '{"name": "Yanes"}' http://localhost:5001/users-alyze/us-central1/users/55555555K
curl -X DELETE http://localhost:5001/users-alyze/us-central1/users/55555555K
```

## Desplegar en GCP

```bash
firebase deploy --only functions
```

## Probar en GCP

Lo mismo que en local pero cambiando "http://localhost:5001/users-alyze/us-central1" por "https://us-central1-users-alyze.cloudfunctions.net"

```bash
curl -H 'content-type: application/json' -d '{"id":"55555555K", "name": "Janet"}' https://us-central1-users-alyze.cloudfunctions.net/users
curl https://us-central1-users-alyze.cloudfunctions.net/users/55555555K
curl -H 'content-type: application/json' -d '{"id":"11111111A", "name": "Maria"}' https://us-central1-users-alyze.cloudfunctions.net/users
curl https://us-central1-users-alyze.cloudfunctions.net/users
curl -X PUT -H 'content-type: application/json' -d '{"name": "Yanes"}' https://us-central1-users-alyze.cloudfunctions.net/users/55555555K
curl -X DELETE https://us-central1-users-alyze.cloudfunctions.net/users/55555555K
curl -X DELETE https://us-central1-users-alyze.cloudfunctions.net/users/11111111A
```

## TODO

- Validar los usuarios antes de crearlos: campos permitidos y formato de los mismos. Ahora acepta todo. El unico campo obligatorio es el id.
- Revisar las reglas de firestore (firestore.rules). Ahora está en modo debug con todo abierto.
- Controlar todos los posibles errores en los endpoints.

## LICENSE

users-alyze is licensed under the MIT Licence.
