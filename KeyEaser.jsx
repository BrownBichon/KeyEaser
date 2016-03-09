app.beginUndoGroup("Keyframe");
var myComps = app.project.activeItem;
var myLayers = myComps.selectedLayers;
var myProps = myLayers[0].selectedProperties;
var myKeys = myProps[0].selectedKeys;

//myKey = new KeyframeEase(speed, influence);
var easeSpeed = 50;
var easeInfluence = 50;
var myEase = new KeyframeEase(easeSpeed, easeInfluence);


// myProps[0].setTemporalEaseAtKey(myKeys[1], [myEase],
// [myEase]);

// setValueAtTime(time, newValue)
// keyTime(keyIndex)
// keyValue(keyIndex)


//Add endKey
var endTime = 2*myProps[0].keyTime(myKeys[1])-myProps[0].keyTime(myKeys[0]);
var endValue = myProps[0].keyValue(myKeys[1]);
myProps[0].setValueAtTime(endTime, endValue);

app.endUndoGroup();
