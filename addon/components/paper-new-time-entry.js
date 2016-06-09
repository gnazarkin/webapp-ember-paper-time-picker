import Ember from 'ember';
import layout from '../templates/components/paper-new-time-entry';
import moment from 'moment';

export default Ember.Component.extend({

    classNames: ['paper-new-time-entry'],
    layout: layout,

    inTimestamp: null,
    outTimestamp: null,

    clockInMeridian: null,
    clockInMinutes: null,
    clockInHours: null,
    clockInDays: null,
    clockInMonths: null,
    clockInYears: null,

    clockOutMeridian: null,
    clockOutMinutes: null,
    clockOutHours: null,
    clockOutDays: null,
    clockOutMonths: null,
    clockOutYears: null,

    init: function()
    {
        this._super();

        var start = moment();
        var end = moment();

        var startOf = start.startOf('day');
        var endOf = end.startOf('day');

        var startTime = startOf.add(9, 'hours');
        var endTime = endOf.add(17, 'hours');

        this.set('inTimestamp', (startTime.unix() * 1000));
        this.set('outTimestamp', (endTime.unix() * 1000));
    },

    initClockInMeridian: Ember.on('init', Ember.observer('inTimestamp', function() {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('A');

        this.set('clockInMeridian', newFormat);
    })),

    observesClockInMeridian: Ember.observer('inTimestamp', function()
    {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('A');

        this.set('clockInMeridian', newFormat);
    }),

    initClockInMinutes: Ember.on('init', Ember.observer('inTimestamp', function() {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('mm');

        this.set('clockInMinutes', newFormat);
    })),

    observesClockInMinutes: Ember.observer('inTimestamp', function()
    {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('mm');

        this.set('clockInMinutes', newFormat);
    }),

    initClockInHours: Ember.on('init', Ember.observer('inTimestamp', function() {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('hh');

        this.set('clockInHours', newFormat);
    })),

    observesClockInHours: Ember.observer('inTimestamp', function()
    {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('hh');

        this.set('clockInHours', newFormat);
    }),

    initClockInDays: Ember.on('init', Ember.observer('inTimestamp', function() {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('DD');

        this.set('clockInDays', newFormat);
     })),

    observesClockInDays: Ember.observer('inTimestamp', function()
    {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('DD');

        this.set('clockInDays', newFormat);
    }),

    initClockInMonths: Ember.on('init', Ember.observer('inTimestamp', function() {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('MM');

        this.set('clockInMonths', newFormat);
    })),

    observesClockInMonths: Ember.observer('inTimestamp', function()
    {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('MM');

        this.set('clockInMonths', newFormat);
    }),

    initClockInYears: Ember.on('init', Ember.observer('inTimestamp', function() {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('YYYY');

        this.set('clockInYears', newFormat);
    })),

    observesClockInYears: Ember.observer('inTimestamp', function()
    {
        var time = this.get('inTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('YYYY');

        this.set('clockInYears', newFormat);
    }),

    initClockOutMeridian: Ember.on('init', Ember.observer('outTimestamp', function() {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('A');

        this.set('clockOutMeridian', newFormat);
    })),

    observesClockOutMeridian: Ember.observer('outTimestamp', function()
    {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('A');

        this.set('clockOutMeridian', newFormat);
    }),

    initClockOutMinutes: Ember.on('init', Ember.observer('outTimestamp', function() {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('mm');

        this.set('clockOutMinutes', newFormat);
    })),

    observesClockOutMinutes: Ember.observer('outTimestamp', function()
    {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('mm');

        this.set('clockOutMinutes', newFormat);
    }),

    initClockOutHours: Ember.on('init', Ember.observer('outTimestamp', function() {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('hh');

        this.set('clockOutHours', newFormat);
    })),

    observesClockOutHours: Ember.observer('outTimestamp', function()
    {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('hh');

        this.set('clockOutHours', newFormat);
    }),

    initClockOutDays: Ember.on('init', Ember.observer('outTimestamp', function() {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('DD');

        this.set('clockOutDays', newFormat);
     })),

    observesClockOutDays: Ember.observer('outTimestamp', function()
    {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('DD');

        this.set('clockOutDays', newFormat);
    }),

    initClockOutMonths: Ember.on('init', Ember.observer('outTimestamp', function() {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('MM');

        this.set('clockOutMonths', newFormat);
    })),

    observesClockOutMonths: Ember.observer('outTimestamp', function()
    {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('MM');

        this.set('clockOutMonths', newFormat);
    }),

    initClockOutYears: Ember.on('init', Ember.observer('outTimestamp', function() {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('YYYY');

        this.set('clockOutYears', newFormat);
    })),

    observesClockOutYears: Ember.observer('outTimestamp', function()
    {
        var time = this.get('outTimestamp');
        var momentObj = moment(time);
        var newFormat = momentObj.format('YYYY');

        this.set('clockOutYears', newFormat);
    }),

    actions: {

        focusInput: function(id)
        {
            Ember.$(id).select();
        },

        focusOutClockMonth: function(timestamp, value)
        {
            var month = (parseInt(this.get(value)) - 1);
            var clockInTimestamp = this.get(timestamp);
            var momentObj = moment(clockInTimestamp);

            if (Ember.isEmpty(month) || Ember.isNone(month) || isNaN(month))
            {
                var currentMonth = momentObj.month();
                var reset = momentObj.month(currentMonth);
                this.set(timestamp, reset);
            }
            else
            {
                var newTime = momentObj.month(month);
                this.set(timestamp, newTime);
            }
        },

        focusOutClockDay: function(timestamp, value)
        {
            var day = (parseInt(this.get(value)));
            var clockInTimestamp = this.get(timestamp);
            var momentObj = moment(clockInTimestamp);

            if (Ember.isEmpty(day) || Ember.isNone(day) || isNaN(day))
            {
                var currentDay = momentObj.date();
                var reset = momentObj.date(currentDay);
                this.set(timestamp, reset);
            }
            else
            {
                var newTime = momentObj.date(day);
                this.set(timestamp, newTime);
            }
        },

        focusOutClockYear: function(timestamp, value)
        {
            var year = (parseInt(this.get(value)));
            var clockInTimestamp = this.get(timestamp);
            var momentObj = moment(clockInTimestamp);

            if (Ember.isEmpty(year) || Ember.isNone(year) || isNaN(year))
            {
                var currentYear = momentObj.year();
                var reset = momentObj.year(currentYear);
                this.set(timestamp, reset);
            }
            else
            {
                var newTime = momentObj.year(year);
                this.set(timestamp, newTime);
            }
        },

        focusOutClockHour: function(timestamp, value, meridian)
        {
            var hour = (parseInt(this.get(value)));
            var clockInTimestamp = this.get(timestamp);
            var momentObj = moment(clockInTimestamp);

            if (Ember.isEmpty(hour) || Ember.isNone(hour) || isNaN(hour))
            {
                var currentHour = momentObj.hour();
                var reset = momentObj.hour(currentHour);
                this.set(timestamp, reset);
            }
            else
            {
                var currentMeridian = this.get(meridian);

                if (currentMeridian === 'AM')
                {
                    var newTime = momentObj.hour(hour);
                    this.set(timestamp, newTime);
                }
                else
                {
                    var newTimePlus = momentObj.hour(hour + 12);
                    this.set(timestamp, newTimePlus);
                }
            }
        },

        focusOutClockMinute: function(timestamp, value)
        {
            var minute = (parseInt(this.get(value)));
            var clockInTimestamp = this.get(timestamp);
            var momentObj = moment(clockInTimestamp);

            if (Ember.isEmpty(minute) || Ember.isNone(minute) || isNaN(minute))
            {
                var currentMinute = momentObj.minute();
                var reset = momentObj.minute(currentMinute);
                this.set(timestamp, reset);
            }
            else
            {
                var newTime = momentObj.minute(minute);
                this.set(timestamp, newTime);
            }
        },

        focusOutClockMeridian: function(timestamp, value)
        {
            var current = this.get(value);
            var time = this.get(timestamp);
            var momentObj = moment(time);
            var reset = momentObj.format('A');
            if (Ember.isEmpty(current) || Ember.isNone(current))
            {
                this.set(value, reset);
            }

            var allowed = ['a', 'A', 'p', 'P', 'am', 'AM', 'pm', 'PM'];

            if (allowed.indexOf(current) >= 0)
            {
                if (current === 'a' || current === 'A' || current === 'am' || current === 'AM')
                {
                    if (reset === 'AM')
                    {
                        this.set(value, reset);
                    }
                    if (reset === 'PM')
                    {
                        momentObj.subtract(12, 'hours');
                        var reverseConversionBack = momentObj.unix() * 1000;
                        this.set(timestamp, reverseConversionBack);
                    }
                }
                else
                {
                    if (reset === 'PM')
                    {
                        this.set(value, reset);
                    }
                    if (reset === 'AM')
                    {
                        momentObj.add(12, 'hours');
                        var reverseConversionBack2 = momentObj.unix() * 1000;
                        this.set(timestamp, reverseConversionBack2);
                    }
                }
            }
            else
            {
                this.set(value, reset);
            }
        },

        keyUpDownHandler: function(timestamp, amount)
        {
            var time = this.get(timestamp);
            var code = event.keyCode || event.which;
            if (code === 38)
            {
                var momentObjUp = moment(time);
                momentObjUp.add(1, amount);
                var reverseConversionUp = momentObjUp.unix() * 1000;
                this.set(timestamp, reverseConversionUp);
            }

            if (code === 40)
            {
                var momentObjDown = moment(time);
                momentObjDown.subtract(1, amount);
                var reverseConversionDown = momentObjDown.unix() * 1000;
                this.set(timestamp, reverseConversionDown);
            }

            var key = event.keyCode || event.which;
            var newkey = String.fromCharCode(key);
            var regex = /[0-9]|\./;

            if( !regex.test(newkey) )
            {
                if (code === 46 || code === 8 || code === 9)
                {
                    return true;
                }
                else
                {
                    event.returnValue = false;
                    if(event.preventDefault)
                    {
                        event.preventDefault();
                    }
                }
            }
        },

        clockInMeridianKeyDown: function()
        {
            var time = this.get('inTimestamp');
            var code = event.keyCode || event.which;
            if (code === 38 || code === 40)
            {
                var current = this.get('clockInMeridian');
                var momentObj = moment(time);
                if (current === 'AM')
                {
                    momentObj.add(12, 'hours');
                    var reverseConversion = momentObj.unix() * 1000;
                    this.set('inTimestamp', reverseConversion);
                }
                else
                {
                    momentObj.subtract(12, 'hours');
                    var reverseConversionBack = momentObj.unix() * 1000;
                    this.set('inTimestamp', reverseConversionBack);
                }
            }
        },

        clockOutMeridianKeyDown: function()
        {
            var time = this.get('outTimestamp');
            var code = event.keyCode || event.which;
            if (code === 38 || code === 40)
            {
                var current = this.get('clockOutMeridian');
                var momentObj = moment(time);
                if (current === 'AM')
                {
                    momentObj.add(12, 'hours');
                    var reverseConversion = momentObj.unix() * 1000;
                    this.set('outTimestamp', reverseConversion);
                }
                else
                {
                    momentObj.subtract(12, 'hours');
                    var reverseConversionBack = momentObj.unix() * 1000;
                    this.set('outTimestamp', reverseConversionBack);
                }
            }
        }
    }
});