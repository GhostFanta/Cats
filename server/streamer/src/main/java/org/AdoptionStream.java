package org;

import com.google.common.collect.Lists;
import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Client;
import com.twitter.hbc.core.Constants;
import com.twitter.hbc.core.Hosts;
import com.twitter.hbc.core.HttpHosts;
import com.twitter.hbc.core.endpoint.StatusesFilterEndpoint;
import com.twitter.hbc.core.endpoint.StatusesSampleEndpoint;
import com.twitter.hbc.core.endpoint.StreamingEndpoint;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;

import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import org.apache.kafka.clients.producer.*;
import org.apache.kafka.common.serialization.StringSerializer;

//import lombok.extern.slf4j.Slf4j;

public class AdoptionStream {

    Client tweetClient;
    BlockingQueue<String> msgQueue;

    KafkaProducer<String, String> producer;
    String topic;

    /**
     * Declare the host you want to connect to, the endpoint, and authentication (basic auth or oauth)
     */
    Hosts hosebirdHosts = new HttpHosts(Constants.STREAM_HOST);
    StatusesFilterEndpoint hosebirdEndpoint = new StatusesFilterEndpoint();

    public AdoptionStream(String apiKey, String apiSecret, String token, String secret, String brokerList, List<String> topics) {
        this.hosebirdEndpoint.trackTerms(topics);
        this.msgQueue = new LinkedBlockingQueue<String>(1000);
        this.tweetClient = this.clientBuilder(msgQueue, apiKey, apiSecret, token, secret);
        producer = this.producerBuilder(brokerList);
        this.topic = topics.get(0);
    }


    public void run() {
        tweetClient.connect();
        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            public void run() {
                System.out.println("Finished running the app.");
                tweetClient.stop();
                producer.close();
            }
        }));

        while (!this.tweetClient.isDone()) {
            String msg = null;
            try {
                msg = msgQueue.poll(5, TimeUnit.SECONDS);
//                 msg = msgQueue.take();
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
//                            log.error("Some wrong.", e);
                        }
                    }
                });
            }
        }
    }

    public Client clientBuilder(BlockingQueue<String> msgQueue, String apiKey, String apiSecret, String token, String secret) {
        StreamingEndpoint endpoint = new StatusesSampleEndpoint();
        Authentication hosebirdAuth = new OAuth1(apiKey, apiSecret, token, secret);

        Client builder = new ClientBuilder()
                .hosts(Constants.STREAM_HOST)
                .endpoint(endpoint)
                .authentication(hosebirdAuth)
                .processor(new StringDelimitedProcessor(msgQueue))
                .build();

        return builder;
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
