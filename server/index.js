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
  if (Object.keys(req.query).length === 0) {
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
      .catch(err => { next(err); });
  } else if (req.query.id) {
    const parsedHangoutId = parseInt(req.query.id);
    const hangoutDetails = `
      select * from "hangouts"
      where "hangoutId" = $1
    `;
    const values = [parsedHangoutId];
    if (isNaN(req.query.id) || parsedHangoutId < 0) {
      return next(new ClientError(`The requested hangoutID was not a number ${req.method} ${req.originalUrl}`, 400));
    }
    db.query(hangoutDetails, values)
      .then(response => {
        const detailsResponse = response.rows[0];
        if (!detailsResponse) {
          return next(new ClientError(`No hangouts found at id ${parsedHangoutId}. ${req.method} ${req.originalUrl}`, 404));
        } else {
          res.json(detailsResponse);
        }
      })
      .catch(err => next(err));
  } else if (req.query.amount) {
    const requestedHangouts = `
      select * from "hangouts"
      limit $1
    `;
    const params = [parseInt(req.query.amount)];
    db.query(requestedHangouts, params)
      .then(response => {
        const hangoutsResponse = response.rows;
        if (!hangoutsResponse) {
          next(new ClientError(`No hangouts found.${req.method} ${req.originalUrl}`, 404));
        } else {
          res.json(hangoutsResponse);
        }
      })
      .catch(err => next(err));
  } else if (req.query.zipcode) {
    const hangoutZipCodes = `
      select * from "hangouts"
      where "zipcode" = $1
    `;
    const params = [parseInt(req.query.zipcode)];
    db.query(hangoutZipCodes, params)
      .then(response => {
        const hangoutsResponse = response.rows;
        if (!hangoutsResponse) {
          next(new ClientError(`No hangouts found. ${req.method} ${req.originalUrl}`, 404));
        } else {
          res.json(hangoutsResponse);
        }
      })
      .catch(err => next(err));
  } else {
    next(new ClientError('Invalid query.', 404));
  }
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

app.delete('/api/hangouts/:hangoutId', (req, res, next) => {
  const parsedHangoutId = parseInt(req.params.hangoutId);
  const hangoutDelete = `delete from "hangouts"
                            where "hangoutId" = $1
                            returning *`;
  const values = [parsedHangoutId];
  if (isNaN(req.params.hangoutId) || parsedHangoutId < 0) {
    next(
      new ClientError(
        `The requested hangoutID was not a number ${req.method} ${req.originalUrl}`,
        400
      )
    );
  } else {
    db.query(hangoutDelete, values)
      .then(response => {
        const deleteResponse = response.rows;
        if (!deleteResponse) {
          next(
            new ClientError(
              `No hangouts found.${req.method} ${req.originalUrl}`,
              404
            )
          );
        } else {
          res.json(deleteResponse);
        }
      })
      .catch(err => {
        next(err);
      });
  }
});

app.delete('/api/events/:eventId', (req, res, next) => {
  const parsedEventId = parseInt(req.params.eventId);
  const eventDelete = `delete from "events"
                            where "eventId" = $1
                            returning *`;
  const values = [parsedEventId];
  if (isNaN(req.params.eventId) || parsedEventId < 0) {
    next(
      new ClientError(
        `The requested hangoutID was not a number ${req.method} ${req.originalUrl}`,
        400
      )
    );
  } else {
    db.query(eventDelete, values)
      .then(response => {
        const deleteResponse = response.rows;
        if (!deleteResponse) {
          next(
            new ClientError(
              `No hangouts found.${req.method} ${req.originalUrl}`,
              404
            )
          );
        } else {
          res.json(deleteResponse);
        }
      })
      .catch(err => {
        next(err);
      });
  }
});

app.get('/api/events', (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    const allEvents = 'select * from "events"';
    db.query(allEvents)
      .then(response => {
        const eventsResponse = response.rows;
        if (!eventsResponse) {
          next(new ClientError(`No Events found. ${req.method} ${req.originalUrl}`, 404));
        } else {
          res.json(eventsResponse);
        }
      })
      .catch(err => { next(err); });
  } else if (req.query.id) {
    const parsedEventId = parseInt(req.query.id);
    const eventDetails = `
      select * from "events"
      where "eventId" = $1
    `;
    const values = [parsedEventId];
    if (isNaN(req.query.id) || parsedEventId < 0) {
      return next(new ClientError(`The requested eventID was not a number. ${req.method} ${req.originalUrl}`, 400));
    }
    db.query(eventDetails, values)
      .then(response => {
        const detailsResponse = response.rows[0];
        if (!detailsResponse) {
          return next(new ClientError(`No event found at id ${parsedEventId}. ${req.method} ${req.originalUrl}`, 404));
        } else {
          res.json(detailsResponse);
        }
      })
      .catch(err => next(err));
  } else if (req.query.amount) {
    const requestedEvents = `
      select * from "events"
      limit $1
    `;
    const params = [parseInt(req.query.amount)];
    db.query(requestedEvents, params)
      .then(response => {
        const eventsResponse = response.rows;
        if (!eventsResponse) {
          next(new ClientError(`No events found.${req.method} ${req.originalUrl}`, 404));
        } else {
          res.json(eventsResponse);
        }
      })
      .catch(err => next(err));
  } else {
    next(new ClientError('Invalid query.', 404));
  }
});

