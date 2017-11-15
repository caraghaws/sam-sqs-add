'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const SQS_QUEUE_URL = '';

exports.handler = (event, context, callback) => {
    
    if (!SQS_QUEUE_URL)
        throw 'No SQS Queue configured';

    SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

    var jsonObject = JSON.stringify(event, null, 2);
    console.log('Event data: ', jsonObject);


    var params = {
        MessageBody: jsonObject,
        QueueUrl: SQS_QUEUE_URL,
        DelaySeconds: 10,
        MessageAttributes: {
            "Payload": {
                DataType: "String",
                StringValue: jsonObject
            }
        },
    };

    sqs.sendMessage(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

};
