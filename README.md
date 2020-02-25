# Grow Your List

## What is Grow Your List?

Grow Your List is an open-source mailing list on AWS in alpha stage. It comes with:

* An API: integrate the mailing list into your software/website.
* Broadcast emails: send emails to all subscribers or subscribers that match
criteria.
* Autoresponders: automatically decide actions to take based on subscribers'
interactions with emails.
* Analytics: see the click and open rates for your emails.

Import to note: at this stage, you need need to build your own user interface
for things like sign-up forms and email templates. Grow Your List just provides
a cost-effective way to run the 'behind-the-scenes' part of a mailing list
using AWS.

## Setup

### Automated deployment on AWS

To get started with Grow Your List, ensure you have Node.JS installed (the
deployment process is tested with version Node.JS 12), have an 
AWS access key for an admin account at the ready then run the command:

```
npx growyourlist setup
```

This will take you through the GYL setup. Have ready:

* An access id and a secret access key for a user with admin permissions
([see AWS Docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html))
* An email address you would like to use as the default 'from' address in emails sent by the Grow Your List mailing list (you must have access to its inbox to verify it)
* An email address you would like to use to receive admin emails (also requires verification)

Once that is complete, take note of the output! It has:
* a .pem key and a hostname which can be used to connect to an EC2 instance
processing your mailing list queue.
* an api url and api auth key. Keep these safe, they can be used to control
your GYL mailing list system.

🟦 Note: when using SES for the first time, it is in sandbox mode. This means
that emails sent to emails that have not been validated in advance will fail.
This makes it relatively safe to test out GYL for the first time. Test emails
can be [validated 
here](https://console.aws.amazon.com/ses/home#verified-senders-email:).

When you are ready to move into production mode, follow these steps to [move
out of sandbox mode](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html).

### Creating your first emails

1. Open up [admin.growyourlist.com](https://admin.growyourlist.com/) and log in
using the api url and api key obtained upon AWS deployment completion.
1. Click 'Emails' and start creating emails to send to your subscribers.
1. Once you have emails, you can set up autoresponders as well or move on to
the next section to start subscribing people to your list.

### Integrating Grow Your List with your software/website

To subscribe a subscriber:

```php
// This is the key and url obtained after running the setup process.
$Gyl = new GylApi($apiKey, $apiUrl);

try {
	$Gyl->postSubscriber([

		// The email of the subscriber
		'email' => 'test@example.com',

		// Any tags that apply to the subscriber. Use a list-* tag as standard
		// practice to assign the subscriber to a list.
		'tags' => 'list-default',

		// Assign custom properties relevant to your software.
		'customProp' => 'custom prop value'
	]);
}
catch (Exception $ex) {
	// Handle exceptions here. If there is bad data (e.g. invalid email), that
	// will fail here as well as errors when talking to the API.
}
```

To subscribe a subscriber and simultaneously trigger an autoresponder:

```php
$Gyl = new GylApi($apiKey, $apiUrl);

try {
	$Gyl->postSubscriber(
		[
			'email' => 'test@example.com',
			'tags' => 'list-default'
		],
		// Add trigger in options parameter
		[
			'trigger' => [

				// Set the type of the trigger to autoresponder
				'type' => 'autoresponder',

				// Specify the id of the autoresponder to be run
				'triggerId' => 'TestAutoresponder'
			]
		]
	);
}
catch (Exception $ex) {
	// ...
}
```

To update a subscriber:

```php
	// If a subscriber already exists, and the same email is posted, the values
	// will be merged together. For example, if the subscriber:
	// {email:'test@example.com', customProp1:'value 1'}
	// is already in the GYL database and the following is run:
	$Gyl->postSubscriber(
		[
			'email' => 'test@example.com',
			'customProp2' => 'value 2'
		]
	);
	// The subscriber in the database will be updated to:
	// {email:'test@example.com', customProp1:'value 1', customProp2: 'value 2'}
```

🟦 Note: if an existing subscriber is posted with the autoresponder trigger but
already has all of the tags specified in the `tags` property, then the
autoresponder will not be run. This can be used to prevents autoresponders
running multiple times for the same subscriber; by using a 
`welcome-autoresponder` tag, for example.

## Removing Grow Your List from your AWS account

To remove Grow Your List from your AWS account run the command:
```
npx growyourlist destruct
```
WARNING: This will remove all the Grow Your List data and functionality. There
is no going back once you run this command.
