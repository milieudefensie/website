# Setting up Directus

See `directus-schema.json`, `docker-compose.yml` and `.env.example` for examples of how to set up Directus as CMS for your campaign website.

## Self-hosting

In these instructions, we will explain how to self-host Directus on a Virtual Private Server (VPS).

### Costs

In total, this will cost you around $6/month, which includes the domain name and VPS costs. This will give you unlimited Directus users (for people who need access to your CMS/CRM).

This assumes your organisation has less than $5M in total annual income. If you have more income, you will need a self-hosting licence.

> If you do not know how to set up your own server, you can also use Directus Cloud. Then, Directus will manage the hosting for you. Pricing starts at $15 per month per user.

### 1. Get a domain name

**Get a domain name** from any provider, such as Cloudflare or TransIP. We will use this domain name to serve Directus. You can also use a subdomain if you already have a domain name. You can get a domain name from around $10/year.

### 2. Set the nameservers to Cloudflare

**Set the nameservers to Cloudflare** to enable Cloudflare's DNS and other services.

👉 https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/

### 3. Get a VPS

**Get a VPS** using a provider such as Hetzner or DigitalOcean. We will run Directus on this server. You can get a VPS starting at $5/month. You might need to scale up the server temporarily if you want to do some big imports or exports.

You can also try out the steps below on your local machine using a tool such as [OrbStack](https://docs.orbstack.dev/machines/).

If you do not have one yet, generate an SSH key, and use the public key when creating the VPS. You will be able to use this SSH key to securely connect to the server. Run this on your local device:

```bash
ssh-keygen -t ed25519 -C "name@example.com"
```

Save this public key in your GitHub account for easy access later:
👉 https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

If you do not remember if you have an SSH key, run this command to check:

```bash
ls -al ~/.ssh
```

### 4. Connect through SSH

From your local device, run this to **access your remote server using SSH**:

```bash
ssh root@IP -i "path/to/ssh-key"
```

### 5. Set up a non-root user

For everyone who needs to manage this server, **create a new user** with the username 'my-username' (replace with your username):

```bash
adduser my-username
```

**Add the user to the sudo group**. This allows the user to run commands as root, by adding 'sudo' before the command.

```bash
usermod -aG sudo my-username
```

#### Useful commands

To see users that are part of the sudo group, run:

```bash
cat /etc/group | grep "sudo"
```

Set a new strong password for the user, which will be required every time the user uses 'sudo':

```bash
passwd my-username
```

If you want to log in as the new user (if you are currently logged in as root), run:

```bash
su - my-username
```

If you want to return to root:

```bash
sudo su -
```

### 6. Set up SSH keys for the new user

**Create the user’s .ssh directory**:

```bash
mkdir /home/my-username/.ssh
```

**Copy the public key** from your GitHub profile:

```bash
curl https://github.com/<username>.keys > /home/my-username/.ssh/authorized_keys
```

**Set up the correct file permissions** for both the .ssh directory and the authorized_keys file:

```bash
# ensure the directory ir owned by the new user
chown -R username:username /home/username/.ssh

# make sure only the new user has permissions
chmod 700 /home/username/.ssh
chmod 600 /home/username/.ssh/authorized_keys
```

**Disable password login and disable root login**, by editing the SSH configuration file:

```bash
sudo nano /etc/ssh/sshd_config
```

Then change the following lines, then save and exit the file.

```bash
PermitRootLogin no
PasswordAuthentication no
```

**Restart the SSH service**:

```bash
sudo systemctl restart ssh
```

Now try to SSH into your new user in a new terminal window, while keeping the previous one open so that you can fix any mistakes if necessary.

### 6. Create Docker folder

Create a new folder for your Docker containers. This is where you will store the Docker Compose files and other configuration files.

```bash
mkdir -p /opt/docker-projects
```

Create a new user group that has access to this folder:

```bash
sudo groupadd docker-projects
```

Give the new user group ownership of the folder:

```bash
sudo chown -R :docker-projects /opt/docker-projects
sudo chmod -R 2770 /opt/docker-projects
```

Add the new user to the group:

```bash
sudo usermod -aG docker-projects my-username
```

Make sure to log out and back in for the changes to take effect.

### 6. Install Docker

We'll use Docker to install Directus in a container (and possibly other tools too). You can do this using the VPS provider's web console. We'll set up SSH using Cloudflare later.

Install Docker using the apt repository:

👉 https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

Then add your current user to the docker group, to allow running Docker commands without sudo:

```bash
sudo usermod -aG docker $USER
```

Make sure to reboot the server for the changes to take effect.

### 7. Setup a Cloudflare Tunnel

Install using the Docker instructions:

👉 https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/

### 8. Set up Cloudflare SSH with Access for Infrastructure

With 'Cloudflare SSH with Access for Infrastructure', you can connect to your server using SSH by installing Warp on your local device and connecting to the server using Cloudflare's network. This way, there is no need for managing SSH keys or passwords.

👉 https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-infrastructure-access/

Make sure to add the -d flag to the command to run it in the background, and the --restart unless-stopped flag to automatically restart the container if it stops:

```bash
docker run -d --restart unless-stopped --name cloudflared cloudflare/cloudflared:latest tunnel --no-autoupdate run --token XYZ
```

### 4. Setup a Firewall

Allow only Cloudflare's IP addresses to enable Cloudflare Tunnel. This way, the only way to connect to your server is through Cloudflare's network, even if attackers know your server's IP address.

👉 https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/tunnel-with-firewall/

You can use the firewall settings of your VPS provider, or use [UFW in Ubuntu](https://community.hetzner.com/tutorials/howto-initial-setup-ubuntu#step-6---setting-up-a-firewall).

> Using the firewall settings of your VPS provider is recommended, as it blocks traffic before it even reaches your server (which is useful in case of a DDoS attack).

Check all open listening for traffic:

```bash
sudo ss -lntup
```

### 9. Set up remote development using SSH in VS Code

This allows you to edit files on the server using VS Code on your local machine.

https://code.visualstudio.com/docs/remote/ssh

> For this to work, the server needs to download the VS Code server. This is a one-time setup, and it will be downloaded to the server.

### 10. Setup automatic Ubuntu & Docker updates

Set up [automatic linux updates](https://www.starline.de/en/magazine/technical-articles/enabling-automatic-security-updates-on-linux).

First, **apply any nessesary updates**:

```bash
sudo apt update && sudo apt upgrade
```

**Install unattended-upgrades**:

```bash
sudo apt-get install unattended-upgrades
```

**Set up automatic updates for Ubuntu**:

```bash
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

Set up automatic Docker container image updates using Watchtower. **Install [Watchtower](https://containrrr.dev/watchtower/)**, and schedule it to run every day at 2 AM:

```bash
docker run \
--detach \
--restart unless-stopped \
--name watchtower \
--volume /var/run/docker.sock:/var/run/docker.sock \
containrrr/watchtower \
--cleanup \
--schedule "0 0 2 * * *"
```

> Note: Automatically installing updates comes with risk of downtime. This setup is ok if you are ok with some downtime and want to do zero maintenance.

# 11. Use Docker Compose to run Directus

**Create a new folder** for your Directus project:

```bash
mkdir -p /opt/docker-projects/directus-production
```

**Copy the `docker-compose.yml` and `stack.env.example` files** to the `/opt/docker-projects` folder. Rename `stack.env.example` to `.env`.

```bash
curl -o /opt/docker-projects/directus-production/docker-compose.yml https://raw.githubusercontent.com/milieudefensie/website/refs/heads/main/directus/docker-compose.yaml
curl -o /opt/docker-projects/directus-production/.env https://raw.githubusercontent.com/milieudefensie/website/refs/heads/main/directus/.env.example
```

Make sure to change the environment variables, especially the secret and passwords! You can use the following command to **generate random passwords**:

```bash
openssl rand -hex 32
```

**Edit the `.env` file** in a text editor:

```bash
nano /opt/docker-projects/directus-production/.env
```

**Navigate to the Directus project folder**:

```bash
cd /opt/docker-projects/directus-production
```

**Start the containers** using Docker Compose:

```bash
docker-compose up
```

### 12. Create a Cloudflare Tunnel Application

Configure your Tunnel to expose the Directus application:

**Step 1:**

Navigate to: Cloudflare Dashboard > Zero Trust > Networks > Tunnels > Select your tunnel > Edit > Public Hostname > Add a Public Hostname

- Subdomain: directus
- Domain: my-domain.com
- Path: leave empty
- Service: http://directus:8055

**Step 2:**

Navigate to: Cloudflare Dashboard > Zero Trust > Applications > Add an Application

- Subdomain: directus
- Domain: my-domain.com
- Path: leave empty
- Policy: set your own policy.
- Login methods: set your own login methods.

**Step 3:**

Add the 'frontend' network to the cloudflared container using this command:

```bash
docker network connect network-name cloudflared
```

You can find the network name by running this command:

```bash
docker network ls
```

Documentation: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/#2a-connect-an-application
