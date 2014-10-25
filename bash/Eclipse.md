# Eclipse

## Centos - Show menu icons
* gconftool-2 --type boolean --set /desktop/gnome/interface/menus_have_icons true

## Linux Mint - Fix icon (https://bugs.launchpad.net/linuxmint/+bug/1168281)
* Global config file "/usr/share/themes/Mint-X/gtk-2.0/gtkrc"
* Edit ~/.gtkrc-2.0

```
style "null"
{
 engine "pixmap"
 {
 image
  {
   function = BOX
   file = "images/other/null.png"
   stretch = TRUE
  }
 }
}

widget "*swt*toolbar-flat" style "null"
```
