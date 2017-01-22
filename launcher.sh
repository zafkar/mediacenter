#!/bin/bash

./playlistBuilder.sh 
screen -S mediacenter-nodejs -d -m ./launcherNodejs.sh
screen -S mediacenter-mplayer -d -m ./launcherMplayer.sh

