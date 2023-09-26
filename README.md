### WebExtensions Firefox addons. JavaScript
# DrozdTools

 This addon's purpose:
+ **archiving quotes from webpages with date and url in text format by appending an archive file**
+ **saving whole or parts of articles as html files with dates and urls**
+ User JS, CSS Style, custom scripts, etc...

**Saving selection as an html file** is done by the extension itself.

**Saving and appending text to an archive file** requires an external program and "Native Messaging".



## How to install external program.

**In short**: Download the `DrozdTools_app_compiled.zip` and place the unzipped files in `C:\Programs\Drozd_addon_Firefox\` folder (must be created by user manually). Then double-click `Drozd_addon NativeMessagingHosts_compiled.reg` and confirm. This should be enough.

More in details:

**The easier option is to use a compiled script (executable)**, it causes fewer potential problems.
The file `DrozdTools_app_compiled.zip` contains three files: `Drozd_addon_manifest_compiled.json`, `Drozd_addon NativeMessagingHosts_compiled.reg` and `Drozd_addonPython.exe`. They should be placed in `C:\Programs\Drozd_addon_Firefox\` folder (must be created by user manually).
Double-click the "Drozd_addon NativeMessagingHosts_compiled.reg" and confirm. Restart Firefox and open popup window to check if the icon in the top-left corner is green.

**Using the DrozdTools with a Python script**

 ● Install Python 3 programing language. During install choose the option "Add Python to PATH".

 ● Make the registry change (added keys are `HKEY_LOCAL_MACHINE\SOFTWARE\Mozilla\NativeMessagingHosts\Drozd_addon`, `HKEY_CURRENT_USER\Software\Mozilla\NativeMessagingHosts\Drozd_addon`) by double-clicking the `Drozd_addon NativeMessagingHosts.reg` and confirming ("Yes"). These registry keys redirect messages from Firefox to the `Drozd_addon_manifest.json`, which in turn redirects to external program (Python script or compiled exe file)

Files: `Drozd_addon_manifest.json`, `Drozd_addon.bat` and `Drozd_addonPython.py` must be placed in `C:\Programs\Drozd_addon_Firefox\` folder, which must be created by user manually. If one wants a different location of the folder and different file names, paths in those files must by changed accordingly.
To check if the extension is connected to the external program, open its popup window. If it's connected, the circle in the top-left corner of the popup is green. On connection error it turns red. Click the button to check for connection again, although browser restart is necessary after changes are made.






>[!NOTE]
  This extension has been created for personal use, it includes various features packed in one.    
  Though, Mozilla requires all add-ons to be signed (one cannot install unsigned add-ons). I cannot use my own add-on on Firefox without submitting it for verification. 
  Since I'm forced to send it for verification, I can as well clean up the code and post it on [addons.mozilla.org (AMO)](https://addons.mozilla.org/). It might be of use to someone. 
  Saving news articles or archiving quotes with dates and urls may be of use for sports journalists for instance.
  The features are adapted from my old extensions **PaleMoon** (XUL Firefox) and **Opera 12**. Like saving selected text as html and archiving selected text by appending it to an archive file.