app.post('/api/events', (req, res, next) => {
  if (
    !req.body.eventName ||
    !req.body.startTime ||
    !req.body.description ||
    !req.body.gameFormat ||
    !req.body.gameId
  ) {
    return next(new ClientError('Missing parameters to create event!!'), 400);
  }
  const createEvent = `
      insert into events ("eventName", "storeId", "startTime", "description", "gameFormat", "gameId", "entranceFee")
      values($1, $2, $3, $4, $5, $6, $7)
      returning *
    `;
  let storeId = req.body.storeId;
  if (!req.body.storeId) {
    storeId = 0;
  }
  const params = [
    req.body.eventName,
    storeId,
    req.body.startTime,
    req.body.description,
    req.body.gameFormat,
    req.body.gameId,
    req.body.entranceFee
  ];
  db.query(createEvent, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

function parseTime(month, day, hour, minute, ampm) {
  if (ampm === 'PM') {
    if (hour !== '12') {
      hour = parseInt(hour) + 12;
    }
  } else {
    hour = hour === '12' ? '00' : hour;
  }
  return `2020-${(month)}-${(day)} ${hour}:${(minute)}:00;`;
}

app.post('/api/hangouts', (req, res, next) => {
  if (!req.body.hangoutName || !req.body.description || !req.body.gameFormat || !req.body.gameId || !req.body.zipCode || !req.body.contactInfo) {
    return next(new ClientError('Missing parameters to create Hangout!!', 400));
  }
  const startTime = parseTime(req.body.month, req.body.day, req.body.hour, req.body.minute, req.body.ampm);
  const createHangout = `
      insert into hangouts ("hangoutName", "hostId", "startTime", "description", "gameFormat", "gameId", "zipcode", "contactInfo")
      values($1, $2, $3, $4, $5, $6, $7, $8)
      returning *
    `;
  let hostId = req.body.hostId;
  if (!req.body.hostId) {
    hostId = 0;
  }
  const params = [req.body.hangoutName, hostId, startTime, req.body.description, req.body.gameFormat, req.body.gameId, req.body.zipCode, req.body.contactInfo];
  db.query(createHangout, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/hangoutAttendees', (req, res, next) => {
  if (!req.body.hangoutId) {
    return next(new ClientError('Missing parameters to create Hangout!!', 400));
  }
  let userId = req.body.userId;
  if (!userId) {
    userId = 1;
  }
  const RSVPHangout = `
    insert into "hangoutAttendees" ("userId", "hangoutId")
    values ($1, $2)
    returning *
  `;
  const params = [userId, req.body.hangoutId];
  db.query(RSVPHangout, params)
    .then(result => { res.status(201).json(result.rows[0]); })
    .catch(err => next(err));
});

app.post('/api/eventAttendees', (req, res, next) => {
  const parsedEventAttendees = req.body.eventId;
  const parsedUserId = req.body.userId;
  if (!req.body.eventId) {
    return next(new ClientError('Missing parameters to create Event!!'), 400);
  }
  let userId = req.body.userId;
  if (!userId) {
    userId = 1;
  }
  const RSVPEvent = `
    insert into "eventAttendees" ("userId", "eventId")
    values ($1, $2)
    returning *
  `;
  const params = [parsedUserId, parsedEventAttendees];
  db.query(RSVPEvent, params)
    .then(result => { res.status(201).json(result.rows[0]); })
    .catch(err => next(err));
});

app.get('/api/eventAttendees/:userId', (req, res, next) => {
  const pastAttendanceEvents = `select
                                "e"."gameId",
                                "e"."eventName",
                                "e"."startTime",
                                "e"."gameFormat",
                                "e"."eventId"
                                from"events" as "e"
                                join "eventAttendees" as "ea" using ("eventId")
                                where "e"."startTime" < now()
                                and "ea"."userId" = $1`;
  const params = [req.params.userId];
  // const parsedPastUserId = parseInt(params);
  db.query(pastAttendanceEvents, params)
    .then(result => { res.status(201).json(result.rows); })
    .catch(err => next(err));
});

app.get('/api/stores', (req, res, next) => {
  const allStores = 'select * from "stores"';
  db.query(allStores)
    .then(response => {
      const storesResponse = response.rows;
      if (!storesResponse) {
        next(
          new ClientError(
            `No stores found.${req.method} ${req.originalUrl}`,
            404
          )
        );
      } else {
        res.json(storesResponse);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/stores/:storeId', (req, res, next) => {
  const parsedStoreId = parseInt(req.params.storeId);
  const storeDetails = `select * from "stores"
                            where "storeId" = $1`;
  const values = [parsedStoreId];
  if (isNaN(req.params.storeId) || parsedStoreId < 0) {
    next(
      new ClientError(
        `The requested hangoutID was not a number ${req.method} ${req.originalUrl}`,
        400
      )
    );
  } else {
    db.query(storeDetails, values)
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

app.get('/api/hangoutAttendees/:userId', (req, res, next) => {
  if (!req.params.userId) {
    return next(new ClientError('No userId provided...'), 400);
  }
  const attendedHangouts = `
    select "h".*
    from "hangouts" as "h"
    join "hangoutAttendees" as "a" on "a"."hangoutId" = "h"."hangoutId"
    join "users" as "u" on "u"."userId" = "a"."userId"
    where "a"."userId" = $1
    order by "h"."startTime" desc
  `;
  const params = [parseInt(req.params.userId)];
  db.query(attendedHangouts, params)
    .then(response => {
      const pastHangouts = response.rows;
      if (!pastHangouts) {
        return next(new ClientError(`No Hangouts for user with id ${req.query.userId}`), 204);
      }
      res.status(200).json(pastHangouts);
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
