package org;

import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Client;
import com.twitter.hbc.core.Constants;
import com.twitter.hbc.core.Hosts;
import com.twitter.hbc.core.HttpHosts;
import com.twitter.hbc.core.endpoint.StatusesFilterEndpoint;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;

import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

public class AdoptionStream {

    Client tweetClient;
    BlockingQueue<String> msgQueue;

    KafkaProducer<String, String> producer;
    String topic;

    String apiKey;
    String apiSecret;
    String token;
    String secret;
    List<String> topics;


    public AdoptionStream(String apiKey, String apiSecret, String token, String secret, String brokerList, List<String> topics) {
        this.msgQueue = new LinkedBlockingQueue<String>(1000);
        producer = this.producerBuilder(brokerList);
        this.topic = topics.get(0);
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.token = token;
        this.secret = secret;
        this.topics = topics;
    }


    public void run() {

        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            public void run() {
                System.out.println("Finished running the app.");
                tweetClient.stop();
                producer.close();
            }
        }));

        BlockingQueue<String> msgQueue = new LinkedBlockingQueue<String>(1000);

        Hosts hosebirdHosts = new HttpHosts(Constants.STREAM_HOST);
        StatusesFilterEndpoint hosebirdEndpoint = new StatusesFilterEndpoint();
        List<String> terms = this.topics;
        hosebirdEndpoint.trackTerms(terms);

        Authentication hosebirdAuth  = new OAuth1(this.apiKey,
                this.apiSecret,
                this.token,
                this.secret);


        ClientBuilder clientBuilder = new ClientBuilder();
        clientBuilder.name("tweet-client")
                .hosts(hosebirdHosts)
                .authentication(hosebirdAuth)
                .endpoint(hosebirdEndpoint)
                .processor(new StringDelimitedProcessor(msgQueue));

        Client hosebirdClient = clientBuilder.build();
        hosebirdClient.connect();

        while(!hosebirdClient.isDone()) {
            String msg = null;
            try {
                msg = msgQueue.poll(5, TimeUnit.SECONDS);
                System.out.println(msg);
            } catch (InterruptedException e) {
                e.printStackTrace();
                tweetClient.stop();
            }
            if (msg != null) {
                producer.send(new ProducerRecord<String, String>(topic, null, msg), new Callback() {
                    @Override
                    public void onCompletion(RecordMetadata recordMetadata, Exception e) {
                        if (e != null) {
                            System.out.println(e.toString());
                        }
                    }
                });
            }
        }

        hosebirdClient.stop();
    }

    public KafkaProducer<String, String> producerBuilder(String brokers) {
        Properties properties = new Properties();

        properties.setProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, brokers);
        properties.setProperty(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
        properties.setProperty(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());

        properties.setProperty(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");
        properties.setProperty(ProducerConfig.ACKS_CONFIG, "all");
        properties.setProperty(ProducerConfig.RETRIES_CONFIG, Integer.toString(Integer.MAX_VALUE));
        properties.setProperty(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, "5");

        properties.setProperty(ProducerConfig.COMPRESSION_TYPE_CONFIG, "snappy");
        properties.setProperty(ProducerConfig.LINGER_MS_CONFIG, "20");
        properties.setProperty(ProducerConfig.BATCH_SIZE_CONFIG, Integer.toString(32 * 1024));

        return new KafkaProducer<String, String>(properties);
    }
}
