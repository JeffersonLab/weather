# weather [![CI](https://github.com/JeffersonLab/weather/actions/workflows/ci.yml/badge.svg)](https://github.com/JeffersonLab/weather/actions/workflows/ci.yml)
A [Java EE 8](https://en.wikipedia.org/wiki/Jakarta_EE) web application for displaying Jefferson Lab weather for use in [Presenter](https://github.com/JeffersonLab/presenter).

![Screenshot](https://github.com/JeffersonLab/weather/raw/main/Screenshot.png?raw=true "Screenshot")

---
- [Install](https://github.com/JeffersonLab/weather#install)
- [Configure](https://github.com/JeffersonLab/weather#configure)
- [Build](https://github.com/JeffersonLab/weather#build)
- [Develop](https://github.com/JeffersonLab/weather#develop)
- [Release](https://github.com/JeffersonLab/weather#release)
- [Deploy](https://github.com/JeffersonLab/weather#deploy) 
---

## Install
This application requires a Java 11+ JVM and standard library to run, plus a Java EE 8+ application server (developed with Wildfly).

1. Download [Wildfly 26.1.3](https://www.wildfly.org/downloads/)
2. [Configure](https://github.com/JeffersonLab/weather#configure) Wildfly and start it
3. Download [weather.war](https://github.com/JeffersonLab/weather/releases) and deploy it to Wildfly
4. Navigate your web browser to [localhost:8080/weather](http://localhost:8080/weather)

## Configure

### Runtime
Set the environment variable `ACCUWEATHER_API_KEY`.  See: https://developer.accuweather.com

## Build
This project is built with [Java 17](https://adoptium.net/) (compiled to Java 11 bytecode), and uses the [Gradle 7](https://gradle.org/) build tool to automatically download dependencies and build the project from source:

```
git clone https://github.com/JeffersonLab/weather
cd weather
gradlew build
```
**Note**: If you do not already have Gradle installed, it will be installed automatically by the wrapper script included in the source

**Note for JLab On-Site Users**: Jefferson Lab has an intercepting [proxy](https://gist.github.com/slominskir/92c25a033db93a90184a5994e71d0b78)

## Release
1. Bump the date and version number in build.gradle and commit and push to GitHub (using [Semantic Versioning](https://semver.org/)).
2. Create a new release on the GitHub Releases page corresponding to the same version in the build.gradle.   The release should enumerate changes and link issues.   A war artifact can be attached to the release to facilitate easy install by users.

## Deploy
At JLab this app is found at [ace.jlab.org/weather](https://ace.jlab.org/weather) and internally at [acctest.acc.jlab.org/weather](https://acctest.acc.jlab.org/weather).  However, those servers are proxies for `wildfly6.acc.jlab.org` and `wildflytest6.acc.jlab.org` respectively.   A [deploy script](https://github.com/JeffersonLab/wildfly/blob/main/scripts/deploy.sh) is provided to automate wget and deploy.  Example:

```
/root/setup/deploy.sh weather v1.2.3
```

**JLab Internal Docs**:  [InstallGuideWildflyRHEL9](https://accwiki.acc.jlab.org/do/view/SysAdmin/InstallGuideWildflyRHEL9)
