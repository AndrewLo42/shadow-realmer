require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/hangouts', (req, res, next) => {
  const allHangouts = 'select * from "hangouts"';
  db.query(allHangouts)
    .then(response => {
      const hangoutsResponse = response.rows;
      if (!hangoutsResponse) {
        next(new ClientError(`No hangouts found.${req.method} ${req.originalUrl}`, 404));
      } else {
        res.json(hangoutsResponse);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/hangouts/:hangoutId', (req, res, next) => {
  const parsedHangoutId = parseInt(req.params.hangoutId);
  const hangoutDetails = `select * from "hangouts"
                            where "hangoutId" = $1`;
  const values = [parsedHangoutId];
  if (
    isNaN(req.params.hangoutId) || parsedHangoutId < 0
  ) {
    next(
      new ClientError(
        `The requested hangoutID was not a number ${req.method} ${req.originalUrl}`,
        400
      )
    );
  } else {
    db.query(hangoutDetails, values)
      .then(response => {
        const detailsResponse = response.rows;
        if (!detailsResponse) {
          next(
            new ClientError(
                `No hangouts found.${req.method} ${req.originalUrl}`,
                404
            )
          );
        } else {
          res.json(detailsResponse);
        }
      })
      .catch(err => {
        next(err);
      });
  }
});

app.get('/api/events', (req, res, next) => {
  const allEvents = 'select * from "events"';
  db.query(allEvents)
    .then(response => {
      const eventsResponse = response.rows;
      if (!eventsResponse) {
        next(
          new ClientError(
            `No hangouts found.${req.method} ${req.originalUrl}`,
            404
          )
        );
      } else {
        res.json(eventsResponse);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/hangouts', (req, res, next) => {
  if (!req.body.hangoutName || !req.body.startTime || !req.body.description || !req.body.gameFormat || !req.body.gameId) {
    return next(new ClientError('Missing parameters to create Hangout!!'), 400);
  }
  const createHangout = `
      insert into hangouts ("hangoutName", "hostId", "startTime", "description", "gameFormat", "gameId")
      values($1, $2, $3, $4, $5, $6)
      returning *
    `;
  let hostId = req.body.hostId;
  if (!req.body.hostId) {
    hostId = 0;
  }
  const params = [req.body.hangoutName, hostId, req.body.startTime, req.body.description, req.body.gameFormat, req.body.gameId];
  db.query(createHangout, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
