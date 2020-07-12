<!--name:About this website-->
<!--pubdate:09/07/2020-->
<!--moddate:10/07/2020-->
<!--icon:web-->

### Where is marcalv.com?

When you enter the address marcalv.com you are connecting directly to the [Raspberry Pi 3 B+](https://www.raspberrypi.org/products/raspberry-pi-3-model-b-plus/) that I have at home.All the files needed to make the website work are on it.

The domain [marcalv.com](https://marcalv.com) is rented with [Namecheap](https://www.namecheap.com) por 8 euros al año. for 8 euros per year. Besides, this service includes the redirection of the traffic to my home's public IP. 

### How is it built?


[Here you have the repository with all the source code](https://github.com/marcalv/mywebpage).It's mostly HTML and CSS written line by line, and in some parts javascript when needed. And if you know it, you may have noticed... [Bootstrap](https://getbootstrap.com/) Icons are from [Icons8](https://icons8.com/).

All files are served through [NGINX](https://www.nginx.com/), which runs in a wonderful [docker container](https://github.com/linuxserver/docker-letsencrypt) that is used as a reverse proxy with other private access services that are also runinng on the Raspberry: ([Nextcloud](https://nextcloud.com/), [Pi-hole](https://pi-hole.net/), [freshRSS](https://freshrss.org/), [qBittorrent](https://github.com/linuxserver/docker-qbittorrent), [Jackett](https://github.com/Jackett/Jackett)...).


### Why?

Here below I try to justify the existence of this site:

* Group together everything I do related to music and programming in general. Publish in my own website gives me total control and freedom over the content, aesthetics and behaviour.

* It's a way to *force me* to document all the projects I develop, and more importantly, **finish** them.

* Here you can find my contact details and other personal information: download the latest version of my CV or dial my mobile number with a single click from the [home page](/).

* This is my little personal place on the web, isn't it that cool?

* Last but not least: because it's fun, I learn a lot and I find it much more interesting than wasting my time on Instagram.

