'use strict';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var SQS_QUEUE_URL = '';

exports.handler = (event, context, callback) => {

    SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;
    console.log('SQS queue url: ', SQS_QUEUE_URL);

    if (!SQS_QUEUE_URL)
        throw 'No SQS Queue configured';


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
