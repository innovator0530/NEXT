docker login registry.new.rewave.ch  -u user1 -p QX55UkaEMEYnc4b4TPEYJKwv
docker build  -t rewave/alpha -f alpha/Dockerfile ../ --platform=linux/amd64
docker tag rewave/alpha registry.new.rewave.ch/rewave/alpha
docker push registry.new.rewave.ch/rewave/alpha