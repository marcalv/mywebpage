<!--name:Servidor en casa - Parte 6: Copia de seguridad _-->
<!--pubdate:2022/08/19_-->
<!--moddate:2022/08/19_-->
<!--icon:raspberry_-->


<!--[![Enlace al video de esta parte.](/static/files/images/guiaraspi_thumbnail.jpg)](https://www.youtube.com/watch?v=9BBMH44h1rc)-->

## 5.1 Script bash para la copia de seguridad 

A continuación, facilito el script completo para realizar una copia de seguridad de los datos persistentes de los contedores (carpetas dentro de `/home/pi/compose/data` si has ido seguiendo las rutas del tutorial) y el archivo de configuración docker-compose.yml. 

El script creará una copia de seguridad del fichero docker-compose.yml y las carpetas dentro de `/home/pi/compose/data` de cada servicio como un tar.gz (archivos comprimidos de los datos de cada uno de los servicios). 

```
#!/bin/bash

# ========================
# Backup Docker Raspberry
# ========================

# Dependencias:
#    - rsync en ambas máquinas (Raspberry y PC). Instalar con 'sudo apt install rsync'.
#    - pv en PC. Instalar con 'sudo apt install pv'. 

# Para restablecer los backups:
# cat SERVICIO.tar.gz | ssh root@RASPBERRY_IP "cd DATAPATH; tar xvf -"


# Personaliza estas variables según tu necesidad:
BACKUPPATH="/RUTA/ALMACEN/BACKUP/EN/TU/PC"
DATAPATH="/home/pi/compose/data"
COMPOSEPATH="/home/pi/compose"
RASPBERRY_IP="RASPBERRY_IP"

services=( swag pihole)
exclude=( )

# Inicio del script

now=$(date "+%F-%T")

if [ -d "$BACKUPPATH" ]; then
  figlet "Container's data"

  cd ${BACKUPPATH}
  mkdir ${now}
  cd ${now}

  for service in "${services[@]}"
  do
    if [[ ! " ${exclude[@]} " =~ " ${service} " ]]; then
      echo "${service}========================================="
      ssh root@${RASPBERRY_IP} "cd ${COMPOSEPATH} && docker-compose stop ${service}"
      ssh root@${RASPBERRY_IP} "cd ${DATAPATH} && tar --exclude='*qbittorrent/downloads' -cvf - ${service}" | pv >   ${service}.tar.gz
      ssh root@${RASPBERRY_IP} "cd ${COMPOSEPATH} && docker-compose start ${service}"
    fi
  done

  figlet 'docker-compose.yml'
  rsync -av --delete -h -i --stats root@${RASPBERRY_IP}:${COMPOSEPATH}/docker-compose.yml ${BACKUPPATH}/${now} | grep -E '^[^.]|^$'


else
  echo "Error: Destination path not found! (${BACKUPPATH})"
  exit 1
fi

exit 0
```



## 5.2 Instalar dependencias y el script

Para instalar las dependencias en la raspberry, iniciamos una sesión ssh como root (usando las llaves que generamos en el capítulo anterior) y ejecutamos el comando `apt install rsync`. 

En el PC desde el que ejecutaremos el script de backup, instalamos las dependencias con el comando `sudo apt install rsync pv` si estas en una distribución basada en Debian. En Archlinux, por ejemplo, el comando sería `sudo pacman -S rsync pv`.

A continuación, navegamos hasta la carpeta donde queramos ejecutar el script, creamos un fichero vacio de nombre `backup.sh` y pegamos el script del punto 5.1. Importante marcar el archivo como ejecutable mediante el comando `sudo chmod +x backup.sh`.


## 5.3 Personalizar el script

Del script deberemos modificar a nuestra conveniencia las siguientes variables:

* `BACKUPPATH`: Ruta de tu pc en la que se almacenarán los backups. Puede ser un disco duro extraible conectado a tu pc en el momento de la ejecución.
* `DATAPATH`: Carpeta donde se encuentran montados los volumenes de los contenedores, que almacenan los datos que queremos que persistan. Si has seguido las rutas del tutorial, esta es `/home/pi/compose/data`.
* `COMPOSEPATH`: Carpeta donde se encuentra el fichero `docker-compose.yml`. Si has seguido las rutas del tutorial, esta es `/home/pi/compose`.
* `RASPBERRY_IP`: La ip local de tu raspberry. 
* `services`: Lista de los nombres de las carpeta que se encuentran dentro de `DATAPATH` que queremos haer backup, separadas con espacio. Si has seguido con la metodología del tutorial, coinciden con los nombres de los servicios. 
* `exclude`: Lista de los nombres de las carpetas que no queremos hacer backup. Si en la variable `services` colocamos `swag pihole` y a `exclude` le damos el valor de `swag`, solo se hará el backup de `pihole`.

## 5.4 Hacer backup y restablecer backup

Para hacer el backup, simplemente ejecuta el script navengado a la carpeta en la que se encuentre y ejeuta el comando `./backup`. 

Para restablecer el backup de un servicio, sigue los pasos:

1. En la raspberry: Para el servicio con el comando `docker stop SERVICIO`
2. En la raspberry: Elimina los datos (si existen) de ese servicio, navengado a `/home/pi/compose/data` y ejecutando el comando `rm -rfd SERVICIO`.
3. En tu PC: Navega hasta el fichero tar.gz del servicio a restablecer y ejecuta el siguiente comando: `cat SERVICIO.tar.gz | ssh root@RASPBERRY_IP "cd DATAPATH; tar xvf -"` reemplazando `SERVICIO`, `RASPBERRY_IP` Y `DATAPATH` por los valores adecuados. Un ejemplo de este comando correctamente cumplimentado sería: `cat pihole.tar.gz | ssh root@192.168.1.109 "cd /home/pi/compose/data; tar xvf -"`
