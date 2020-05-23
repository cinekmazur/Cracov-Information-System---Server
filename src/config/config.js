// required environment variables
['NODE_ENV', 'PORT'].forEach((name) => {
    if (!process.env[name]) {
        throw new Error(`Environment variable ${name} is missing`)
    }
});

export default {
    env: process.env.NODE_ENV,
    server: {
        port: Number(process.env.PORT)
    }
};


//kill the zombie proccess

// C:\Windows\system32>netstat -aon | findstr 8080
//   TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       3352
//   TCP    [::]:8080              [::]:0                 LISTENING       3352

// C:\Windows\system32>taskkill /f /pid 3352
// SUCCESS: The process with PID 3352 has been terminated.