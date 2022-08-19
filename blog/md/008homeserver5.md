<!--name:Servidor en casa - Parte 5: Acceso remoto mediante llaves de encriptado_-->
<!--pubdate:2020/10/04_-->
<!--moddate:2022/08/19_-->
<!--icon:raspberry_-->


[![Enlace al video de esta parte.](/static/files/images/guiaraspi_thumbnail.jpg)](https://www.youtube.com/watch?v=9BBMH44h1rc)

## 5.1 Acceso SSH mediante llaves de encriptado

A continuación configuraremos el acceso por SSH como usuario root a la Raspberry mediante de llaves de encriptado. A nivel de seguridad sería equivalente a usar una contraseña lo suficientemente larga. 

Sin embargo, obtendremos otros beneficios, como poder acceder por SSH desde los dispositivos autorizados sin escribir la contraseña al inicio de cada conexión. Esto será útil para poder automatizar el proceso de backup sin tener que lidiar con contraseñas. Otra ventaja es la posibilidad de administrar el acceso de cada uno de los dispositivos por separado. 


## 5.2 Permitir el login root temporalmente

Entra por SSH a la Raspberry como el usuario pi, es decir, como siempre hasta ahora. 

Crea la contraseña del usuario root con `sudo passwd root`

Edita el archivo `ssdh_config` con el comando `sudo nano /etc/ssh/sshd_config` y descomentar la linea `PermitRootLogin yes`

Reinicia el servicio sshd con `sudo service sshd restart` para poner en marcha la nueva configuración.

Cierra la conexión y abre una nueva, pero ahora con el usuario root, con `ssh root@IP_RASPBERRY_LOCAL`. Deberias poder conectarte correctamente una vez introduzcas la contraseña del usuario root que hemos configurado previamente. 

## 5.3 Crear y enviar las llaves de encriptado 

A continuación crearemos las llaves de encriptado en el dispositivo desde el cual nos conectamos por SSH a la Raspberry. Se creará una llave privada y una llave pública que será la que enviemos a la Raspberry y de esta forma nos autorice a conectarnos. 

Crea las llaves con `ssh-keygen -t rsa`. Por defecto se guardaran dentro de la carpeta `.ssh` situada en el directorio `home` de tu sistema. 

Envíalas a la Raspberry con `ssh-copy-id root@IP_RASPBERRY_LOCAL`

Como puedes ver, para poder enviar la llave pública para acceder como usuario root, es indispensable habilitar el propio acceso root, que es lo que hemos hecho en el paso 5.3.

Confirma que puedes acceder como root con el comando `ssh root@IP_RASPBERRY_LOCAL` sin que ninguna contraseña sea solicitada. Sin embargo, aún sería posible acceder como root desde otro dispositivo sin contraseña. 

## 5.4 Bloquear el acceso con contraseña

Dada la política actual de acceso que hemos configurado en el apartado 5.2 con la línea `PermitRootLogin yes`, otros dispositivos siguen pudiendo acceder mediante contraseña. Para evitar esto cambiaremos la directriz de la configuración a `PermitRootLogin without-password`. 

Al igual que en el punto 5.2, modifica el archivo `/etc/ssh/sshd_config` y sustituye la línea `PermitRootLogin yes` por `PermitRootLogin without-password`. 

Reiniciar el servicio sshd con `sudo service sshd restart`. 

**¡ATENCIÓN! Mi consejo es que no cerréis la ventana actual**. Comprobad en otra terminal que podéis acceder con `ssh root@IP_RASPBERRY_LOCAL` correctamente y sin contraseña. 

Si la directriz se configura como `PermitRootLogin without-password` y las llaves no se han copiado correctamente, nos quedaríamos sin acceso remoto. Este problema sería equivalente a perder la contraseña de acceso. Lee el siguiente punto para entender donde se guardan las llaves en la Raspberry y asegurarte de que se ha copiado. 

## 5.5 Administrar acceso

Con este método se pueden configurar diferentes dispositivos para accedan remótamente sin contraseña. Para poder eliminar este acceso, en la Raspberry edita el siguiente fichero con: `sudo nano /root/.ssh/authorized_keys`

Cada línea de este archivo es una llave de cada dispositivo. Al final de cada línea podrás ver con más fácilidad de que dispositivo se trata. Para eliminar el acceso, simplemente borra la línea asociada al dispositivo.