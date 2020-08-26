<!--name:Servidor en casa - Parte 3: Instalando Nextcloud_-->
<!--pubdate:2020/09/26_-->
<!--moddate:2020/09/26_-->
<!--icon:raspberry_-->


[![Enlace al video de esta parte.](/static/files/images/guiaraspi_thumbnail.png)](https://www.youtube.com/watch?v=tsbltEpkSiI)

## 3.1 Contenedor Nextcloud
Más información del contenedor: [github.com/linuxserver/docker-nextcloud](https://github.com/linuxserver/docker-nextcloud)

Si antes no has pegado todos los servicios en el archivo `docker-compose.yml`, asegurate de añadir las lineas del servicio `nextcloud`.

Levanta el contenedor con 

```
sudo docker-compose up -d nextcloud && sudo docker logs -f nextcloud
```

Comprueba que la web carga accediendo a `https://IP_RASPBERRY_LOCAL:2443`.

### Crear reverse-proxy

Al igual que con Pi-hole, habilitamos la configuración para crear el reverse-proxy para Nextcloud, al cual accederemos desde el subdiretorio `/nextcloud`.

```
cp /home/pi/compose/data/swag/config/nginx/proxy-confs/nextcloud.subfolder.conf.sample /home/pi/compose/data/swag/config/nginx/proxy-confs/nextcloud.subfolder.conf
```


Edita el archivo `nextcloud.subfolder.conf` y modifica el 2048 por 1024:

```
nano /home/pi/compose/data/swag/config/nginx/proxy-confs/nextcloud.subfolder.conf
```

Edita el archivo `config.php` con el comando

```
nano /mnt/usb/nextcloud/config/www/nextcloud/config/config.php
```

y añade antes del `);` lo siguiente:


```
'trusted_proxies' => ['swag'],
  'overwritewebroot' => '/nextcloud',
  'overwrite.cli.url' => 'https://TU_DOMINIO.duckdns.org/nextcloud',
  'trusted_domains' =>
  array (
    0 => '192.168.1.11',   #Tu IP LOCAL
    1 => 'TU_DOMINIO.duckdns.org',
  ),
```

Modifica tu dominio (dos veces) y tu IP local.

Reiniciar SWAG y Nextcloud con

```
sudo docker-compose restart swag && sudo docker logs -f swag
sudo docker-compose restart nextcloud && sudo docker logs -f nextcloud
```

Accede a [https://TU_DOMINIO.duckdns.org/nextcloud/](https://TU_DOMINIO.duckdns.org/nextcloud/) para comprobar que funciona, tanto dentro como fuera de la red local.