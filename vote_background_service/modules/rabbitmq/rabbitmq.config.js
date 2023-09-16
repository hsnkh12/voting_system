const dotenv = require('dotenv');
const amqp = require('amqplib');
dotenv.config();

class RabbitMQ{

    constructor(){
        this.connection = null 
        this.channel = null 
        this.queues = []
    }

    connect = async () => {
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER_URI);
        this.connection = connection
        this.channel = await connection.createChannel();
        this.queues = ["submit-vote","generate-result"]

        for ( const q of this.queues){
            await this.channel.assertQueue(q, { durable: false });
        }
    }
}



module.exports = RabbitMQ