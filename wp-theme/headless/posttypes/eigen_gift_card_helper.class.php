<?php
/**
 * Eigen Gift Card Helper Class
 *
 * @author  E. Scott Eastman <scott@idearebel.com>
 * @date    Nov 2013
 * @package Gift Cards
 *
 * Helper class wrapper for communicating with Eigen to retrieve Gift Card balances
 *
 * Built against Eigen's Mirapay Direct v7.3 Development Guide
 */

// Constants

const TEST_TERMINAL_ID = 'EIGEMVC7';
const TEST_MKEY_HASH_PASSWORD = 'VLINKGCDEV';

const PROD_TERMINAL_ID = '711MPDGC1';
const PROD_MKEY_HASH_PASSWORD = 'va7xzaf2fd';

const TEST_EIGEN_URL = 'https://staging.eigendev.com/OFT/EigenOFT_p.php';
const PROD_EIGEN_URL = 'https://ms1.eigendev.com/OFT/EigenOFT_p.php';

// Deployment State Constants

define('DS_DEV', 1);
define('DS_QA', 2);
define('DS_PROD', 3);

// Deployment state defined in external file
@include_once('library/deployment_state.php');

// If we don't have a deployment state, define one
if ( !defined('DEPLOYMENT_STATE') )
	define('DEPLOYMENT_STATE', DS_PROD);


class Eigen_Gift_Card_Helper {

	private $params;

	public function __construct() {

		// set default params
		$this->params = array(
			'MT' => 'Q', // MTQ
			'TI' => (DEPLOYMENT_STATE==DS_PROD)?PROD_TERMINAL_ID:TEST_TERMINAL_ID,
			'TC' => '28', //transaction code, 28 = Gift Card Balance Inquiry
			'A1' => '1', // Amount_1, in cents, must be > 0
			'DT' => date('YmdHis'), // DateTime YYYYMMDDHHMMSS 24hrs
		);

	}

	public function set_gift_card_number($card_number) {

		// make sure it's 16 digits
		if ( !preg_match('/^[0-9]{16}$/', $card_number) )
			return false;

		// Build and set Track2 parameter
		// ValueLink Gift Cards all being with 601056, which is not printed on the actual card
		$this->params['T2'] = 'M' . '601056' . $card_number . '=22220?';

		return true;
	}

	public function get_balance() {

		if ( ! isset($this->params['T2']) )
			throw new Exception('Missing gift card number.');

		if ( DEPLOYMENT_STATE == DS_PROD )
			$url = PROD_EIGEN_URL;
		else
			$url = TEST_EIGEN_URL;

		$url .= '?' . $this->get_param_string();

		$response = $this->get_eigen_response($url);
		// Get the balance, or error
		if ( isset($response['B1']) && is_numeric($response['B1']) )
			$balance = $response['B1'] / 100; // balance is in cents
		else
			throw new Exception($this->get_error_from_code($response['RC']), $response['RC']);

		return $balance;
	}

	private function parse_eigen_response($response) {

		$parse_array = explode(',', $response);

		$response_array = array();
		foreach($parse_array as $value)
			$response_array[substr($value,0, 2)] = substr($value, 2);

		return $response_array;
	}

	private function get_param_string() {

		// Calculate the MKey Hash, HashString = sha1( hashPassword + termID + transCode + amount + dateTime + Track2 )
		$hash_raw = ((DEPLOYMENT_STATE==DS_PROD)?PROD_MKEY_HASH_PASSWORD:TEST_MKEY_HASH_PASSWORD)
			. $this->params['TI']
			. $this->params['TC']
			. $this->params['A1']
			. $this->params['DT']
			. $this->params['T2']
		;
		$this->params['MY'] = sha1($hash_raw);

		$params = array();
		foreach($this->params as $key => $val)
			$params[] = $key . $val;

		return implode(',', $params);
	}

	private function get_eigen_response($url) {
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);

		return $this->parse_eigen_response($response);
	}

	private function get_error_from_code($code) {

		$response_code = array(
			'050' => 'General Decline',
			'051' => 'Expired Card',
			'055' => 'Invalid Trans.',
			'057' => 'Lost or Stolen',
			'058' => 'Inactive Account',
			'074' => 'Unable to Auth',
			'076' => 'Insufficient Funds',
			'100' => 'Unable to Process',
			'101' => 'Unable to Authorize (Issue Call)',
			'105' => 'Card Not Supported',
			'200' => 'Invalid Account Data',
			'204' => 'Over Limit',
			'707' => 'Eigen Timeout',
			'715' => 'Mod 10 Check',
			'716' => 'Expiry Date Fail',
			'765' => 'CVV Mismatch',
			'801' => 'Invalid Data',
			'810' => 'Transaction Timeout',
			'899' => 'Sequence # Error',
			'900' => 'Lost/Stolen/Fraud',
		);

		if ( ! array_key_exists($code, $response_code) )
			return 'Unknown Error ';

		return $response_code[$code];
	}
}

