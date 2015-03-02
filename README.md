#InterMine Content Delivery Network

This repository hosts web libraries used in the [InterMine](http://intermine.org) ecosystem.

##Host your own

The main repo is hosted by [GitHub](https://status.github.com/), but sometimes it goes down. Before that happens, we encourage you to host your own copy. Your apps will potentially work faster, depending on your location, and you will be fully in control.

Follow these steps:

1. Make a fork of the following repo:
   [git@github.com:intermine/CDN.git](git@github.com:intermine/CDN.git).
1. Serve the repo using a static web server, such as
   [Apache](http://httpd.apache.org/) or [nginx](http://nginx.org/en/).  Point
   your InterMine web-application at your local CDN installation by editing the
   `global.web.properties` file on the line where it says `head.cdn.location`:

```properties
head.cdn.location = http://cdn.myserver.com
```

You web-server must support CGI scripts. A suitable configuration stanza for
Apache is presented below.

```apache
Alias /cdn /path/to/clone/of/CDN
<Directory /path/to/clone/of/CDN>
	Options Indexes FollowSymLinks
    Require all granted
    AllowOverride FileInfo Options=ExecCGI
</Directory>
```

