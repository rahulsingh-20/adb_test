# Adbrew Assignment

### Rahul Singh

### email: rahulapril20@gmail.com

### branch to refer: changes

## Note:

This assignment has some changes in Dockerfile, depending upon the specific obstacles I faced in the setup process.

<ul>
<li>The version of react-scripts has been upgraded in package.json to avoid createHash related errors.</li>
<li>The lines 18 to 22 have been added to properly install mongodb-org. They are concerned with the installation of libssl1.1 and are specific to my system. For testing on another system, the Dockerfile from master may be used.</li>
</ul>

## Explaination of docker compose file

This file defines 3 services: `app`, `api` and `mongo`.

1. api Service
   <ul>
    <li>build: . specifies that the Dockerfile for this service is in the current directory.</li>
    <li>container_name: Sets the name of the container to api.</li>
    <li>command: Runs the command bash -c "cd /src/rest && python manage.py runserver 0.0.0.0:8000" when the container starts. This command:<ul>
        <li>Changes the working directory to /src/rest.</li>
        <li>Starts a Django development server listening on all interfaces (0.0.0.0) at port 8000.</li></ul></li>
    <li>ports: Maps port 8000 on the host to port 8000 in the container.</li>
    <li>links: Links the mongo service to this service, allowing the api container to communicate with the mongo container.</li>
    <li>volumes:<ul>
        <li>${ADBREW_CODEBASE_PATH}/tmp:/tmp: Maps a directory from the host (defined by the ADBREW_CODEBASE_PATH environment variable) to /tmp in the container.</li>
        <li>${ADBREW_CODEBASE_PATH}:/src: Maps a directory from the host to /src in the container, allowing the container to access the source code.</li>
        </ul>
        </li>
        </ul>

2. app Service

   1. build: . specifies that the Dockerfile for this service is in the current directory.
   2. container_name: Sets the name of the container to app.
   3. command: Runs the command bash -c "cd /src/app && yarn install && yarn start" when the container starts. This command:
      1. Changes the working directory to /src/app.
      2. Installs the JavaScript dependencies using yarn install.
      3. Starts the application using yarn start.
   4. ports: Maps port 3000 on the host to port 3000 in the container.
   5. volumes: 1.${ADBREW_CODEBASE_PATH}:/src maps a directory from the host to /src in the container, allowing the container to access the source code.

3. mongo Service

   1. build: . specifies that the Dockerfile for this service is in the current directory.
   2. container_name: Sets the name of the container to mongo.
   3. restart: Always restarts the container if it stops.
   4. ports: Maps port 27017 on the host to port 27017 in the container.
   5. volumes: ${ADBREW_CODEBASE_PATH}/db/:/data/db maps a directory from the host to /data/db in the container, where MongoDB stores its data.
   6. command: Runs the command /usr/bin/mongod --bind_ip 0.0.0.0 to start the MongoDB server, binding it to all network interfaces.
