app.beginUndoGroup("Keyframe");
var myComps = app.project.activeItem;
var myLayers = myComps.selectedLayers;
var myProps = myLayers[0].selectedProperties;
var myKeys = myProps[0].selectedKeys;

//myKey = new KeyframeEase(speed, influence);
var easeSpeed = 50;
var easeInfluence = 50;
var myEase = new KeyframeEase(easeSpeed, easeInfluence);


myProps[0].setTemporalEaseAtKey(myKeys[1], [myEase],
[myEase]);

alert(myProps[0].keyValue(myKeys[1]));

app.endUndoGroup();
