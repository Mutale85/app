<?php
include 'db.php';

if (isset($_POST['storage_type'])) {
	$storage_type = filter_var($_POST['storage_type'], FILTER_SANITIZE_STRING);
	$storage_dimension = filter_var($_POST['storage_dimension'], FILTER_SANITIZE_STRING);
	$storage_features = filter_var(count($_POST['storage_features']), FILTER_SANITIZE_STRING);
	$storage_location = filter_var($_POST['storage_location'], FILTER_SANITIZE_STRING);
	$storage_rent = filter_var($_POST['storage_rent'], FILTER_SANITIZE_STRING);
	$storage_other_details = filter_var(nl2br($_POST['storage_other_details']), FILTER_SANITIZE_STRING);
	$user_phone = filter_var($_POST['user_phone'], FILTER_SANITIZE_STRING);
	$username = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
	$storage_image = $_FILES['storage_image']['name'];// Getting Errors Here
	$filename = $_FILES['storage_image']['tmp_name'];// Getting Errors Here

	$destination = "images/".basename($storage_image);//// this is als failing due to the above Errors
	move_uploaded_file($filename, $destination);// this is als failing due to the above Errors

	$sql = mysqli_query($conn, "INSERT INTO storage_table1( storage_type, storage_dimension, storage_location, storage_rent, storage_other_details, user_phone, username) VALUES( '$storage_type', '$storage_dimension', '$storage_location', '$storage_rent', '$storage_other_details', '$user_phone', '$username' ) ") or die(mysqi_error($conn));
	$lastId = mysqli_insert_id($conn);
	// We now upload the data to the sever----------
	foreach ($_POST['storage_features'] as $features) {

		$sql = mysqli_query($conn, "INSERT INTO storage_features( last_id, storage_features) VALUES('$lastId', '$features') ") or die(mysqi_error($conn));
		if ($sql ==  true) {
			
		}else{
			echo "error";
		}
	}
	echo "success";

}

?>
