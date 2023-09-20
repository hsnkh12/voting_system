const dotenv = require('dotenv');
const amqp = require('amqplib');
const RabbitMQ = require("./src/rabbitmq/rabbitmq.config")
dotenv.config();
const rabbitMQ = new RabbitMQ()
const {submitVote} = require("./src/tasks/votes.task")
const {generateResult} = require("./src/tasks/results.task")

async function bootstrap() {

    await rabbitMQ.connect()

    const queues = rabbitMQ.queues


    console.log("Vote background service is listening on rabbitMQ server")

    await rabbitMQ.channel.consume(queues[0], async (msg) => {

        rabbitMQ.channel.ack(msg)

        try {
            const kwargs =JSON.parse(msg.content) 
            console.log("Message recieved on queue 'submit-vote'.", kwargs)
            await submitVote(kwargs) 

        } catch (err) {
            console.log(err)
        }
        
    })


    await rabbitMQ.channel.consume(queues[1], async (msg) => {
        
        rabbitMQ.channel.ack(msg)

        try {

            const kwargs =JSON.parse(msg.content) 
            await generateResult(kwargs)

        } catch (err) {
            console.log(err)
        }
    })


}


bootstrap().catch(err => {
    console.log(err)
})



process.on('SIGINT', () => {
    console.log('Vote background service is shutting down...');
    rabbitMQ.channel.close()
    rabbitMQ.connection.close()
});