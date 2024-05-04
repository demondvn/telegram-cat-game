# tele-cat

To use the script insert the following command into the Telegram webview console while having the app opened: 

```
fetch('https://raw.githubusercontent.com/demondvn/telegram-cat-game/master/bundle.js').then(response => response.text()).then(script => eval(script));
```

## Backup (Run on Ubuntu)
`cd` to backup folder and run
```
curl -o backup.sh https://raw.githubusercontent.com/demondvn/telegram-cat-game/main/backup.sh
chmod +x backup.sh
./backup.sh
```


## Reload (Run on VM Machine)
Download file and run
```
curl -o /root/reload.sh https://raw.githubusercontent.com/demondvn/telegram-cat-game/main/reload.sh
chmod +x reload.sh
```
Open xterminal and `./reload.sh`
![image](https://github.com/demondvn/telegram-cat-game/assets/3754260/ed0ee525-c29a-4098-b85f-eb86732ab8ea)

## Note
`RandomEventsDlgUI`
`SpeedDlgUI`
`checkShowRandomEvent`

## Socket

`5` people
`31` gold collect
