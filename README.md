## React ToDo

## Environment

```bash
cd /etc/apt/sources.list.d 
sudo rm nodesource.list
```

```bash
sudo apt --fix-broken install
sudo apt update
sudo apt remove nodejs
sudo apt remove nodejs-doc
```

```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

```bash
sudo apt install npm
npm -v
```

```bash
npm install --global yarn
yarn -v
```

```bash
yarn create react-app my-app
```

## Referencia

- https://react.dev/learn
- https://create-react-app.dev/docs/getting-started/