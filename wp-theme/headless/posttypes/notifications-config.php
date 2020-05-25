<?php

// register store locator ajax request
add_action('wp_ajax_nopriv_notifications_signup', 'ajax_notifications_signup');
add_action('wp_ajax_notifications_signup', 'ajax_notifications_signup');
function ajax_notifications_signup(){
	
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	header('Content-type: application/json');

	$nonce = $_POST['nonce'];
	
/*
	if ( !wp_verify_nonce($nonce, 'notifications_signup_nonce') ){
		$return = array('status' => 'err', 'message' => 'Sorry, You have failed the spambot check.');
		die(json_encode($return));
	}
*/

	// validate field not empty
	$phone_number = isset($_POST['phone_number']) ? $_POST['phone_number'] : null;
	if(empty($phone_number)){
		$return = array('status' => 'err', 'message' => 'Please enter your phone number.');
		die(json_encode($return));
	}
	
	// validate phone number
	if(!preg_match("/^(?|\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/", $phone_number)){
		$return = array('status' => 'err', 'message' => 'Your phone number does not appear valid.');
		die(json_encode($return));
	}
	
	// remove all non digits
	$phone_number = preg_replace('/\D+/', '', $phone_number);
	
	$data = array("msisdns" => array($phone_number), "mobileFlow" => "55a9512e0cf251df96754455");                                                                    
	$data_string = json_encode($data);                                                                                   
	                                                                                                                     
	$ch = curl_init('http://api.waterfall.com/api/v1/messaging/sendContent');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
	curl_setopt($ch, CURLOPT_HTTPHEADER, 
		array(                                                                          
			'Content-Type:application/json', 
			'Accept:application/json',
			'Authorization:0bcead0d-26ac-48fb-a41b-af4ad570696c',                                                                              
		)                                                                       
	);                                                                                                                   
	                                                                                                                     
	$result = curl_exec($ch);
	if($result !== ''){
		$return = array('status' => 'err', 'message' => 'Sorry, we are experiencing errors. Please try again later.');
		die(json_encode($return));
	}

	
	$return = array('status' => 'OK');
	die(json_encode($return));
}
