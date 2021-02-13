# Post_API

A simple API for working with Posts, Comments and Authors.


## Technologies

Backend: Django, Django REST Framework

Frontend: React.js, Redux, CSS, JavaScript

Authentication: JWT Token, SimpleJWT

Container: Docker

Database: PostgreSQL


## Instalation

Open terminal in necessary directory

Commands:

```bash
#clone from github
$ git clone https://github.com/yurasenchuk/posts_api.git

#go to app directory
$ cd posts_api

#create venv
$ python3 -m venv venv

#activate venv
$ source venv/bin/activate

#install requirements
$ pip install requirements.txt
```

## Required files  

Create .env.dev file in /backend directory

Enter settings data in file    
File example:  

      DEBUG=1  
      SECRET_KEY= #my_secret_key  
      DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]  
      SQL_ENGINE=django.db.backends.postgresql  
      SQL_DATABASE= #post_api  
      SQL_USER= #my_username  
      SQL_PASSWORD= #my_password  
      SQL_HOST=db  
      SQL_PORT=5432  
      DATABASE=postgres   


## Run

```bash
#build api
$ sudo docker-compose build

#start api
$ sudo docker-compose up

#migrate
$  sudo docker-compose exec backend python manage.py migrate --noinput
```


## Documentation

[Postman documentation](https://documenter.getpostman.com/view/9324693/TWDRtLL2)
