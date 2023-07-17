# [NoJank](https://nojank.com)


To provide maximum flexibility and ease of use, NoJank is configurable at both the server and user level.

To provide full control over availability and source transparency, you would create your own mirror.

At the server level, there is a default [Redis](https://redis.io) cache, 
as you can see in [njsb.service](https://github.com/nojank0/site/blob/main/server/sb/njsb.service), njsb.conf is defined as the environment variable file at production runtime.

Linux (and mac) developers may, and should, deploy the file on their workstation in the same way, 
but Windows developers will need to define them as environment variables either at the system level or
as launch parameters, for example after the active spring profile definition as shown here:

    -Dspring.profiles.active=dev

Follow these steps to create a mirror of [nojank.com](https://nojank.com).


Your Redis configuration variables will be overridden in production by values you define in:



    /etc/nojank/njsb.conf


where you would assign these values:


    NJRUSR=prodRedisUser
    NJRHOS=prodRedisHost
    NJRPWD=prodRedisPassword



[Reference](https://cwiki.apache.org/confluence/display/TOMCAT/Password)


Edit $USER/.profile and add


    export NJRCU=
    export NJRCP=


where


* NJRCU is the default Redis cache user name.
* NJRCP is the default Redis cache [password](https://cwiki.apache.org/confluence/display/TOMCAT/Password).




# Setup

You may skip onetime.sh if Angular is already installed:

    git config --global user.name "Your Name"
    git config --global user.email your.email
    git config --list
    chmod +x *.sh
    ./onetime.sh
    ./setup.sh


Answer the material questions as follows:



    ? Choose a prebuilt theme name, or "custom" for a custom theme: Custom
    ? Set up global Angular Material typography styles? Yes
    ? Include the Angular animations module? Include and enable animations




# Build and run spring boot app.


    ./runsb.sh
     runsb.cmd



# Build and run angular app.


    ./runng.sh


# Deploy from Linux workstation


    ./buildsb.sh
    ./deploy.sh


# Deploy from Windows workstation


    buildsb.cmd
    ./deploy.sh


# Workstation Requirements

Please define these system environment variables on your workstation, so that the deployment script will work.


Append to the end of ~/.profile, something like this, make adjustments as needed:


    export NJDMN=default
    export NJHOS=nj
    export NJUSR=$USER
    export NJPWD=pwd



* NJDMN is your NoJank domain name.
* NJHOS is your NoJank server (aka host), as defined in your workstation ~/.ssh/config file.
* NJUSR is your NoJank server user.
* NJPWD is your NoJank server password.  Needed in deploy.sh, to reboot the server.



If your server user name is different than your workstation user name, 
you will need to replace $USER above with a hard coded value.

... also make sure your JAVA_HOME is set, something like this on linux mint systems:


    export JAVA_HOME=/usr/lib/jvm/temurin-17-jdk-amd64


... and on Windows systems you might need something like this:


    export PATH="$PATH:$HOME/Documents/apps/ng/node"


# Server requirements

Create a letsencrypt enabled nginx server named nj in your .ssh/config file.

These are some good guides:

* [letsencrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)
* [angular](https://www.digitalocean.com/community/tutorials/nginx-reverse-proxy-node-angular)

For the NG server, you'll need:


    apt install nodejs npm nginx


For the SB server you'll need:


    apt install openjdk-17-jre-headless default-jdk nginx


... and on each server:


    apt install net-tools nginx


If you are hosting both on one:


    apt install openjdk-17-jre-headless default-jdk nodejs npm net-tools nginx




Move the server files to your home directory on the server:


    scp -r server/sb/* $USER@nj:/home/$USER/
    ssh nj


On the server:


    sudo mkdir /etc/nojank
    sudo chown $USER /etc/nojank
    mv njsb.conf /etc/nojank/
    sudo mv njsb.service /etc/systemd/system/
    sudo systemctl enable njsb.service
    sudo reboot 0


<$USER> needs to be hard coded.

Wait a bit, then


    ssh nj
    sudo netstat -tulpn


Make sure you have some Java process listening on port 8080 (along with your already established ngnix on port 443).


If you don't, troubleshoot with this command:


    sudo journalctl --unit=nojank.service


Finally, in /etc/nginx/sites-available/nojank.com, replace your

    location / {
     try_files $uri $uri/ =404;
    }


[with](https://stackoverflow.com/questions/32107901)

    map ":$http_x_forwarded_for" $IP_ADDR {
      ":" $remote_addr;
      default $http_x_forwarded_for;
    }

    location /ip {
      default_type text/plain;
      return 200 "$IP_ADDR"
    }
    location /ipf {
      default_type text/plain;
      return 200 "$remote_addr"
    }
    location /ct {
      proxy_pass http://localhost:8080;
    }
    location / {
     try_files $uri $uri/ /index.html;
    }

... and reboot.

# Troubleshooting

From the server, to see Spring boot logs:

    sudo journalctl -u njsb.service

# Further reading

* [Design considerations.](./docs/design.md)
