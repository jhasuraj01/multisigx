./bin/run.js contract create-application -c=0xFD17E4C77c59Ded597EAc377F55cC4e2b6821257 -i=Aachal

# Sign and reject rules
./bin/run.js contract sign -c=0xFD17E4C77c59Ded597EAc377F55cC4e2b6821257 -i=Aachal -r=s_1

./bin/run.js contract workflow-status -c=0xFD17E4C77c59Ded597EAc377F55cC4e2b6821257 -i=Aachal