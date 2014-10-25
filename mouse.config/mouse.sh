#!/bin/sh
# Basic mouse configuration

set -x

xinput set-prop 'Razer DeathAdder' 'Device Accel Profile' -1

xinput set-prop 'Razer DeathAdder' 'Device Accel Constant Deceleration' 2

exit 0