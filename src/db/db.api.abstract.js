'use strict';
/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */

class DBAPI {

    // each method implemented should return a Promise
    initialize() {
        // used to initialize DB connection/connection pool
        /*
            Promise => resolve()           
        */
        throw new TypeError("initialize() method has not been implemented in the database API class");        
    }

    getIndexStats() {
        /*
            Promise => resolve({'stat1':value1, 'stat2':value2, 'stat3':value3}), reject(1) if no such session found
            UID = row ID of session which is unique to every set of session and userID     
        */
        throw new TypeError("getSessionUID() method has not been implemented in the database API class");        
    }

    getSessionUID(userid, session) {
        /*
            Promise => resolve(int UID), reject(1) if no such session found
            UID = row ID of session which is unique to every set of session and userID     
        */
        throw new TypeError("getSessionUID() method has not been implemented in the database API class");        
    }

    updateSession(userid, session) {
        /*
            Promise => resolve()           
        */
        throw new TypeError("updateSession() method has not been implemented in the database API class");        
    
    }

    createSession(userID, session, expiry) {
        /*
            Promise => resolve()       
        */
        throw new TypeError("createSession() method has not been implemented in the database API class");        
    }

    getUserID(name, password) {
        /*
            Promise => resolve(int userID), reject(1) for wrong password
        */
        throw new TypeError("getUserID() method has not been implemented in the database API class");                
    }
    
    getUserSummary(userid) {
        /*
            Promise => resolve({'stat':'value', ...}), reject(1) if user id not found
        */
        throw new TypeError("getUserSummary() method has not been implemented in the database API class");                
    }
    getUserStats(userid) {
        /*
            Promise => resolve({'stat':'value', ...}), reject(1) if user id not found
        */
        throw new TypeError("getUserStats() method has not been implemented in the database API class");                
    }
    getUserVehicles(userid) {
        /*
            Promise => resolve([{'vid':51,'vname':'inferno'}, {'vid':42, ...}, ...]), reject(1) if no vehicle entries
        */
        throw new TypeError("getUserVehicles() method has not been implemented in the database API class");                
    }
    searchUsers(text) {
        /*
            Promise => resolve([{'id':1,'name':'userName','score':1234,'adminLevel':5}, ...]), reject(1) if no user
        */
        throw new TypeError("searchUsers() method has not been implemented in the database API class");                
    }
    getTopList(category) {
        /*
            Promise => resolve([{'name':'userName','val':3, 'id':1}, {'name':'example','val':2, 'id':55} ...]), reject(1) if invalid category
        */
        throw new TypeError("getTopList() method has not been implemented in the database API class");                
    }
    getProperties() {
        /*
            Promise => resolve([{'id:0,'type':'0','x':3.33, 'y':4.11,...}, {'id:0,'type':'0','x':3.33, 'y':4.11,...} ...])
        */
        throw new TypeError("getProperties() method has not been implemented in the database API class");                
    }
    changePassword(uid, newPwd) {
        /*
            Promise => resolve()
        */
        throw new TypeError("changePassword() method has not been implemented in the database API class");               
    }
    deleteSession(uid, session) {
        /*
            Promise => resolve()
        */
        throw new TypeError("deleteSession() method has not been implemented in the database API class");               
    }

}

export default DBAPI;