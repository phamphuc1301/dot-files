# Configure mouse speed/sensitivity

# What is it ?
* This simple guide show you how to change mouse speed/sensitivity on Linux system using command line

# How to do it?
* List all device with this command
```xinput --list --short```
    *output:
```
somallg@407LW7P567:~$ xinput --list --short
⎡ Virtual core pointer                    	id=2	[master pointer  (3)]
⎜   ↳ Virtual core XTEST pointer              	id=4	[slave  pointer  (2)]
⎜   ↳ PixArt USB Optical Mouse                	id=10	[slave  pointer  (2)]
⎜   ↳ SynPS/2 Synaptics TouchPad              	id=13	[slave  pointer  (2)]
⎣ Virtual core keyboard                   	id=3	[master keyboard (2)]
    ↳ Virtual core XTEST keyboard             	id=5	[slave  keyboard (3)]
    ↳ Power Button                            	id=6	[slave  keyboard (3)]
    ↳ Video Bus                               	id=7	[slave  keyboard (3)]
    ↳ Power Button                            	id=8	[slave  keyboard (3)]
    ↳ Sleep Button                            	id=9	[slave  keyboard (3)]
    ↳ HD WebCam                               	id=11	[slave  keyboard (3)]
    ↳ AT Translated Set 2 keyboard            	id=12	[slave  keyboard (3)]
    ↳ Acer WMI hotkeys                        	id=14	[slave  keyboard (3)]
```
* Here my pointing device is PixArt USB Optical Mouse and SynPS/2 Synaptics TouchPad. So i gonna change the speed of PixArt USB Optical Mouse
* List device Properties
```xinput --list-props "PixArt USB Optical Mouse" | grep Accel```
    * output:
```
	Device Accel Profile (258):	0
	Device Accel Constant Deceleration (259):	1.000000
	Device Accel Adaptive Deceleration (260):	1.000000
	Device Accel Velocity Scaling (261):	10.000000
```
* Change mouse speed with this command:
````xinput --set-prop "PixArt USB Optical Mouse" "Device Accel Constant Deceleration" 3```
