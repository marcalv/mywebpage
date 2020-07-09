### ¿Dónde está marcalv.com?

Al entrar en la dirección marcalv.com estás conectándote directamente con la [Raspberry Pi 3 B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) que tengo por casa. Todos los archivos necesarios para que la web funcione están en ella.

El dominio [marcalv.com](https://marcalv.com) está alquilado con [Namecheap](https://www.namecheap.com) por 8 euros al año. Además, el servicio incluye la redirección del tráfico a la IP pública de mi casa. 
&nbsp;

### ¿Cómo está hecha?

[Aquí tienes el repositorio con todo el código fuente](https://github.com/marcalv/mywebpage). En su mayoría es HTML y CSS escrito de forma manual, en algunas partes javascript cuando es necesario. Y si lo conoces, ya te habrás dado cuenta... [Bootstrap](https://getbootstrap.com/). Los iconos son de [Icons8](https://icons8.com/).

Todos los archivos se sirven mediante [NGINX](https://www.nginx.com/), el cual se ejecuta en un maravilloso [contenedor docker](https://github.com/linuxserver/docker-letsencrypt) que hace de _reverse-proxy_ con otros servicios de acceso privado que también estan en la Raspberry ([Nextcloud](https://nextcloud.com/), [Pi-hole](https://pi-hole.net/), [freshRSS](https://freshrss.org/), [qBittorrent](https://github.com/linuxserver/docker-qbittorrent), [Jackett](https://github.com/Jackett/Jackett)...).


### ¿Por qué?

A continuación intento justificar la existencia de este sitio:

* Agrupar todo lo que voy haciendo relacionado con la música y la programación en general. Publicarlo en mi propia web me da total control sobre el contenido, funcionamiento y estética.

* Es una forma de *obligarme* a documentar todos los proyectos, y más importante aún, **acabarlos**.

* Aquí puedes encontrar mis datos de contacto: descarga la última versión de mi CV o marca mi número de móvil con un solo click desde la [página principal](/).

* Es mi rincón personal en la web. ¿A caso eso no mola?

* Por último y no menos importante: porque es divertido, aprendo y me resulta mucho más interesante que estar metido en Instagram.

<br>
<div class="text-muted">Última modificación: 10/07/2020</div>