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

public class App
{
    public static void main( String[] args )
    {
        AdoptionStream stream = new AdoptionStream (
                "C4C0PtOq3MLMHXMhdMbIIR68p",
                "NVOKjFSz4WZ4WJU2agBGGXtnaelnp1w6icmMVxAy4KjNHiYihk",
                "1303024541380292609-tNnnxbldjBzJWnbybAWABv642cJEd0",
                "u61UMnyVonVR3o67SHUnpBA8uZOb33ndCSib6SstCFBb6",
                "127.0.0.1:2181",
                Lists.newArrayList("animal adoption","#animaladoption", "#pet", "#cat", "#dog")
        );
        stream.run();
    }

//    public static void main(String[] args)  throws InterruptedException {
//
//        BlockingQueue<String> msgQueue = new LinkedBlockingQueue<String>(1000);
//
//        Hosts hosebirdHosts = new HttpHosts(Constants.STREAM_HOST);
//        StatusesFilterEndpoint hosebirdEndpoint = new StatusesFilterEndpoint();
//        List<String> terms = Lists.newArrayList("animal adoption","#animaladoption","#pet");
//        hosebirdEndpoint.trackTerms(terms);
//
//        Authentication hosebirdAuth  = new OAuth1("18qydWMuiUohwCtQpp1MOFCFr",
//                "YrYhYd09LKZLbhsKT1o4XcEPl6HiAoNykiOxYBq0dAB8t0vRCo",
//                "16972669-KSvyDEMc7dussPfW6a9Ru65L4eWGj637ciHLHZLyn",
//                "ky53NE6cbBvtNLopto7o9gVyHDejSB2kPsRhHGKEd1MrS");
//
//
//        ClientBuilder clientBuilder = new ClientBuilder();
//        clientBuilder.name("bbejeck-hosebird")
//                .hosts(hosebirdHosts)
//                .authentication(hosebirdAuth)
//                .endpoint(hosebirdEndpoint)
//                .processor(new StringDelimitedProcessor(msgQueue));
//
//        Client hosebirdClient = clientBuilder.build();
//        hosebirdClient.connect();
//
//        for (int msgRead = 0; msgRead < 100; msgRead++) {
//            String msg = msgQueue.take();
//            System.out.println(msg);
//        }
//
//        hosebirdClient.stop();
//
//    }
}
