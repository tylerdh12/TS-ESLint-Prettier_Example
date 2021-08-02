const express = require('express');
const morgan = require('morgan');

const port = process.env.PORT || 5000;
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!',
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Not Found',
    });
});

app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
        console.error(err);
    }

    res.status(500).json({
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
