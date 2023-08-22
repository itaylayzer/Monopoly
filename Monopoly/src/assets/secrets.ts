import dotenv from "dotenv";

export  function env(){
    dotenv.config();
    return JSON.parse(process.env.SECRETS_JSON as string) as {
        "firebase":{
            "apiKey": string
            "authDomain": string,
            "projectId": string,
            "storageBucket": string,
            "messagingSenderId": string,
            "appId": string,
            "measurementId": string
        },
        "JSONBin":{
            "url":string,
            "masterKey":string,
            "accessKey":string
        }
    };
}