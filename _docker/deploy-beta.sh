docker login registry.new.rewave.ch  -u user1 -p QX55UkaEMEYnc4b4TPEYJKwv
docker build  -t rewave/beta -f beta/Dockerfile ../ --platform=linux/amd64
docker tag rewave/beta registry.new.rewave.ch/rewave/beta
docker push registry.new.rewave.ch/rewave/beta