


module.exports = (phase) =>{
    const env = {
        SERVER_BASE_URL: process.env.SERVER_BASE_URL
    }
    console.log(`STORAGE_BUCKET_HOSTNAME`, process.env.STORAGE_BUCKET_HOSTNAME)
    console.log(`process.env.ARCHIVE_BUCKET_HOSTNAME`, process.env.ARCHIVE_BUCKET_HOSTNAME)
    return{
        env,
        experimental: {
            outputStandalone: true,
        },
        images:{
            domains: [process.env.STORAGE_BUCKET_HOSTNAME,process.env.ARCHIVE_BUCKET_HOSTNAME,'http://localhost:3000']
        }
    }
}