./bin/run.js contract create-application -c=0xFD17E4C77c59Ded597EAc377F55cC4e2b6821257 -i=Vedang

# Sign and reject rules
./bin/run.js wallet disconnect
./bin/run.js wallet connect
./bin/run.js contract reject -c=0xFD17E4C77c59Ded597EAc377F55cC4e2b6821257 -i=Vedang -r=s_3
./bin/run.js wallet disconnect
./bin/run.js wallet connect
./bin/run.js contract reject -c=0xFD17E4C77c59Ded597EAc377F55cC4e2b6821257 -i=Vedang -r=s_4

./bin/run.js contract workflow-status -c=0xFD17E4C77c59Ded597EAc377F55cC4e2b6821257 -i=Vedang