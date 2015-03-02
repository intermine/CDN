#InterMine Content Delivery Network

This repository hosts web libraries used in the [InterMine](http://intermine.org) ecosystem.

##Host your own

The main repo is hosted by [GitHub](https://status.github.com/), but sometimes
it goes down. Before that happens, we encourage you to host your own copy. Your
apps will potentially work faster, depending on your location, and you will be
fully in control.

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

## Making Use of Concatenation

If you want you can make use of the CGI script in the `cgi` directory to
optimise requrests to the CDN. Doing so requires a web-server which supports CGI
scripts. This is simple enough for Apache, for which a suitable configuration
stanza is presented below:

```apache
Alias /cdn /path/to/clone/of/CDN
<Directory /path/to/clone/of/CDN>
	Options Indexes FollowSymLinks
    Require all granted
    AllowOverride FileInfo Options=ExecCGI
</Directory>
```

This is also possible with nginx with a bit more work and research.

When this feature is enabled requests can be made of the form
`http://cdn.myserver.com/cgi/concat.rb?js=X&js=Y` which will return the two JavaScript
files concatenated together. These requests will be served with long expiries,
which can be disabled by supplying the `dev` parameter. The InterMine web-app
will automatically produce these optimised requests if the following
configuration parameter is provided:

```properties
head.cdn.cgi-enabled = true
```

