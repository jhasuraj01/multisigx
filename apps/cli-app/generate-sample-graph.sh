./bin/run.js graph create mygraph --title="Sample Workflow" --description="This is a simple multisig workflow"

./bin/run.js rule create sign s_1 --address=address_s_1 --name="s_1 Signature" --graph=mygraph
./bin/run.js rule create sign s_2 --address=address_s_2 --name="s_2 Signature" --graph=mygraph
./bin/run.js rule create sign s_3 --address=address_s_3 --name="s_3 Signature" --graph=mygraph
./bin/run.js rule create sign s_4 --address=address_s_4 --name="s_4 Signature" --graph=mygraph
./bin/run.js rule create sign s_5 --address=address_s_5 --name="s_5 Signature" --graph=mygraph
./bin/run.js rule create or or_1 --name="s_1 or s_2" --graph=mygraph
./bin/run.js rule create atleast atleast_1 --name="s_3 and s_4" --count=2 --graph=mygraph
./bin/run.js rule create and and_1 --name="s_4 and s_5" --graph=mygraph
./bin/run.js rule create sign s_6 --address=address_s_6 --name="s_6 Signature" --graph=mygraph
./bin/run.js rule create sign s_7 --address=address_s_7 --name="s_7 Signature" --graph=mygraph
./bin/run.js rule create sign s_8 --address=address_s_8 --name="s_8 Signature" --graph=mygraph --logic=or

./bin/run.js rule connect --from=start --to=s_1 --graph=mygraph
./bin/run.js rule connect --from=start --to=s_2 --graph=mygraph
./bin/run.js rule connect --from=start --to=s_3 --graph=mygraph
./bin/run.js rule connect --from=start --to=s_4 --graph=mygraph
./bin/run.js rule connect --from=start --to=s_5 --graph=mygraph
./bin/run.js rule connect --from=s_1 --to=or_1 --graph=mygraph
./bin/run.js rule connect --from=s_2 --to=or_1 --graph=mygraph
./bin/run.js rule connect --from=s_3 --to=atleast_1 --graph=mygraph
./bin/run.js rule connect --from=s_4 --to=and_1 --graph=mygraph
./bin/run.js rule connect --from=s_5 --to=and_1 --graph=mygraph
./bin/run.js rule connect --from=atleast_1 --to=s_6 --graph=mygraph
./bin/run.js rule connect --from=atleast_1 --to=s_7 --graph=mygraph
./bin/run.js rule connect --from=s_6 --to=s_8 --graph=mygraph
./bin/run.js rule connect --from=s_7 --to=s_8 --graph=mygraph
./bin/run.js rule connect --from=s_8 --to=end --graph=mygraph

./bin/run.js graph print mygraph > graph.tmp.json