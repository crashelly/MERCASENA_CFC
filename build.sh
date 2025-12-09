docker compose up --build -d
#como el composer no sirve per se en el dockerfile del servicio backend toco ponerlo aca q si da
docker compose exec backend composer install