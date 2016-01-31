function validateFileType( inputName ){
	var upload, flag= false, isValid = true;
	var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"]; 
	var errorMessage = document.getElementsByClassName('error-messages')[0];

	if ( document.getElementById( inputName ) )
	{
		upload = document.getElementById( inputName );
		if ( upload.files.length < 1)
		{
			errorMessage.innerHTML = 'Please choose file to upload first!';
			errorMessage.classList.add('active');
			//console.log('Please choose file to upload first!');
			return false;
		}
		for ( var i=0; i< upload.files.length ;i++ )
		{
			var sFileName = upload.files.item(i).name;
			for (var j = 0; j < _validFileExtensions.length; j++) {
				var sCurExtension = _validFileExtensions[j];
				if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
					isValid = true;
					break;
				}else{
					isValid = false;
				}
			}
		}
		if (!isValid) {
			errorMessage.innerHTML = "Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", ");
			errorMessage.classList.add('active');
			//console.log("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
			return false;
		}
	}else{
		return false;
	}

	return isValid;
}