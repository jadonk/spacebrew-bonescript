Spacebrew BoneScript
--------------------
A simple collection of demos on using Spacebrew with BoneScript and BeagleBone.

I renamed sb-1.3.0.js from https://raw.github.com/Spacebrew/spacebrew.js/master/spacebrew_custom/js/sb-1.3.0.js and changed one line to deal with the fact window is not preserved
globally.

Here are the rough steps to follow:

# Add a Bacon Cape to a BeagleBone on the Internet
# git clone git://github.com/jadonk/spacebrew-bonescript
# cd spacebrew-bonescript
# npm install ws@0.4.27
# node bacon_test1.js
# Browse to http://spacebrew.github.io/spacebrew/admin/admin.html?server=sandbox.spacebrew.cc to see your live connections

Alternatively, you can serve it locally. I tested this by installing and running the
server, adding a server name in the test file and browsing to http://spacebrew.github.io/spacebrew/admin/admin.html?server=192.168.7.2, where 192.168.7.2 is the address of my
BeagleBone.

You can even serve up the admin.html files by linking to the web server files via
something like 'cd /usr/share/bone101; ln -s $HOME/spacebrew'.  Then you can browse to
http://192.168.7.2/spacebrew/admin/admin.html?server=192.168.7.2.

