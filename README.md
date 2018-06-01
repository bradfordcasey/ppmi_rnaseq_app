# PPMI RNA-Seq App

**Phase 1 RC2 Study Version 0.5.0532918a**

## About

This is RC1a functionality beta version of RNA Portal expanded to include Phase 1 of the PPMI RNA-seq study. Development is conducted in a sandbox environment, and the current version is stable but under testing. 

The portal design is a (1) public **single page HTML** file that can be public and (2) an node.js **RESTful JSON API**.  The JSON API is implemented via node.js as below, and whereby any security layers should be made.  

**Single Page HTML** The single page HTML is "rna.html".  The **header** can be removed, and it can be made headerless be removing everything between the body tags for fitting within a webpage. The location of the API can be specified in this header by changing the `global_api` variable, e.g. `var global_api='http://www.ppmi.io/api/gene';`. For testing, the default API allows cross-site quering but normally would be replaced with the location of the RESTful JSON API below.

 **RESTful JSON API**  The RESTful JSON API contains all the gene and transcript level contact and essentially done as a single find on "gene" or "transcript".  For the initial version, no security layers have been added, but different versions with various security implementations are available, such as via OAUTH2, AUTH0, and JWT JSON tokens.  Please contact for anyone of these implementations.  

* A running version of the PPMI RNA-Seq App is available at http://www.ppmi.io/rna.html

* A running version of the API is at http://www.ppmi.io/api and an example query of gene LRRK2 is http://www.ppmi.io/api/gene/LRRK2


### Prerequisites

1.  Node.js + Yarn (https://nodejs.org/en/download/).
    * Node.js is needed to install.  We recommend using Yarn to install, though npm can be used, such as through yarn: `sudo yum install yarn` or `brew install yum` on MacOs.

2.  MongoDB (https://www.mongodb.com/download-center#community).


## Installation

### First, Install HTML

The file `rna.html` can be installed anywhere that the API cross-domain security allows (typically the same URL) for a unit test.  Upon that, the location of the URL defaults to `var global_api='http://www.ppmi.io/api/gene';` and this can be changed such as `var global_api='/api/gene';` by editing the HTML variable. 

Note: The header can be removed, though we recommend for testing to at least do one unit test with the header intact.  We have validated that the headerless version can be installed by pasting into Wordpress "Text" as a new page, but that using Raw HTML plugin is needed as Wordpress changes some characters.  For this, one would copy evertyhing within the "body" tags.

### Second, Install API

In the following directions, the API would be served at port 3000.  

1.  Download code and cd to directory.

`git clone https://github.com/davcraig75/ppmi_rnaseq_app.git`

`cd ppmi_rnaseq_app`

2.  Install yarn dependencies

`yarn install`

3.  Download databases

`yarn download # Runs mkdir -p mongodb logs db && curl -o mongodb/gene_info.bson http://www.ppmi.io/gene_info.bson && curl -o mongodb/gene_info.metadata.json http://www.ppmi.io/gene_info.metadata.json `

4.  Build databases in MongoDB with MongoDB on port 27017 with mongorestore

`yarn build # Runs mkdir -p mongodb logs db && curl -o mongodb/gene_info.bson http://www.ppmi.io/gene_info.bson && curl -o mongodb/gene_info.metadata.json http://www.ppmi.io/gene_info.metadata.json`

5.  Run Mongodb 

`yarn mongodb # Runs mkdir -p logs db && mongod --port 27017 --dbpath db --logpath logs/mongodb.log --fork`

6.  Start server

`yarn start`

For production runs, PM2 is recommended.  The firewall routing can be determined by the end-user though NGINX and Apache have been used in sandbox.  Current deployment is *node.js* webserver at port 3000 with *nginx* firewall, routing through to port 80, and *Mongo* deamon at localhost 27017. 

## Browser Support

All major vendor supported browsers are supported.  Testing was conducted on Windows XP, 7, 8, 9, 10; Apple iOS 6+; Apple Lion, Sierra, High Sierra, Android, Windows Phone, and Centos.  Chrome, Opera, Safari, Edge, IE11, and Firefox were all evaluated across multiple versions. 

* Chrome 31+
* Firefox 31+
* Opera 24+
* Safari 5.1+
* IE/Edge 11+ (*IE9,IE10*)
* Yandex 14.12

** IE9 and IE10 have been tested and do function.  However, as of January 12, 2016 Microsoft is no longer supporting these and security issues are such that their use is a violation of HIPAA Security Rule.


## Embedded Dependencies

These dependencies are embedded in the single page HTML.  Please request for a version, built without these pre-embedded (for example if they are called by the header).

* Vega.js  
* Jquery.js jQuery v3.2.1 
* Skeleton CSS
* lz-string.js  
* easy-autocomplete.js http://github.com/pawelczak
* Datatables https://datatables.net

## Version

**Phase 1 RC2 Study Version 0.5.0532918a**

## License

See MJFF

![Itg logo](http://dtg.usc.edu/images/itg.png)


