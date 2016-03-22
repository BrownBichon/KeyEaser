var scriptTitle = "KeyEaser";

var myPalette = buildUI(this);

if (myPalette != null && myPalette instanceof Window) {
	myPalette.show();
}

function buildUI(thisObject) {

	if (thisObject instanceof Panel) {
		var myPalette = thisObject;
	} else {
		var myPalette = new Window ("palette", scriptTitle, undefined, {resizeable: true});
	}

	if (myPalette != null) {
		var res = 
		"Group {\
			orientation: 'column', \
			alignment: ['left', 'top'], \
			alignChildren: ['left', 'top'], \
			influenceGrp: Group { \
				influenceSld: Slider {}, \
				influenceValue: EditText {text:'0', bounds:[0,0,30,20]}, \
			}, \
			easeDurationGrp: Group { \
				easeDurationSld: Slider {}, \
				easeDurationValue: EditText {text:'1', bounds:[0,0,30,20]}, \
			}, \
			easeButtonGrp: Group { \
				subEaseBtn: Button {text:'SubEase'}, \
				endEaseBtn: Button {text:'EndEase'}, \
			}, \
		}"

		myPalette.grp = myPalette.add(res);
		myPalette.layout.layout(true);
		myPalette.layout.resize();

		//flatEase
		myPalette.grp.influenceGrp.influenceSld.onChange = function(){
			keyEaser("flatEase");
		}
		myPalette.grp.influenceGrp.influenceSld.onChanging = function () {
			myPalette.grp.influenceGrp.influenceValue.text = Math.round(this.value);
		}
		myPalette.grp.influenceGrp.influenceValue.onChange = function () {
			myPalette.grp.influenceGrp.influenceSld.value = Math.round(parseFloat(this.text));
			this.text = myPalette.grp.influenceGrp.influenceSld.value;
			keyEaser("flatEase");
		}
		//endEase
		myPalette.grp.easeButtonGrp.endEaseBtn.onClick = function () {
			keyEaser("endEase");
		}
		//subEase
		myPalette.grp.easeButtonGrp.subEaseBtn.onClick = function () {
			keyEaser("subEase");
		}

		myPalette.onResizing = myPalette.Resize = function () {this.layout.resize();}
	}
	return myPalette;
}

function keyEaser(clickedBtn) {
	app.beginUndoGroup("KeyEaser");

	var myLayers = app.project.activeItem.selectedLayers;

	//if 2 keyframes are selected & endEaseBtn clicked, do endEase();
	//if 3 keyframes are selected & subEaseBtn clicked, do subEase();
	if (myLayers.length !=0) {
		for (var i = 0; i < myLayers.length; i++) {
			var myProps = myLayers[i].selectedProperties;
			if (myProps.length !=0) {
				for (var j = 0; j < myProps.length; j++) {
					var myKeys = myProps[j].selectedKeys;
					if (myKeys.length == 2 && clickedBtn == "endEase") {
						//endEase
						endEase(myProps[j], myKeys);
					} else if (myKeys.length == 3 && clickedBtn == "subEase") {
						//subEase
						subEase(myProps[j], myKeys);
					} else if (myKeys.length !== 0) {
						//flatEase
						flatEase(myProps[j], myKeys);
					}
				}
			}
		}
	} 

	app.endUndoGroup();
}





//endEase function
function endEase(selectedProp, selectedKeys) {
	var flatInfluence = Math.round(myPalette.grp.influenceGrp.influenceSld.value);

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
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 0.36*(100 - flatInfluence);
		var midSpeed = (endValue-midValue)/((endTime - selectedProp.keyTime(selectedKeys[1]))*(midOutInfluence/100));
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
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 0.36*(100 - flatInfluence);
		var midSpeedX = (endValue[0]-midValue[0])/((endTime - selectedProp.keyTime(selectedKeys[1]))*(midOutInfluence/100);
		var midSpeedY = (endValue[1]-midValue[1])/((endTime - selectedProp.keyTime(selectedKeys[1]))*(midOutInfluence/100));
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
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 0.36*(100 - flatInfluence);
		var midSpeedX = (endValue[0]-midValue[0])/((endTime - selectedProp.keyTime(selectedKeys[1]))*(midOutInfluence/100));
		var midSpeedY = (endValue[1]-midValue[1])/((endTime - selectedProp.keyTime(selectedKeys[1]))*(midOutInfluence/100));
		var midSpeedZ = (endValue[2]-midValue[2])/((endTime - selectedProp.keyTime(selectedKeys[1]))*(midOutInfluence/100));
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
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 0.36*(100 - flatInfluence);
		var midSpeed = Math.sqrt( (endValue[0]-midValue[0])*(endValue[0]-midValue[0]) + (endValue[1]-midValue[1])*(endValue[1]-midValue[1]) )/((endTime - selectedProp.keyTime(selectedKeys[1]))*(midOutInfluence/100));
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
		var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

		var midInInfluence = flatInfluence;
		var midOutInfluence = 0.36*(100 - flatInfluence);
		var midSpeed = Math.sqrt( (endValue[0]-midValue[0])*(endValue[0]-midValue[0]) + (endValue[1]-midValue[1])*(endValue[1]-midValue[1]) + (endValue[2]-midValue[2])*(endValue[2]-midValue[2]) )/((endTime - selectedProp.keyTime(selectedKeys[1]))*(midOutInfluence/100));
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
	alert("subEase");
}

//flatEase function
function flatEase(selectedProp, selectedKeys) {

	//Set TemporalEase
	var flatSpeed = 0;
	var flatInfluence = Math.round(myPalette.grp.influenceGrp.influenceSld.value);
	var flatEase = new KeyframeEase(flatSpeed, flatInfluence);

	//if flatInfluence == 0, set InterpolationType to LINEAR
	/////////////////////////
	/////Not working yet/////
	/////////////////////////
	//Because when the Slider indicator was moved to 0, the onChange() didn't work.
	if (myPalette.grp.influenceGrp.influenceValue.text == "0") {
		for (var k = 0; k < selectedKeys.length; k++) {
			selectedProp.setInterpolationTypeAtKey(selectedKeys[k], KeyframeInterpolationType.LINEAR);
		}
	} else {
		//Determine the selectedProp's propertyValueType
		if (selectedProp.propertyValueType == PropertyValueType.ThreeD) {
			for (var k = 0; k < selectedKeys.length; k++) {
				selectedProp.setTemporalEaseAtKey(selectedKeys[k], [flatEase,flatEase,flatEase],[flatEase,flatEase,flatEase]);
			}
		} else if (selectedProp.propertyValueType == PropertyValueType.TwoD) {
			for (var k = 0; k < selectedKeys.length; k++) {
				selectedProp.setTemporalEaseAtKey(selectedKeys[k], [flatEase,flatEase],[flatEase,flatEase]);	
			}
		} else {
			for (var k = 0; k < selectedKeys.length; k++) {
				selectedProp.setTemporalEaseAtKey(selectedKeys[k], [flatEase],[flatEase]);
			}
		}
	}

}


