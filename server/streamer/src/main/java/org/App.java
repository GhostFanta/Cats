package org;

import com.google.common.collect.Lists;

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
}
