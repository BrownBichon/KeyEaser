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
	//Determine the selectedProp's propertyValueType
	if (selectedProp.propertyValueType == PropertyValueType.OneD) {
		//alert("OneD");
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

		//Set TemporalEase
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
	} else if (selectedProp.propertyValueType == PropertyValueType.TwoD) {
		//alert("TwoD");
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

		//Set TemporalEase
		var flatSpeed = 0;
		var flatInfluence = 50;
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 18;
		var midSpeedX = (endValue[0]-midValue[0])/((endTime - selectedProp.keyTime(selectedKeys[1]))*0.18);
		var midSpeedY = (endValue[1]-midValue[1])/((endTime - selectedProp.keyTime(selectedKeys[1]))*0.18);
		var midInEaseX = new KeyframeEase(midSpeedX, midInInfluence);
		var midInEaseY = new KeyframeEase(midSpeedY, midInInfluence);
		var midOutEaseX = new KeyframeEase(midSpeedX, midOutInfluence);
		var midOutEaseY = new KeyframeEase(midSpeedY, midOutInfluence);

		selectedProp.setTemporalEaseAtKey(selectedKeys[0], [flatEase,flatEase],[flatEase,flatEase]);
		selectedProp.setTemporalEaseAtKey(selectedKeys[1], [midInEaseX,midInEaseY],[midOutEaseX,midOutEaseY]);
		selectedProp.setTemporalEaseAtKey(selectedKeys[1] + 1, [flatEase,flatEase],[flatEase,flatEase]);
	} else if (selectedProp.propertyValueType == PropertyValueType.ThreeD) {
		//alert("ThreeD");
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

		//Set TemporalEase
		var flatSpeed = 0;
		var flatInfluence = 50;
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 18;
		var midSpeedX = (endValue[0]-midValue[0])/((endTime - selectedProp.keyTime(selectedKeys[1]))*0.18);
		var midSpeedY = (endValue[1]-midValue[1])/((endTime - selectedProp.keyTime(selectedKeys[1]))*0.18);
		var midSpeedZ = (endValue[2]-midValue[2])/((endTime - selectedProp.keyTime(selectedKeys[1]))*0.18);
		var midInEaseX = new KeyframeEase(midSpeedX, midInInfluence);
		var midInEaseY = new KeyframeEase(midSpeedY, midInInfluence);
		var midInEaseZ = new KeyframeEase(midSpeedZ, midInInfluence);
		var midOutEaseX = new KeyframeEase(midSpeedX, midOutInfluence);
		var midOutEaseY = new KeyframeEase(midSpeedY, midOutInfluence);
		var midOutEaseZ = new KeyframeEase(midSpeedZ, midOutInfluence);


		selectedProp.setTemporalEaseAtKey(selectedKeys[0], [flatEase,flatEase,flatEase],[flatEase,flatEase,flatEase]);
		selectedProp.setTemporalEaseAtKey(selectedKeys[1], [midInEaseX,midInEaseY,midInEaseZ],[midOutEaseX,midOutEaseY,midOutEaseZ]);
		selectedProp.setTemporalEaseAtKey(selectedKeys[1] + 1, [flatEase,flatEase,flatEase],[flatEase,flatEase,flatEase]);
	} else if (selectedProp.propertyValueType == PropertyValueType.TwoD_SPATIAL) {
		//Anchor Point Value is Alway a ThreeD_SPATIAL, haven't found a TwoD_SPATIAL property yet.
		//alert("TwoD_SPATIAL");
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

		//Set TemporalEase
		var flatSpeed = 0;
		var flatInfluence = 50;
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 18;
		var midSpeed = Math.sqrt( (endValue[0]-midValue[0])*(endValue[0]-midValue[0]) + (endValue[1]-midValue[1])*(endValue[1]-midValue[1]) )/((endTime - selectedProp.keyTime(selectedKeys[1]))*0.18);
		var midInEase = new KeyframeEase(midSpeed, midInInfluence);
		var midOutEase = new KeyframeEase(midSpeed, midOutInfluence);


		selectedProp.setTemporalEaseAtKey(selectedKeys[0], [flatEase],[flatEase]);
		selectedProp.setTemporalEaseAtKey(selectedKeys[1], [midInEase],[midOutEase]);
		selectedProp.setTemporalEaseAtKey(selectedKeys[1] + 1, [flatEase],[flatEase]);
	} else if (selectedProp.propertyValueType == PropertyValueType.ThreeD_SPATIAL) {
		/////////////////////////
		//Odd break corner occurs when apply the EndEase （the auto bezeir case）
		//https://forums.adobe.com/thread/422875
		/////////////////////////

		/////////////////////////
		//To do...
		//When it comes to position, try to separate the position property

		//alert("ThreeD_SPATIAL");
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

		//Set TemporalEase
		var flatSpeed = 0;
		var flatInfluence = 50;
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 18;
		var midSpeed = Math.sqrt( (endValue[0]-midValue[0])*(endValue[0]-midValue[0]) + (endValue[1]-midValue[1])*(endValue[1]-midValue[1]) + (endValue[2]-midValue[2])*(endValue[2]-midValue[2]) )/((endTime - selectedProp.keyTime(selectedKeys[1]))*0.18);
		var midInEase = new KeyframeEase(midSpeed, midInInfluence);
		var midOutEase = new KeyframeEase(midSpeed, midOutInfluence);


		selectedProp.setTemporalEaseAtKey(selectedKeys[0], [flatEase],[flatEase]);
		selectedProp.setTemporalEaseAtKey(selectedKeys[1], [midInEase],[midOutEase]);
		selectedProp.setTemporalEaseAtKey(selectedKeys[1] + 1, [flatEase],[flatEase]);
	} else if (selectedProp.propertyValueType == PropertyValueType.SHAPE) {
		//To do...
		//Maybe do it the hard way//
		//Read every vertex of the shape and bake the keyframes.//
		//Find a way to calculate points of the Bézier curve//
	} else if (selectedProp.propertyValueType == PropertyValueType.COLOR) {
		//To do...
	} 

}

//subEase function
function subEase(selectedProp, selectedKeys) {
	// body...
}

app.endUndoGroup();
