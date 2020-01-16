const AWS = require("aws-sdk");
const LAMBDA = new AWS.Lambda();

module.exports = async (event, data) => {
    if (Array.isArray(event._compose) && event._compose.length > 0) {
        // grab the next function
        const fn = event._compose.shift();

        // ensure the _compose list is passed
        const payload = { ...data, _compose: event._compose };

        console.log(`Invoking ${fn}`);

        const result = await LAMBDA.invoke({
            FunctionName: fn,
            InvocationType: "Event",
            LogType: "None",
            Payload: Buffer.from(JSON.stringify(payload))
        }).promise();

        return {
            status: result.StatusCode
        };
    } else {
        return data;
    }
};
