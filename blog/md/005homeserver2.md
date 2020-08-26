<!--name:Servidor en casa - Parte 2: Conexión a la red_-->
<!--pubdate:2020/09/26_-->
<!--moddate:2020/09/26_-->
<!--icon:raspberry_-->


[![Enlace al video de esta parte.](/static/files/images/guiaraspi_thumbnail.png)](https://www.youtube.com/watch?v=c4J7Ya6reUY)


## 2.1 Abrir puertos
Configura en [tu router](http://192.168.1.1) las siguientes redirecciónes de puertos públicos:

* Puerto público 443 a la IP de tu raspberry, puerto 443.
* Puerto público 80 a la IP de tu raspberry, puerto 80.


## 2.2 Instalar dependecias
Volvemos a la raspberry. Ahora instalaremos docker-compose y lo activaremos con los siguientes comandos:

```
sudo apt install docker-compose
sudo systemctl enable docker
sudo reboot
```


## 2.3 Crear docker-compose.yml
Creamos el archivo docker-compose.yml.

```
mkdir compose
cd compose
nano docker-compose.yml
```

Contenido del archivo:

```

version: '2.1'
services:
  duckdns:
    image: linuxserver/duckdns
    container_name: duckdns
    environment:
      - PUID=1000 #optional
      - PGID=1000 #optional
      - TZ=Europe/Madrid
      - SUBDOMAINS=TU_SUBDOMINIO,
      - TOKEN=TU_TOKEN
      - LOG_FILE=false #optional
    volumes:
      - /home/pi/compose/data/duckdns/config:/config #optional
    restart: unless-stopped
    
  swag:
    image: linuxserver/swag
    container_name: swag
    cap_add:
      - NET_ADMIN
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Madrid
      - URL=TU_SUBDOMINIO.duckdns.org
      - SUBDOMAINS=www,
      - VALIDATION=duckdns
      - DNSPLUGIN=cloudflare #optional
      - PROPAGATION= #optional
      - DUCKDNSTOKEN=TU_TOKEN
      - EMAIL= #optional
      - ONLY_SUBDOMAINS=false #optional
      - EXTRA_DOMAINS= #optional
      - STAGING=false #optional
    volumes:
      - /home/pi/compose/data/swag/config:/config
    ports:
      - 443:443
      - 80:80 #optional
    restart: unless-stopped

  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    ports:
      - 53:53/tcp
      - 53:53/udp
      - 67:67/udp
      - 1080:80/tcp
      - 1443:443/tcp
    environment:
      TZ: Europe/Madrid
    volumes:
       - /home/pi/compose/data/pihole/etc-pihole/:/etc/pihole/
       - /home/pi/compose/data/pihole/etc-dnsmasq.d/:/etc/dnsmasq.d/
    dns:
      - 127.0.0.1
      - 1.1.1.1
    cap_add:
      - NET_ADMIN
    restart: unless-stopped

  nextcloud:
    image: linuxserver/nextcloud
    container_name: nextcloud
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Madrid
    volumes:
      - /home/pi/compose/data/nextcloud/config:/config
      - /home/pi/compose/data/nextcloud/data:/data
    ports:
      - 2443:443
    restart: unless-stopped

  qbittorrent:
    image: linuxserver/qbittorrent
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Madrid
      - UMASK_SET=022
      - WEBUI_PORT=8080
    volumes:
      - /home/pi/compose/data/qbittorrent/config:/config
      - /home/pi/compose/data/qbittorrent/downloads:/downloads
    ports:
      - 6881:6881
      - 6881:6881/udp
      - 3080:8080
    restart: unless-stopped

  jackett:
    image: linuxserver/jackett
    container_name: jackett
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Madrid
      - AUTO_UPDATE=true #optional
      - RUN_OPTS=<run options here> #optional
    volumes:
      - /home/pi/compose/data/jackett/config:/config
      - /home/pi/compose/data/jackett/downloads:/downloads
    ports:
      - 9117:9117
    restart: unless-stopped
 
```

**Importante:** Las tabulaciones son importantes. Confirma que delante de cada nombre de servicio (swag, pihole, nextcloud) hay dos espacios.


## 2.4 Contenedor duckdns
Más información del contenedor: [github.com/linuxserver/docker-duckdns](https://github.com/linuxserver/docker-duckdns)

### Crear cuenta en duckdns.org
Crear cuenta en [duckdns.org](duckdns.org), crear subdominio con IP aleatoria, para posteriormente comprobar que se actualiza con la IP pública de nuestro router real.

### Personalizar duckdns en docker-compose.yml
Dentro del servicio duckdns, reemplaza los campos `SUBDOMAINS` y `TOKEN`.

### Levantar duckdns
Levanta el contenedor con `sudo docker-compose up -d duckdns`, estando en dentro de la carpeta `compose` que contiene el archivo `docker-compose.yml`.

Para confirmar que el contenedor se ha levantado correctamente, usa el comando `sudo docker logs -f duckdns` para visualizar los registros. Usa `Ctrl+C` para cerrar el visualizador.

Confirma que en el panel de control de duckdns.org la IP de tu subdominio se ha actualizado con tu IP real.

## 2.5 Contenedor SWAG 
Más información del contenedor: [github.com/linuxserver/docker-swag](https://github.com/linuxserver/docker-swag)

### Personalizar swag en docker-compose.yml
Personaliza en el bloque del servicio `swag` el campo `URL` y el `DUCKDNSTOKEN`.

### Levantar SWAG
Levanta el contenedor con `sudo docker-compose up -d swag && sudo docker logs -f swag`

Si has configurado bien el router y el docker-compose.yml, deberá aparecerte una linea con "Congratulations". Si obtienes errores, tendras que revisar la configuración. Estos comandos de docker-compose te pueden ser útiles:

```
docker-compose up -d swag # Crear y arrancar contenedor
docker-compose stop swag # Parar contenedor 
docker-compose start swag # Arrancar contenedor
docker-compose down swag #Parar y eliminar contenedor
```


### Comprobación
Entra en  `https://IP_RASPBERRY_LOCAL`, te aparecerá una advertencia, acepta los riesgos. Veras una web simple si todo está  correcto.

En función de si tu router soporta NAT loopback, los siguientes resultados pueden variar.

Si entras en https://marcloud.duckdns.org sin problemas, tu router soporta NAT loopback. Si no te funciona, entra desde un móvil con datos, no WiFi. Si ahora funciona todo esta bien, pero tu router no soporta NAT loopback.

Para solucionar este problema, se instala Pi-hole que actúa como intermediario entre el router y tu dispositivo, realizando la función de NAT loopback, pudiendo acceder con el dominio de duckdns desde dentro de la red local. 


## 2.6 Contenedor Pi-hole
Más información del contenedor: https://github.com/pi-hole/docker-pi-hole

### Levantar Pi-hole
Levanta Pi-hole: 

```
sudo docker-compose up -d pihole && sudo docker logs -f pihole
```

Configura la contraseña de acceso: `sudo docker exec -it pihole pihole -a -p`

Accede a `http://IP_RASPBERRY_LOCAL:1080/admin/` para comprobar que funciona. 

Ahora añadiremos la regla que nos permita acceder localmente a nuestro dominio. Para ello entramos a Pihole desde `http://IP_RASPBERRY_LOCAL:1080/admin/` por última vez, y en `DNS Records` añadimos una regla que redirija el dominio `TU_DOMINIO.duckdns.org` a la IP de tu Raspberry, en mi caso `192.168.1.11`

Para evitar problemas, edita la siguiente configuración. Dirígete a Settings, DNS, desmcarca todas las casillas de la parte izquierda y añade, a la derecha, un custom DNS server marcando su casilla y escribiendo en la caja de texto `192.168.1.1`. Usa el boton al final de la página para guardar. Con esto hacemos que la Raspberry use como servidor DNS el router. 

### Configurar el DNS en tus dispositivos

En el video muestro como configurar el DNS de forma manual en un dispositivo Android (26:40) y en el sistema operativo Linux con KDE (29:05). Para otros sistemas operativos te facilito otras guias que pueden servirte de ayuda:

* [Para Windows](https://www.windowscentral.com/how-change-your-pcs-dns-settings-windows-10) Recomiendo la segunda opción (vía Settings y no el panel de control), para que la configuración quede modificada en una conexión en específico y no en todas. En una red diferente a la de tu casa no te interesa tener el DNS apuntando a la IP de tu raspberry, porque básicmente no estará ahí.

* [Para MAC](https://www.support.com/how-to/how-to-change-dns-settings-on-a-mac-10189)

### Crear reverse-proxy
El objetivo es poder acceder al panel de control desde fuera de la red local (acceso público) a traves del subdirectorio /pihole, es decir, en `TU_SUBDOMINIO.duckdns.org/pihole/admin`.

Habilitaremos el archivo que contiene esta configuración con el siguiente comando:

```
cp /home/pi/compose/data/swag/config/nginx/proxy-confs/pihole.subfolder.conf.sample /home/pi/compose/data/swag/config/nginx/proxy-confs/pihole.subfolder.conf
```
Con este comando copiamos el archivo `pihole.subfolder.conf.sample` sin la extensión `.sample` para que nginx lo lea (contenedor SWAG). Al inicio de este archivo se encuentran las instrucciones en caso de que sea necesario modificar alguna configuración más. En este caso no es necesario. 


Reiniciamos SWAG con

```
sudo docker-compose restart swag && sudo docker logs -f  swag
```

Desde la red local con un dispositico con el DNS condifigurado correctamente comprueba que puedes entrar a https://marcloud.duckdns.org/pihole/admin/. Desde fuera de la red local, cualquier dispositivo deberia poder acceder también.




## 2.7 Notas adicionales

Con respecto al problema del NAT loopback, existe otra solución que consiste en que Pihole actue como servidor DHCP de la red local pero la estabilidad de toda la red recae sobre nuestro proyecto. Ésta seria una opción a considerar una vez se comprueba que el sistema es estable. Con ello nos ahorrariamos tener que configurar en cada dispositivo que el servidor DNS es la Raspberry. 

Para ello bastaria desactivar el serviodor DHCP en el router y activarlo en Pi-hole. Habría que configurar, eso sí, las reglas de IP locales estáticas otra vez, esta vez, en Pi-hole ya que es ahora la encargada de establecerlas. 


