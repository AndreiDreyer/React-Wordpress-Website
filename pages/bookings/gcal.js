import request from 'superagent'

const CALENDAR_ID = 'gb3c9vmjaaptk1f5a8okugd2s8@group.calendar.google.com'
const API_KEY = 'AIzaSyCfj6DsVbhKBHu06vSQIme6UEnhqo1gNBc'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          })
        })
        callback(events)
      }
    })
}