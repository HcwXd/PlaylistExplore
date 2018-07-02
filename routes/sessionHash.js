class sessionHash{
    constructor(){
        this.table = {};
    }
    addSession(sessionId, token){
        this.table[sessionId] = token;
    }
    deleteSession(sessionId){
        delete(this.table[sessionId]);
    }
}
sessionHash = new sessionHash();
module.exports = sessionHash;
