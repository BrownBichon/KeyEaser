app.beginUndoGroup("KeyEaser");

var myLayers = app.project.activeItem.selectedLayers;

//if keyframes are selected, do endEase()
if (myLayers.length !=0) {
	for (var i = 0; i < myLayers.length; i++) {
		var myProps = myLayers[i].selectedProperties;
		if (myProps.length !=0) {
			for (var j = 0; j < myProps.length; j++) {
				var myKeys = myProps[j].selectedKeys;
				if (myKeys.length == 2) {
					//ease the keyframes
					endEase(myProps[j], myKeys);
				} else {
					///////////////////
					//if myKeys.length != 2;
					//Do nothing to selectedKeys;
					///////////////////
					//alert("Please selecte two keyframes");
				}
			}
		} else {
			//alert("Please selecte some Props");
		}
	}

} else {
	//alert("Please selecte some layers");
}


//endEase function
function endEase(selectedProp, selectedKeys) {
	//Add endKey
	var endTime = 2*selectedProp.keyTime(selectedKeys[1])-selectedProp.keyTime(selectedKeys[0]);
	var endValue = selectedProp.keyValue(selectedKeys[1]);
	selectedProp.setValueAtTime(endTime, endValue);
	//Select the keyframe that just added
	selectedProp.setSelectedAtKey(selectedKeys[1] + 1, true);

	//Change Value
	var startValue = selectedProp.keyValue(selectedKeys[0]);
	var midValue = endValue - (endValue - startValue)*0.056;
	selectedProp.setValueAtKey(selectedKeys[1], midValue);

	//Change TemporalEase
	var flatSpeed = 0;
	var flatInfluence = 50;
	var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

	var midInInfluence = flatInfluence;
	var midOutInfluence = 18;
	var midSpeed = (endValue-midValue)/((endTime - selectedProp.keyTime(selectedKeys[1]))*0.18);
	var midInEase = new KeyframeEase(midSpeed, midInInfluence);
	var midOutEase = new KeyframeEase(midSpeed, midOutInfluence);

	selectedProp.setTemporalEaseAtKey(selectedKeys[0], [flatEase],[flatEase]);
	selectedProp.setTemporalEaseAtKey(selectedKeys[1], [midInEase],[midOutEase]);
	selectedProp.setTemporalEaseAtKey(selectedKeys[1] + 1, [flatEase],[flatEase]);

}

//subEase function
function subEase(selectedProp, selectedKeys) {
	// body...
}

app.endUndoGroup();
