# Setting up Directus

See `directus-schema.json`, `docker-compose.yml` and `.env.example` for examples of how to set up Directus as CMS for your campaign website.

## Self-hosting

### 1. Get a domain name

Get a domain name from any provider, such as Cloudflare or TransIP. We will use this domain name to serve Directus. You can also use a subdomain if you already have a domain name. You can get a domain name from around $10/year.

### 2. Set the nameservers to Cloudflare

Set the nameservers to Cloudflare to enable Cloudflare's DNS and other services.

https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/

### 3. Get a VPS

Get a Virtual Private Server (VPS) using a provider such as Hetzner or DigitalOcean. We will run Directus on this server. You can get a VPS starting at $5/month. You might need to scale up the server temporarily if you want to do some big imports or exports.

You can also try out the steps below on your local machine using a tool such as [OrbStack](https://docs.orbstack.dev/machines/).

### 4. Setup a Firewall

Allow only Cloudflare's IP addresses to enable Cloudflare Tunnel. This way, the only way to connect to your server is through Cloudflare's network, even if attackers know your server's IP address.

https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-with-firewall/

You can use the firewall settings of your VPS provider, or use [UFW in Ubuntu](https://community.hetzner.com/tutorials/howto-initial-setup-ubuntu#step-6---setting-up-a-firewall).

> Using the firewall settings of your VPS provider is recommended, as it blocks traffic before it even reaches your server (which is useful in case of a DDoS attack).

Check all open listening for traffic:

```bash
sudo ss -lntup
```

### 5. Set up a non-root user

For everyone who needs to manage this server, create a new user with the username 'my-username' (replace with your username):

```bash
adduser my-username
```

Add the user to the sudo group. This allows the user to run commands as root, by adding 'sudo' before the command.

```bash
usermod -aG sudo my-username
```

To see users that are part of the sudo group, run:

```bash
cat /etc/group | grep "sudo"
```

Set a new strong password for the user, which will be required every time the user uses 'sudo':

```bash
passwd my-username
```

Disable password login and disable root login, by editing the SSH configuration file:

```bash
sudo nano /etc/ssh/sshd_config
```

Then change the following lines:

```bash
PermitRootLogin no
PasswordAuthentication no
```

Save and exit the file using `:wq`, then restart the SSH service:

```bash
sudo systemctl restart sshd
```

If you want to log in as the new user (if you are currently logged in as root), run:

```bash
su - my-username
```

If you want to return to root:

```bash
sudo su -
```

### 6. Install Docker

We'll use Docker to install Directus in a container (and possibly other tools too). You can do this using the VPS provider's web console. We'll set up SSH using Cloudflare later.

Install Docker using the apt repository: https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

Then add your current user to the docker group, to allow running Docker commands without sudo:

```bash
sudo usermod -aG docker $USER
```

### 7. Setup a Cloudflare Tunnel

Install using the Docker instructions:

https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/

### 8. Set up Cloudflare SSH with Access for Infrastructure

With 'Cloudflare SSH with Access for Infrastructure', you can connect to your server using SSH by installing Warp on your local device and connecting to the server using Cloudflare's network. This way, there is no need for managing SSH keys or passwords.

https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/

### 9. Set up remote development using SSH in VS Code

This allows you to edit files on the server using VS Code on your local machine.

https://code.visualstudio.com/docs/remote/ssh

### 10. Setup automatic Ubuntu & Docker updates

Set up [automatic linux updates](https://www.starline.de/en/magazine/technical-articles/enabling-automatic-security-updates-on-linux).

First, apply any nessesary updates:

```bash
sudo apt update && sudo apt upgrade
```

Install unattended-upgrades:

```bash
sudo apt-get install unattended-upgrades
```

Set up automatic updates for Ubuntu:

```bash
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Set up [automatic Docker container image updates](https://www.digitalocean.com/community/tutorials/how-to-automatically-update-docker-container-images-with-watchtower-on-ubuntu-22-04) using Watchtower.

Install [Watchtower](https://containrrr.dev/watchtower/), and schedule it to run every day at 2 AM:

```bash
sudo docker run -d \
--name watchtower \
-v /var/run/docker.sock:/var/run/docker.sock \
containrrr/watchtower \
--cleanup \
--schedule "0 0 2 * * *"
```
