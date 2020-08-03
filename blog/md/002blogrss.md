<!--name:Adding an RSS feed to this blog-->
<!--pubdate:2020/08/05-->
<!--moddate:2020/08/05-->
<!--icon:rss-->

## What is RSS and why I use it

Since I decided to leave Instagram and other social media sites, I started searching for other ways to keep me informed. This is how I have discovered [RSS](https://en.wikipedia.org/wiki/RSS). 

An RSS is basically a web feed that allows users to get updates from a specific website (in case it offers one). For example, one can find this RSS feeds in newspaper websites like [El País](https://servicios.elpais.com/rss/). This RSS feed are added to an RSS aggregator, which basically aggregates multiple feeds in one location for easy viewing. 

In my home server, as I explain [here](https://marcalv.com/blog/000thiswebsite), I have a FreshRSS instance running. It's a self-hostable feed aggregator that syncs with my phone and laptop. Among others, I have the following feeds added that may result you interesting or inspiring:

* Linux distributions news: As a linux user, I like to keep updated with the latest news of the distribution that I use (currently [EndeavourOS](https://endeavouros.com/feed/)).
* Technology related blogs:  [MuyLinux](https://www.muylinux.com/feed/), [CodingFacts](https://codingfactsblog.wordpress.com/feed/)...
* Local news: [324.cat](https://api.ccma.cat/noticies?_format=rss&origen=frontal&frontal=n324-portada-noticia&version=2.0), [ABC](https://www.abc.es/rss/feeds/abcPortada.xml), [Ara.cat](https://www.ara.cat/rss/latest/), [The Spain Report](https://www.thespainreport.es/es/rss)...
* YouTube: I'm subscribed to divulgation channels like [Vsauce](https://invidio.us/feed/channel/UC6nSFpj9HTCZ5t-N3Rm3-HA), [ElectroBOOM](https://invidio.us/feed/channel/UCJ0-OtVpF0wOKEqT2Z1HEtA) or [Adam Neely](https://invidio.us/feed/channel/UCnkp4xDOwqqJD7sSM3xdUiQ) through [Invidio.us](https://invidio.us).
* Twitter: I'm a huge fan of Extremoduro and I like to keep updated with their latest news. Sadly, their website does not offer an rss feed so I'm using [Nitter](https://nitter.net) to get an [rss feed](https://nitter.net/Oficina_Extremo/rss) from their twitter timeline. 
* Instagram: my local gym posts all news on Instagram, so I'm using [BridgeRSS](https://github.com/RSS-Bridge/rss-bridge). This service generates an RSS feed for a given user. I have my own instance hosted on Heroku. It is as easy as creating an Heroku account and using a [single button click](https://github.com/RSS-Bridge/rss-bridge#deploy) to deploy your own instance. 

Overall, I believe this is a much efficient and less distracting way of keeping up to date than rather visiting all this services one by one. This is what I want and this is what I get. No more, no less.

## Adding RSS to this blog

Add this functionality has been really easy since it is just and extension of the [blog automation script](https://marcalv.com/blog/001blogautomation).

An RSS feed is an XML file that contains different fields, in this case: the blog entry itself, title and date mainly. Just like I generate an HTML index with the markdown files, now I create an `.xml` file containing all the previous information. When a new entry is created, the script regenerates the XML file that now will contain one new item. Your feed aggregator will detect it and notify you. 

This XML file can be found [here](https://marcalv.com/blog/rss.xml). That link is also the url that you can add to your feed aggregator. If you want to take a look at the script that generates the feed and all the HTML files, it's [here](https://github.com/marcalv/mywebpage/blob/master/blog/convert.sh).