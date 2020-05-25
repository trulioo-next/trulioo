<?php

// register balance check ajax request
add_action('wp_ajax_nopriv_balance_check', 'ajax_balance_check');
add_action('wp_ajax_balance_check', 'ajax_balance_check');
function ajax_balance_check(){
	global $recaptcha_secret_key;
	
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");
	header('Content-type: application/json');

	$nonce = $_POST['nonce'];
	
/*
	if ( !wp_verify_nonce($nonce, 'balance_check_nonce') ){
		$return = array('status' => 'err', 'message' => 'Sorry, You have failed the spambot check.');
		die(json_encode($return));
	}
*/
	
	$card_number = isset($_POST['card_number']) ? $_POST['card_number'] : null;
	$g_recaptcha_response = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : null;
	
	if ( empty($card_number) ){
		$return = array('status' => 'err', 'message' => 'Please enter a gift card number.');
		die(json_encode($return));
	}elseif(!preg_match("/^(\d{4}[ ]?\d{4}[ ]?\d{4}[ ]?\d{4})$/", $card_number)){
		$return = array('status' => 'err', 'message' => 'That gift card number does not appear to be valid.');
		die(json_encode($return));
	}
	if ( empty($g_recaptcha_response) ){
		$return = array('status' => 'err', 'message' => 'Please complete the captcha.');
		die(json_encode($return));
	}
	
	$data = array("secret" => $recaptcha_secret_key, "response" => $g_recaptcha_response);                                                                    
	$data_string = '';
	foreach($data as $key=>$value) { 
		$data_string .= $key.'='.$value.'&';
	}
	rtrim($data_string, '&');
	                                                                                                                     
	$ch = curl_init('https://www.google.com/recaptcha/api/siteverify');                                                                      
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
	                                                                                                                     
	$result = curl_exec($ch);
	$result = json_decode($result);
	
	if(!$result->success){
		$return = array('status' => 'err', 'message' => 'Sorry, we are experiencing errors. Please try again later.');
		die(json_encode($return));
	}

	// strip whitespace
	$card_number = preg_replace('/\s+/', '', $card_number);

	$gift_card = new Eigen_Gift_Card_Helper();
	$gift_card->set_gift_card_number($card_number);

	$balance = 0;
	
	try {
		$balance = $gift_card->get_balance();

		$return = array('status' => 'OK', 'card_number' => $card_number, 'balance' => $balance);
		die(json_encode($return));
	} catch (Exception $e) {
		$return = array('status' => 'err', 'message' => $e->getMessage());
		die(json_encode($return));
	}

}
