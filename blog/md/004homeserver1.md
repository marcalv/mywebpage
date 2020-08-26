<!--name:Servidor en casa - Parte 1: Puesta en marcha de la Raspberry Pi_-->
<!--pubdate:2020/09/26_-->
<!--moddate:2020/09/26_-->
<!--icon:raspberry_-->

[![Enlace al video de esta parte.](/static/files/images/guiaraspi_thumbnail.png)](https://www.youtube.com/watch?v=OAY0VTnHiMw)

## 1.1 Instalar Raspberry Pi OS Lite (Healess)
Descargar Raspberry Pi Imager de [aquí](https://www.raspberrypi.org/downloads/) para copiar el SO a la tarjeta SD.

Abrir Pi Imager, seleccionar Raspberry PI OS Lite (32-BIT), seleccionar la tarjeta SD y Write. Cerrar el programa una vez finalizado. 

## 1.2 Preparación de la conexión por SSH
No expulses la tarjeta SD del PC aún.
Accederemos a la Raspberry por SSH una vez haya arrancado, no necesitaremos conectarla a ninguna pantalla ni teclado. Por motivos de seguridad el acceso por ssh esta deshabilitado por defecto. En el siguiente paso lo habilitamos. 

### Habilitar acceso por SSH
Para habilitarlo se crea el archivo en blanco de nombre `ssh` (sin extensión) en la partición `/boot` de la SD. 

### (Opcional) Configurar conexión WiFi
Si vas a conectar la Raspberry por Ethernet este paso no es necesario. Si solo dispones de conexión WiFi, puedes configurarla creando un archivo archivo `wpa_supplicant.conf` en `/boot`. El contenido debe ser el siguiente: 

```
country=ES
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
    ssid="NETWORK-NAME"
    psk="NETWORK-PASSWORD"
}
```

La lista con los códigos para cada país se puede consultar [aquí](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Reemplaza `NETWORK-NAME` y `NETWORK-PASSWORD` con los credenciales de tu WiFi.



## 1.3 Primer arranque
Ahora  sí, podemos desmontar la SD del PC. A continuación la introducimos en la Raspberry, conectamos el cable de Ethernet si tenemos, y por último la alimentación. Arrancará automáticamente.
### IP estática
Mientras la Raspberry arranca, accede a [tu Router](http://192.168.1.1), localiza la IP que se le ha asignado y hazla estática. 

### Configuración básica
Tanto si estas en Windows, como Mac o Linux todos los comandos utilizados son los mismos. Para conectarnos por SSH, conociendo ya la IP de la Raspberry, abrimos una terminal o consola y ejecutamos el comando `ssh pi@IP_RASPBERRY_LOCAL`. En mi caso el comando queda como `ssh pi@192.168.1.11`.

Si todo va bien, en la primera conexión nos aparecerá una pregunta a la que responderemos `yes`. A continuación se nos pedirá la contraseña, que por defecto es `raspberry`.

A continuación realizaremos unos ajustes básicos ejecutando el comando `sudo raspi-config`. En este menú seleccionamos cambiar la contraseña del usuario e introducimos una nueva. Después, en 'Advanced', entramos en la opción 'Expand filesystem'. Una vez finalizado, nos pedirá reiniciar, a lo que responderemos que si. 

Automáticamente se cerrará la conexión ssh. Tras un minuto, puedes volver a ejecutar el comando `ssh pi@IP_RASPBERRY_LOCAL` para volver a conectarte. 

Por último, ejecutaremos el comando `actualizar con sudo apt update && sudo apt upgrade -y` que actualizará los paquetes de la Raspberry a la última versión. Después, `sudo reboot` para reiniciar.


## 1.4 (Opcional, recomendado) Automontar disco duro externo. 
### Formateo
Deberemos formatear el USB o disco duro que conectaremos a la Raspberry en `ext4`. En él almacenaremos todos los datos personales. En Linux puedes hacerlo con el administrador de particiones que tenga tu distribución. Si sólo dispones de Windows puedes encontrar por internet diferentes herramientas que formateen en `ext4`.

### Automontar el disco duro externo
Arrancada la Raspberry, **sin** insertar el USB ejecuta por ssh el comando `sudo blkid`.
A continuación conecta el USB y vuelve a ejecutar el comando `sudo blkid`. En esta segunda ocasión habrá aparecido una nueva linea que se corresponde con el USB que has insertado. Anota el UUID.

Para automontar el USB editamos el archivo `fstab` con el comando `sudo nano /etc/fstab` y añadimos la siguiente linea al final del mismo:

```
UUID=EL_UUID_DE_TU_USB /mnt/usb ext4  rw,users,exec 0 0
```
Reemplaza `EL_UUID_DE_TU_USB`  por tu UUID, y usa `Ctrl+x` para salir del editor.

Ejecuta el comando `sudo mkdir /mnt/usb`. Con esto conseguimos que a cada arranque el USB se monte en la ruta `/mnt/usb`.

Reiniciamos con `sudo reboot` y comprobamos que el USB se ha montado correctamente. Para ello puedes usar el comando `cat /proc/mounts`. En una de las lineas que devuelve debe aparecer el USB montado en la ruta anterior.

