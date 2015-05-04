// OpenShift ===================================================================
var url_openshift_mongoDB =
    process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;

module.exports = {
    url: 'mongodb://localhost:27017/mean'
    //url: url_openshift_mongoDB
}
