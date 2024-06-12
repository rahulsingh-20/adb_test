# set base image (host OS)
FROM python:3.8

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get -y update
RUN apt-get install -y curl nano wget nginx git

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list


# Mongo
RUN ln -s /bin/echo /bin/systemctl
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
RUN apt-get -y update
RUN echo "deb http://security.ubuntu.com/ubuntu focal-security main" | tee /etc/apt/sources.list.d/focal-security.list
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 871920D1991BC93C
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32
RUN apt-get update
RUN apt-get install libssl1.1
RUN apt-get install -y mongodb-org

# Install Yarn
RUN apt-get install -y yarn

# Install PIP
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3.8 get-pip.py
# RUN easy_install pip


ENV ENV_TYPE staging
ENV MONGO_HOST mongo
ENV MONGO_PORT 27017
##########

ENV PYTHONPATH=$PYTHONPATH:/src/

# copy the dependencies file to the working directory
COPY src/requirements.txt .

# install dependencies
RUN pip install -r requirements.txt
