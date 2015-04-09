#!/bin/sh
# Basic mouse configuration

set -x

xinput set-prop 'PixArt USB Optical Mouse' 'Device Accel Profile' -1

xinput set-prop 'PixArt USB Optical Mouse' 'Device Accel Constant Deceleration' 2

exit 0
