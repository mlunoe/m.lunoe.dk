# m.lunoe.dk
Personal webpage / resume

# Run locally

- `npm i`
- `gem install compass`
- Change `app/js/services.js` to point to dev socket: `var socket = io.connect('http://localhost:8000');`
- `npm run watch`
- `npm start`



# Setup on server

## Copy local files to server (remember to replace <user>)
```sh
scp -r ./app/ <user>@m.lunoe.dk:/var/www/m.lunoe.dk
```

## Copy services/m.lunoe.dk.service to /etc/systemd/system
```sh
sudo cp services/m.lunoe.dk.service /etc/systemd/system
# Start long running service
systemctl start m.lunoe.dk
# Enable it to run on boot
systemctl enable m.lunoe.dk
# Check the logs
journalctl -u m.lunoe.dk
```
