<!--name:Servidor en casa - Parte 4: Instalando Qbittorrent, Jackett y Wireguard_-->
<!--pubdate:2020/09/26_-->
<!--moddate:2020/09/26_-->
<!--icon:raspberry_-->


[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/Tuc5nh77Jy4/0.jpg)](https://www.youtube.com/watch?v=Tuc5nh77Jy4)


## 4.1 Contenedor Qbittorent
Más información del contenedor: [github.com/linuxserver/docker-qbitorrent](https://github.com/linuxserver/docker-qbitorrent)

Añade a `docker-compose.yml` las lineas del servicio que puedes encontrar en la parte 2 de la guía, o en la documentación del contenedor (link anterior). Levanta el contenedor con:

```
sudo docker-compose up -d qbittorrent && sudo docker logs -f qbittorrent
```

### Crear reverse-proxy

```
cp /home/pi/compose/data/swag/config/nginx/proxy-confs/qbittorrent.subfolder.conf.sample /home/pi/compose/data/swag/config/nginx/proxy-confs/qbittorrent.subfolder.conf
```

Reinicia SWAG con 

```
sudo docker-compose restart swag && sudo docker logs -f swag
```

Accede al servicio con `TU_DOMINIO.duckdns.org/jackett`

## 4.2 Levantar el contenedor Jackett
Más información del contenedor: [github.com/linuxserver/docker-jackett](https://github.com/linuxserver/docker-jackett)

Añade a `docker-compose.yml` las lineas del servicio que puedes encontrar en la parte 2 de la guía, o en la documentación del contenedor (link anterior). 
Levanta el contenedor con 

```
sudo docker-compose up -d jackett && sudo docker logs -f jackett
```

### Crear reverse-proxy

```
cp /home/pi/compose/data/swag/config/nginx/proxy-confs/jackett.subfolder.conf.sample /home/pi/compose/data/swag/config/nginx/proxy-confs/jackett.subfolder.conf
```

Accede a `http://IP_RASPBERRY_LOCAL:9117`, en path override escribe `/jackett` y configura una contraseña de administrador.

Reinicia SWAG y jackett con:

```
sudo docker-compose restart swag && sudo docker logs -f swag
sudo docker-compose restart jackett && sudo docker logs -f jackett
```

Accede al servicio con `TU_DOMINIO.duckdns.org/jackett`


## 4.3 Web estática

Puedes colocar los archivos de tu web estática en `/home/pi/compose/data/swag/config/www/` y acceder mediante `tudominio.duckdns.org`


## 4.4 Wireguard
Más información del contenedor: [github.com/linuxserver/docker-wireguard](https://github.com/linuxserver/docker-wireguard)

Añade a `docker-compose.yml` las lineas del servicio que puedes encontrar en la parte 2 de la guía, o en la documentación del contenedor (link anterior). 



Levanta el contenedor con 

```
sudo docker-compose up -d wireguard && sudo docker logs -f wireguard
```

Redirige el puerto `51820` en el router a la IP de tu Raspberry. No requiere reverse-proxy. Los credenciales para conectarse a la VPN se van a la carpeta de configuración (volumen externo del contenedor). 

Toda la información está en el repositorio del proyecto. 