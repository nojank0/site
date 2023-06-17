# [NoJank](https://nojank.com)


While you can configure nojank.com to use your own [Redis](https://redis.io) cache, to provide full control over availability and source transparency, you would create your own mirror.


Follow these steps to create a mirror of [nojank.com](https://nojank.com).


# Setup


    chmod +x *.sh
    ./setup.sh


Answer the material questions as follows:



    ? Choose a prebuilt theme name, or "custom" for a custom theme: Custom
    ? Set up global Angular Material typography styles? Yes
    ? Include the Angular animations module? Include and enable animations




# Build and run spring boot app.


    ./runsb.sh



# Build and run angular app.


    ./runng.sh


# Deploy



    ./deploy.sh


# Workstation Requirements

Please define these system environment variables on your workstation, so that the deployment script will work.

Make adjustments for your workstation, this was done on a Linux Mint system.

Append to the end of ~/.profile:
    

    export NJNGH=nj
    export NJNGU=$USER
    export NJSBD=
    export NJSBH=nj
    export NJSBU=$USER
    export NJSBD=
    #Include the following on the springboot server, as well as your workstation:
    export NJRHOST=
    export NJRUSR=
    export NJRPWD=

* NJNGH is your Nojank Angular server (aka host), as defined in your workstation ~/.ssh/config file.
* NJNGU is your Nojank Angular server user.
* NJSBH is your Nojank Spring Boot server, as defined in ~/.ssh/config.
* NJSBU is your Nojank Spring Boot server user.
* NJSBD is the domain name. If not on server blocks, leave it blank.
* NJRHOST is the default Redis host URL.
* NJRUSR is the default Redis user id.
* NJRPWD is the default Redis password.

NJNGH and NJSBH can be the same servers, as shown in the above example.



If your server user names are different than your workstation user name, you will need to replace $USER above with
hard coded values.

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


with


    location / {
     try_files $uri $uri/ /index.html;
    }
    location /s {
     proxy_pass http://127.0.0.1:8080;
    }

... and reboot.


Edit $USER/.profile and add


    export NJRCU=
    export NJRCP=


where


* NJRCU is the default Redis cache user name.
* NJRCP is the default Redis cache [password](https://cwiki.apache.org/confluence/display/TOMCAT/Password).


# Troubleshooting

From the server, to see Spring boot logs:

    sudo journalctl -u njsb.service

# Further reading

* [Design considerations.](./docs/design.md)
