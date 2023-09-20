const {rabbitMQ} = require("../rabbitmq.server")

module.exports = class VotesPublisher{ 


    async publishMessageToQueue(kwargs, queueName) {

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
    
}
