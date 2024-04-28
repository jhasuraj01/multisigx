./bin/run.js graph create mygraph --title="Sample Workflow" --description="This is a simple multisig workflow"

./bin/run.js rule create sign s_1 --address=0xb3d389ED9629Af7Eb47166741ADFF88bcb1ab7d5 --name="s_1 Signature" --graph=mygraph
./bin/run.js rule create sign s_2 --address=0x1259B83e2a5f50be96453CCC477bC940D22E94F8 --name="s_2 Signature" --graph=mygraph
./bin/run.js rule create sign s_3 --address=0xcF466B4Eb9ce14bbDAfb01cafCeE09c82895F837 --name="s_3 Signature" --graph=mygraph
./bin/run.js rule create sign s_4 --address=0x1DE20B2F343FF661961f98b36039876Fd3719B97 --name="s_4 Signature" --graph=mygraph
./bin/run.js rule create sign s_5 --address=0x33619124Ae8c037BfA137138220Cf3ac49CA58f3 --name="s_5 Signature" --graph=mygraph
./bin/run.js rule create sign s_6 --address=0xD53A4c9b693319438D445436010C85e69c6B56D3 --name="s_6 Signature" --graph=mygraph
./bin/run.js rule create sign s_7 --address=0xAf0FC037ad38D3Bb2771D1998B141A21343ffD73 --name="s_7 Signature" --graph=mygraph
./bin/run.js rule create sign s_8 --address=0x3c4af86D05Ffb5AA1eaFe3DfBBf3848fc90b85e8 --name="s_8 Signature" --graph=mygraph --logic=or
./bin/run.js rule create or or_1 --name="s_1 or s_2" --graph=mygraph
./bin/run.js rule create atleast atleast_1 --name="s_3 and s_4" --count=2 --graph=mygraph
./bin/run.js rule create and and_1 --name="s_4 and s_5" --graph=mygraph

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