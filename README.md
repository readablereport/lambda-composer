# Lambda Composer

> Treat AWS lambdas like composable functions

Based on the blog article "[The Dynamic Composer (an AWS serverless pattern)](https://www.jeremydaly.com/the-dynamic-composer-an-aws-serverless-pattern/)"

## Example Usage

```js
const composer = require("labmda-composer");

exports.extractor = async event => {
	// Do some fancy processing...

	// Then merge the event to the function result
	let result = Object.assign(
		{
			article: {
				title: "This an article title",
				created: new Date().toISOString()
			}
		},
		event
	);

	// pass the original event and function result to the composer
	return composer(event, result);
};
```
