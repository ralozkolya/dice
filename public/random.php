<?php

require_once('../vendor/autoload.php');

$client = new GuzzleHttp\Client();

$res = $client->request('POST', 'https://api.random.org/json-rpc/1/invoke', [
	'json' => [
		'jsonrpc' => '2.0',
		'id' => 1,
		'method' => 'generateIntegers',
		'params' => [
			'apiKey' => '<key>',
			'n' => 1000,
			'min' => 0,
			'max' => 5
		]
	]
]);

header('Content-type: application/json');

if ($res->getStatusCode() === 200) {
	$body = json_decode((string) $res->getBody());
	echo json_encode($body->result->random->data);
}

/*

{
	"jsonrpc": "2.0",
	"id": 1,
	"method": "generateIntegers",
	"params": {
		"apiKey": "dc3316a6-f358-430b-9e68-62279e86b4aa",
		"n": 1000,
		"min": 1,
		"max": 6
	}
}
*/