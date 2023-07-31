# Monopoly Server Setup Guide
Welcome to the Monopoly server setup guide! This document will walk you through the steps required to set up your Monopoly server. The server files are located in the root/server-build directory. At the end of this paragraph, we'll discuss the importance of the server.properties.json file, which is generated during the setup process.

# Step 1: Setting Up the Server
1. Clone or download the Monopoly server files from the provided repository.
2. Navigate to the root/server-build directory to find the server files.

**later on a github realse will be deployed with client and servers files.**

## Configuration Options
### server.properties.json
Upon setting up the Monopoly server, a server.properties.json file will be generated. This file contains important configurations for the server, such as the server's port, game settings, and more. Make sure to review and modify this file according to your preferences before starting the server.

```js
interface ServerProperties {
    port: number;
    maxPlayers: number;
    cors: Array<string>;
    redirect: boolean;
    redirectURL?: string;
    logDebug: boolean;
    useUPNP?:boolean;
}

const defaultProperties: ServerProperties = {
    port: 25565,
    maxPlayers: 6,
    cors: ["https://coder-1t45.github.io", "http://localhost:5173"],
    redirect: true,
    redirectURL:"https://coder-1t45.github.io/Monopoly",
    logDebug: false,
    useUPNP:true,
    upnpnDuration:3600
};

```

# Step 2: NAT Traversal Options
Monopoly server can be set up using either UPnP (Universal Plug and Play) or traditional port forwarding. Here's a brief explanation of each:
1. UPnP (Universal Plug and Play): UPnP is a networking protocol that allows devices in a local network to automatically discover and communicate with each other. When activated, UPnP can dynamically handle the necessary port mappings to enable external clients to connect to the server without manual port forwarding. Note that UPnP can run for a duration of time and might be restricted on some networks.
2. Port Forwarding: Port forwarding is a manual configuration where you set up your router to forward specific external ports to the internal IP address of your Monopoly server. This requires some effort from the user, as they need to access their router's settings and set up the port forwarding rules.

Please choose the option that best suits your network setup and security preferences.

# Step 3: HTTPS and Certificate Generation
Monopoly server uses HTTPS for the main site to ensure secure communication. To set up HTTPS, you'll need to generate a self-signed certificate. Follow these steps:
1. Download OpenSSL: If you haven't already, download OpenSSL and ensure it's added to your system's PATH variable.
2. Run generatekeys.bat: Execute the generatekeys.bat script to create a self-signed SSL certificate for your server.
With these steps completed, your Monopoly server should be up and running, ready for players to join and enjoy the game!

If you have any questions or encounter any issues during the setup process, feel free to reach out for assistance. Happy gaming!