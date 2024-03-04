require('dotenv').config()
const ics = require('ics')
const nodemailer = require('nodemailer')

let smtp = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "info@pushableapp.com",
        pass: process.env.GMAIL_APP_PASSWORD
        // pass: "VYIM0MentUm23!"
    }
});
let pushableEmail = 'info@pushableapp.com'

// let VCAL_REQUEST_CONTENT = 'BEGIN:VCALENDAR\r\nPRODID:-//ACME/DesktopCalendar//EN\r\nMETHOD:REQUEST\r\n...';

let sendInvite = (data) => {

    let fromEmail = data.fromEmail
    let fromName = data.fromName
    let toEmail = data.toEmail
    let toName = data.toName
    let start = data.start
    let duration = data.duration
    let title = data.title
    let description = data.description
    let emailSubjectForHost = data.emailSubjectForHost
    let emailSubjectForInvitee = data.emailSubjectForInvitee

    let attendee = { email: toEmail, rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' }
    if (toName) { attendee.name = toName}

    const event = {
        start, // [2021, 5, 22, 6, 30]
        startInputType: 'utc',
        duration, // { hours: 18, minutes: 30 }
        title,
        description,
        // location: '',
        // url: ``,
        // geo: { lat: 40.0095, lon: 105.2669 },
        // categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: fromName, email: fromEmail },
        attendees: [
            attendee
            // { name: 'Vladimir Baranov', email: 'Vladimir@lowerprofile.com', dir: 'https://linkedin.ca/in/vladbar', role: 'OPT-PARTICIPANT' }
        ]
    }

    const event2 = {
        start: [2021, 5, 22, 6, 30],
        duration: { hours: 18, minutes: 30 },
        title: 'Get a beer',
        description: 'Getting a beer together',
        location: 'Super Pub, Yonge Street',
        url: `http://www.superpub.com/`,
        // geo: { lat: 40.0095, lon: 105.2669 },
        // categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'Vladimir Baranov', email: 'vbaranov@tipasoft.com' },
        attendees: [
            { name: 'Vlad', email: 'vlad@arrayofstars.com', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
            // { name: 'Vladimir Baranov', email: 'Vladimir@lowerprofile.com', dir: 'https://linkedin.ca/in/vladbar', role: 'OPT-PARTICIPANT' }
        ]
    }

    ics.createEvent(event, (error, value) => {
        if (error) {
            console.log('*error*', error)
            return
        }
        console.log('created event', value)
        // send to host
        var mailOptions = {
            from: pushableEmail, // sender address
            to: fromEmail, // list of receivers
            subject: emailSubjectForHost, // Subject line
            html: `<p></p>`,// plain text body
            icalEvent: {
                filename: 'invitation.ics',
                method: 'request',
                content: value
            }
        }
        // send to invitee
        var mailOptionsB = {
            from: pushableEmail, // sender address
            to: toEmail, // list of receivers
            subject: emailSubjectForInvitee, // Subject line
            html: `<p></p>`,// plain text body
            icalEvent: {
                filename: 'invitation.ics',
                method: 'request',
                content: value
            }
        }

        smtp.sendMail(mailOptions, function (err, info) {
           if (err) {
             console.log('err1', err)
           } else {
             console.log('info1', info);
           }
        });

        smtp.sendMail(mailOptionsB, function (err, info) {
           if (err) {
             console.log('err2', err)
           } else {
             console.log('info2', info);
           }
        });

    })
}

exports.sendInvite = sendInvite