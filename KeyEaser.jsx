app.beginUndoGroup("Keyframe");

var myLayers = app.project.activeItem.selectedLayers;
var myProps = myLayers[0].selectedProperties;
var myKeys = myProps[0].selectedKeys;

//myKey = new KeyframeEase(speed, influence);





// setValueAtTime(time, newValue)
// keyTime(keyIndex)
// keyValue(keyIndex)
// setValueAtKey(keyIndex, newValue)


//Add endKey
var endTime = 2*myProps[0].keyTime(myKeys[1])-myProps[0].keyTime(myKeys[0]);
var endValue = myProps[0].keyValue(myKeys[1]);
myProps[0].setValueAtTime(endTime, endValue);

//Change Value
var startValue = myProps[0].keyValue(myKeys[0]);
var midValue = endValue - (endValue - startValue)*0.056;
myProps[0].setValueAtKey(myKeys[1], midValue);

//Change TemporalEase
var flatSpeed = 0;
var flatInfluence = 50;
var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

var midInInfluence = flatInfluence;
var midOutInfluence = 18;
var midSpeed = (endValue-midValue)/((endTime - myProps[0].keyTime(myKeys[1]))*0.18);
var midInEase = new KeyframeEase(midSpeed, midInInfluence);
var midOutEase = new KeyframeEase(midSpeed, midOutInfluence);

myProps[0].setTemporalEaseAtKey(myKeys[0], [flatEase],[flatEase]);
myProps[0].setTemporalEaseAtKey(myKeys[1], [midInEase],[midOutEase]);
myProps[0].setTemporalEaseAtKey(myKeys[1] + 1, [flatEase],[flatEase]);

app.endUndoGroup();
