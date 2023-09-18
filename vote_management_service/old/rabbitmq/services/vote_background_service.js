const dotenv = require('dotenv');
const {rabbitMQ} = require("../rabbitmq.config")
dotenv.config();

async function publishMessageToQueue(kwargs, queueName) {


  const body = {
    ...kwargs
  }

  const options = {
    contentType:'application/json', 
    contentEncoding:'utf-8',
    deliveryMode: 2

  }

  console.log("publishing message to queue " +queueName)
  await rabbitMQ.channel.publish('',queueName, Buffer.from(JSON.stringify(body)), options);

}
  
module.exports = {publishMessageToQueue}