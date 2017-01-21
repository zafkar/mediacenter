#!/bin/bash

mplayer -ao pulse -slave -playlist ../playlist -input file='./FIFO' >> FIFOin

