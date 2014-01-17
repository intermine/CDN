#InterMine Content Delivery Network

This repository hosts web libraries used in the [InterMine](http://intermine.org) ecosystem.

##Host your own

The main repo is hosted by [GitHub](https://status.github.com/), but sometimes it goes down. Before that happens, we encourage you to host your own copy. Your apps will potentially work faster, depending on your location, and you will be fully in control.

Follow these steps:

1. Make a fork of the following repo: [git@github.com:intermine/CDN.git](git@github.com:intermine/CDN.git).
1. Serve the repo using a static web server, such as [nginx](http://nginx.org/en/).
Point to your CDN by, for example, editing the `global.web.properties` file on the line where it says `head.cdn.location`.