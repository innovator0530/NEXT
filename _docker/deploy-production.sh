docker login registry.new.rewave.ch  -u user1 -p QX55UkaEMEYnc4b4TPEYJKwv
docker build  -t rewave/production -f production/Dockerfile ../ --platform=linux/amd64
docker tag rewave/production registry.new.rewave.ch/rewave/production
docker push registry.new.rewave.ch/rewave/production