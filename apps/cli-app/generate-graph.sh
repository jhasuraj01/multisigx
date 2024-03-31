./bin/run.js graph create mygraph --title="College Multisig Workflow" --description="This is a simplest multisig workflow for college"

./bin/run.js rule create sign teacher_1 --address=address_teacher_1 --name="Teacher 1 Signature" --graph=mygraph
./bin/run.js rule create sign teacher_2 --address=address_teacher_2 --name="Teacher 2 Signature" --graph=mygraph
./bin/run.js rule create sign hod_1 --address=address_hod_1 --name="Hod Signature" --graph=mygraph
./bin/run.js rule create and and_1 --name="Teacher 1 and Teacher 2" --graph=mygraph
./bin/run.js rule create or or_1 --name="Teachers or Hod" --graph=mygraph

./bin/run.js rule connect --from=start --to=teacher_1 --graph=mygraph
./bin/run.js rule connect --from=start --to=teacher_2 --graph=mygraph
./bin/run.js rule connect --from=start --to=hod_1 --graph=mygraph

./bin/run.js rule connect --from=teacher_1 --to=and_1 --graph=mygraph
./bin/run.js rule connect --from=teacher_2 --to=and_1 --graph=mygraph

./bin/run.js rule connect --from=and_1 --to=or_1 --graph=mygraph
./bin/run.js rule connect --from=hod_1 --to=or_1 --graph=mygraph

./bin/run.js rule connect --from=or_1 --to=end --graph=mygraph

./bin/run.js graph print mygraph > graph.tmp.json