# FzUnobfuscate

This is a *Node.js* project that allows you to de-obfuscate passwords from earlier versions of FileZilla (ie versions 1 and 2).

These versions should have a `FileZilla.xml` configuration page either in the installation folder (e.g. `%ProgramFiles%\FileZilla\`) or in the user's application data folder (possibly `%Appdata%\FileZilla\`).

If you find an xml structure like the following, you are in.
```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<FileZilla>
<Settings>
…
</Settings>
<RecentServers>
<Server Host="host.tdl" Port="21" User="username" Pass="001023014134245013" Account="" FirewallBypass="0" DontRememberPass="0" ServerType="4096" Path="" PasvMode="0" UTF8="0" TimeZoneOffset="0"/>
<Server Host="host2.tdl" Port="21" User="anotherusername" Pass="003027013134245013" Account="" FirewallBypass="0" DontRememberPass="0" ServerType="4096" Path="" PasvMode="0" UTF8="0" TimeZoneOffset="0"/>
…
</RecentServers>
<Sites>
<Site Name="" Host="yetanotherhost.tdl" Port="21" User="myusername" Account="" RemoteDir="" LocalDir="" Pass="003023036047021" Logontype="1" FWBypass="0" DontSavePass="0" ServerType="0" PasvMode="0" TimeZoneOffset="0" TimeZoneOffsetMinutes="0" Comments="" UTF8="0" DefaultSite="0"/>
<Site Name="" Host="yetevenanotherhost.tdl" Port="21" User="mysecretusername" Account="" RemoteDir="" LocalDir="" Pass="007053034096071" Logontype="1" FWBypass="0" DontSavePass="0" ServerType="0" PasvMode="0" TimeZoneOffset="0" TimeZoneOffsetMinutes="0" Comments="" UTF8="0" DefaultSite="0"/>
…
</Sites>
<TransferQueue/>
</FileZilla>
```

The passwords are converted from the data in the `Pass` attribute using a simple `xor`-approach.

## Usage

You need to have a working installation of *Node.js* and its package manager *npm*.

1. Clone from repository: `git clone …`
2. From the project directory use the `npm` package manager to load the necessary dependencies: `npm install`
3. Run the program: `node fzunobfuscate.js path/to/FileZilla.xml`


## License

Copyright (C) 2014 XA.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.