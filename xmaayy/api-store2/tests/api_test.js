const request = require('request');
const assert = require('assert');

api_route = "mongo"
collection_name = "test_collection"
company_name = "Test_Company"
company_desc = "This is a test description for a mongoDB server to see if it can handle text"

/**
 * Test code for all the different API features
 */
console.log("~ Testing if its up ~")
request.post({url:'http://localhost:8170/xmaayy/api-store/', 
    form: {api_type:api_route}},
    (err,httpResponse,body) => { 
        assert(httpResponse.statusCode == 200)
        console.log("Service response 200, good!");
        console.log("~ Begin Testing Mongo ~")
        create(collection_name,company_name,company_desc);
    })



function create(collection_name, company_name, company_desc){
    //Test creation of table
    mongostring = "collection|create|"+ collection_name
    request.post({url:'http://localhost:8170/xmaayy/api-store/', 
        form: {api_type:api_route,data:mongostring}},
        (err,httpResponse,body) => { 
            assert(httpResponse.statusCode == 200)
            console.log("Created Test Collection")
            insert(collection_name, company_name, company_desc)
        })
}

function insert(collection_name, company_name, company_desc){
    //Test Inserting to table
    mongostring = "insert|"+ collection_name + "|" + company_name + "|" + company_desc +"|9"
    request.post({url:'http://localhost:8170/xmaayy/api-store/', 
        form: {api_type:api_route,data:mongostring}},
        (err,httpResponse,body) => { 
            assert(httpResponse.statusCode == 200)     
            findall(collection_name) 
        })
    
}

function findall(collection_name){
    //See if we can find all the elements we've added so far
    mongostring = "findall|"+collection_name
    request.post({url:'http://localhost:8170/xmaayy/api-store/', 
    form: {api_type:api_route,data:mongostring}},
    (err,httpResponse,body) => { 
        assert(httpResponse.statusCode == 200)
        drop(collection_name)
    })
}

function drop(collection_name){
    //Drop the collection
    mongostring = "collection|drop|" + collection_name
    request.post({url:'http://localhost:8170/xmaayy/api-store/', 
    form: {api_type:api_route,data:mongostring}},
    (err,httpResponse,body) => { 
        assert(httpResponse.statusCode == 200) 
        console.log("Collection Dropped. Tests Passed")   
        console.log("Search Function Should be Operational")
    })
}
