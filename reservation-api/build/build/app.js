import createError from 'http-errors';
import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import roomsBooking from './routes/booking';
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/booking', roomsBooking);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
});
var server = app.listen(8081, () => {
    console.log('Ready on port %d', server.address().port);
});
export default app;
