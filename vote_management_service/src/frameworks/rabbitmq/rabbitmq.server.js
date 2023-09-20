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

    }
}

const rabbitMQ = new RabbitMQ()

const connectToBroker = async () => {

    await rabbitMQ.connect()

}  



module.exports.connectToBroker =connectToBroker 
module.exports.rabbitMQ = rabbitMQ