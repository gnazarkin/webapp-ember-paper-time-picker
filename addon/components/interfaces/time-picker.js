/**
 * @module Components
 *
 */
import Ember from 'ember';
import layout from '../../templates/components/interfaces/time-picker';
import Snap from 'snap-svg';
import moment from 'moment';
import TimePicker from 'ember-paper-time-picker/utils/time-picker';
import SnapUtils from 'ember-paper-time-picker/utils/snap-utils';

/**
 * `Component/TimePicker`
 *
 * @class TimePicker
 * @namespace Components
 * @extends Ember.Component
 */
export default Ember.Component.extend(
{
    /**
     * @private
     * @property classNames
     * @type String
     * @default time-picker
     */
    classNames: ['time-picker'],
    layout: layout,

    /**
     * timestamp that is passed in when using date picker
     *
     * @private
     * @property timestamp
     * @type Number
     */
    timestamp: null,

    /**
     * can be passed in so a date before the minDate cannot be selected
     *
     * @private
     * @property minDate
     * @type Number
     * @optional
     */
    minDate: null,

    /**
     * can be passed in so a date after the maxDate cannot be selected
     *
     * @private
     * @property maxDate
     * @type Number
     * @optional
     */
    maxDate: null,

    /**
     * group of snap svg elements
     *
     * @private
     * @property lastGroup
     * @type Object
     */
    lastGroup: null,

    /**
     * last active minute
     *
     * @private
     * @property lastMinute
     * @type String
     */
    lastMinute: null,

    /**
     * element id for text portion of last active hour
     *
     * @private
     * @property lastHourText
     * @type String
     */
    lastHourText: null,

    /**
     * element id for line portion of last active hour
     *
     * @private
     * @property lastHourLine
     * @type String
     */
    lastHourLine: null,

    /**
     * element id for circle portion of last active hour
     *
     * @private
     * @property lastHourCircle
     * @type String
     */
    lastHourCircle: null,

    /**
     * element id for text portion of last active minute
     *
     * @private
     * @property lastMinuteText
     * @type String
     */
    lastMinuteText: null,

    /**
     * element id for line portion of last active minute
     *
     * @private
     * @property lastMinuteLine
     * @type String
     */
    lastMinuteLine: null,

    /**
     * element id for circle portion of last active minute
     *
     * @private
     * @property lastMinuteCircle
     * @type String
     */
    lastMinuteCircle: null,

    /**
     * current hour of timestamp displayed in clock header
     *
     * @private
     * @property hours
     * @type String
     */
    hours: null,

    /**
     * current minute of timestamp displayed in clock header
     *
     * @private
     * @property minutes
     * @type String
     */
    minutes: null,

    /**
     * current date of timestamp displayed in clock footer
     *
     * @private
     * @property currentDate
     * @type String
     */
    currentDate: null,

    /**
     * hides and shows the correct elements once the svgs are inserted
     *
     * @private
     * @method didInsertElement
     * @constructor
     */
    didInsertElement: function()
    {
        this._super();

        this.removeInitialHours();
        this.removeInitialMinutes();

        if(TimePicker.timeIsAm(this.get('timestamp')))
        {
            Ember.$('.am-button').addClass('am-active');
            Ember.$('.pm-button').addClass('pm-inactive');
        }
        else
        {
            Ember.$('.pm-button').addClass('pm-active');
            Ember.$('.am-button').addClass('am-inactive');
        }
    },

    /**
     * initially sets the clocks based on the passed time
     *
     * @private
     * @method setUpClock
     */
    setUpClock: Ember.on('init', Ember.observer('timestamp', function()
    {
        if(!Ember.isNone(this.get('timestamp')))
        {
            let currentHour = TimePicker.formatHourHeader(TimePicker.currentHour(this.get('timestamp')));
            let currentMinute = TimePicker.currentMinute(this.get('timestamp'));
            let currentDate = TimePicker.currentDateFormat(this.get('timestamp'));

            this.set('hours', currentHour);
            this.set('minutes', currentMinute);
            this.set('currentDate', currentDate);
        }
    })),

    /**
     * formats date in bottom left corner
     *
     * @private
     * @method clickableDate
     */
    clickableDate: Ember.observer('timestamp', function()
    {
        let timestamp = moment(this.get('timestamp'));
        let format = timestamp.format('MMM DD, YYYY');

        this.set('currentDate', format);
    }),

    /**
     * applies and removes correct classes to AM PM buttons
     *
     * @private
     * @method observesAmPm
     */
    observesAmPm: Ember.observer('timestamp', function()
    {
        if(TimePicker.timeIsAm(this.get('timestamp')))
        {
            Ember.$('.am-button').removeClass('am-inactive');
            Ember.$('.am-button').addClass('am-active');

            Ember.$('.pm-button').removeClass('pm-active');
            Ember.$('.pm-button').addClass('pm-inactive');
        }
        else
        {
            Ember.$('.pm-button').removeClass('pm-inactive');
            Ember.$('.pm-button').addClass('pm-active');

            Ember.$('.am-button').addClass('am-inactive');
            Ember.$('.am-button').removeClass('am-active');
        }
    }),

    /**
     * checks for min/max dates and calls setHourDisabled()
     *
     * @private
     * @method minMaxHourHandler
     */
    minMaxHourHandler: Ember.observer('timestamp', function()
    {
        let maxDate = this.get('maxDate');
        let minDate = this.get('minDate');

        if(!Ember.isNone(minDate) || !Ember.isNone(maxDate))
        {
            if (TimePicker.timeIsAm(this.get('timestamp')))
            {
                let amHours = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
                this.setHourDisabled(amHours, 'AM');
            }
            else
            {
                let pmHours = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
                this.setHourDisabled(pmHours, 'PM');
            }
        }
    }),

    /**
     * makes hours disabled if they are exceeding min/max dates
     *
     * @private
     * @method setHourDisabled
     * @param list {array} list of hours in given meridian
     * @param AmPm {string} AM or PM
     */
    setHourDisabled: function(list, AmPm)
    {
        let clock = new Snap('#clocks-hour-svg');
        let maxDate = this.get('maxDate');
        let minDate = this.get('minDate');
        let timestamp = moment(this.get('timestamp'));

        list.forEach(function(hour)
        {
          let clockHour = null;

          if (AmPm === 'AM')
          {
              clockHour = TimePicker.formatHourStrings(hour);
          }
          else
          {
              clockHour = TimePicker.formatMinuteStrings((parseInt(hour) - 12));
          }

          clock.select('#hour' + clockHour).removeClass('disabled-hour');

          let newHour = timestamp.hour(hour);

          if (!Ember.isNone(minDate) || !Ember.isNone(maxDate))
          {
            if (!(!newHour.isBefore(moment(minDate)) && !newHour.isAfter(moment(maxDate))))
            {
              clock.select('#hour' + clockHour).addClass('disabled-hour');
            }
          }
        });
    },

    /**
     * checks for min/max dates and calls setMinuteDisabled()
     *
     * @private
     * @method minMaxMinuteHandler
     */
    minMaxMinuteHandler: Ember.observer('timestamp', function()
    {
        let _this = this;
        let clock = new Snap('#clock-minutes-svg');

        let maxDate = moment(this.get('maxDate'));
        let minDate = moment(this.get('minDate'));
        let timestamp = moment(this.get('timestamp'));

        if (!Ember.isNone(maxDate) || !Ember.isNone(minDate))
        {
            let allMinutes = [];

            for (let i = 0; i < 60; i++) {
                i = ('0' + i).slice(-2);
                allMinutes.push(i);
            }
            allMinutes.forEach(function(minute)
            {
                let item = TimePicker.formatMinuteStrings(minute);

                clock.select('#sectionMin' + item).removeClass('disabled-minute');

                if (!Ember.isNone(clock.select('#minText' + item)))
                {
                    clock.select('#minText' + item).removeClass('disabled-minute');
                }

                let newMinute = timestamp.minute(minute);
                _this.setMinuteDisabled(item, newMinute);
            });
        }
    }),

    /**
     * makes minutes disabled if they are exceeding min/max dates
     *
     * @private
     * @method setMinuteDisabled
     * @param oldMinute {string} minute to be tested
     * @param newMinute {string} minute from the timestamp
     */
    setMinuteDisabled: function(oldMinute, newMinute)
    {
      const clock = new Snap('#clock-minutes-svg');
      const maxDate = this.get('maxDate');
      const minDate = this.get('minDate');

      if (!Ember.isNone(minDate) || !Ember.isNone(maxDate))
      {
        if (!(newMinute.isBefore(moment(minDate)) !== true && newMinute.isAfter(moment(maxDate)) !== true))
        {
          if (!Ember.isNone(clock.select('#minText' + oldMinute)))
          {
            clock.select('#minText' + oldMinute).addClass('disabled-minute');
          }
          clock.select('#sectionMin' + oldMinute).addClass('disabled-section');
        }
      }
    },

    /**
     * remove initial circles and lines for hours clock
     *
     * @private
     * @method removeInitialHours
     */
    removeInitialHours: function()
    {
        let allHours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
        allHours.forEach(function(item)
        {
            SnapUtils.removeHour(item);
        });

        this.removeLastActiveHour(TimePicker.currentHour(this.get('timestamp')));
        this.minMaxHourHandler();
    },

    /**
     * remove initial circles and lines for minutes clock
     *
     * @private
     * @method removeInitialMinutes
     */
    removeInitialMinutes: function()
    {
        let allMinutes = [];
        for (let i = 0; i < 60; i++) {
            i = ('0' + i).slice(-2);
            allMinutes.push(i);
        }

        allMinutes.forEach(function(item)
        {
          SnapUtils.removeMinute(item);
        });

        this.removeLastActiveMinute(TimePicker.currentMinute(this.get('timestamp')));
        this.minMaxMinuteHandler();
    },

    /**
     * keeps the clock hands up to date with the current timestamp
     *
     * @private
     * @method updateClockHands
     */
    updateClockHands: Ember.observer('timestamp', function()
    {
      this.removeLastActiveMinute(TimePicker.formatMinuteStrings(TimePicker.currentMinute(this.get('timestamp'))));
      this.removeLastActiveHour(TimePicker.formatHourStrings(TimePicker.currentHour(this.get('timestamp'))));
    }),

    /**
     * removes the last active hour and displays the now active one
     *
     * @private
     * @method removeLastActiveHour
     * @param hour {string} new active hour
     */
    removeLastActiveHour: function(hour)
    {
        let strings = TimePicker.hourStrings(hour);

        if (!Ember.isNone(this.get('lastHourText')) || !Ember.isNone(this.get('lastHourLine')) || !Ember.isNone(this.get('lastHourCircle')))
        {
            let hour = TimePicker.formatHourStrings(this.get('lastHourText'));
            SnapUtils.removeHour(hour);
        }

        SnapUtils.hourTextActivate(hour);

        this.set('lastHourText', strings.text);
        this.set('lastHourLine', strings.line);
        this.set('lastHourCircle', strings.circle);
        this.newDrag(hour);
    },

    /**
     * sets the new minute to active, as well as making the last minute not active
     *
     * @private
     * @method removeLastActiveMinute
     * @param minute {string} new active minute
     */
    removeLastActiveMinute: function(minute)
    {
        let strings = TimePicker.minuteStrings(minute);

        if (!Ember.isNone(this.get('lastMinuteText')) || !Ember.isNone(this.get('lastMinuteLine')) || !Ember.isNone(this.get('lastMinuteCircle')))
        {
            let sliceOld = TimePicker.formatMinuteStrings(this.get('lastMinuteText'));
            SnapUtils.removeMinute(sliceOld);
        }

        if (TimePicker.minuteModFive(TimePicker.formatMinuteStrings(minute)))
        {
            SnapUtils.minuteTextActivate(TimePicker.formatMinuteStrings(minute));
        }
        else
        {
            SnapUtils.minuteSectionActivate(TimePicker.formatMinuteStrings(minute));
        }

        this.set('lastMinuteText', strings.text);
        this.set('lastMinuteLine', strings.line);
        this.set('lastMinuteCircle', strings.circle);

        this.minutesDrag(minute);
    },

    /**
   * TODO: This is another good unit test function
   *
     * converts moment object to a unix timestamp, and sets that to the global timestamp
     *
     * @private
     * @method convertToTimestamp
     * @param momentObject {object} moment object that will be the new timestamp
     */
    convertToTimestamp: function(momentObject)
    {
        let reverse = momentObject.unix() * 1000;
        this.set('timestamp', reverse);
    },

    /**
   * TODO: This is another good unit test function
   *
     * sets the correct hour based on the rotated degrees on the hour drag
     *
     * @private
     * @method getHourByDegree
     * @param offset {number} difference of point 1 to point 2 on 360 degree axis
     * @param degree {number} degree from point 1 to point 2
     */
    getHourByDegree: function(offset, degree)
    {
        let hour = (((offset / 30) + (Math.round(degree / 30))) % 12);
        let formatHour = TimePicker.formatHourStrings(hour);

        if (this.hourOverMaxMin(formatHour))
        {
            this.removeLastActiveHour(formatHour);
        }
        else
        {
            this.removeLastActiveHour(TimePicker.formatMinuteStrings(this.get('lastHourText')));
        }
    },

    /**
   * TODO: This is another good unit test function
   *
     * sets the correct minute based on the rotated degrees on the minute drag
     *
     * @private
     * @method getMinuteByDegree
     * @param offset {number} difference of point 1 to point 2 on 360 degree axis
     * @param degree {number} degree from point 1 to point 2
     */
    getMinuteByDegree: function(offset, degree)
    {
        let minute = (((offset / 6) + (Math.round(degree / 6))) % 60);
        let formatMinute = TimePicker.formatMinuteStrings(minute);
        let formatOldMinute = TimePicker.formatMinuteStrings(this.get('lastMinuteText'));

        if (this.minuteOverMaxMin(formatMinute))
        {
            this.setMinuteToTimestamp(minute);
            SnapUtils.minuteSectionActivate(formatMinute);
            this.removeLastActiveMinute(formatMinute);
        }
        else
        {

            this.removeLastActiveMinute(formatOldMinute);
        }
    },

    /**
   * TODO: This is another good unit test function
   *
     * returns false if the minute exceeds min or max date
     *
     * @private
     * @method minuteOverMaxMin
     * @param minute {number} minute to check if exceeding min/max dates
     * @return {boolean} returns true if the hour exceeds min or max date
     */
    minuteOverMaxMin: function(minute)
    {
        let time = moment(this.get('timestamp'));
        let setMin = time.minute(parseInt(minute));

        let maxDate = this.get('maxDate');
        let minDate = this.get('minDate');

        if (!Ember.isNone(minDate) || !Ember.isNone(maxDate))
        {
            if (Ember.isNone(minDate) && !Ember.isNone(maxDate))
            {
                return !setMin.isAfter(maxDate);
            }

            if (!Ember.isNone(minDate) && Ember.isNone(maxDate))
            {
                return !setMin.isBefore(minDate);
            }

            if (!Ember.isNone(minDate) && !Ember.isNone(maxDate))
            {
                return setMin.isBetween(minDate, maxDate);
            }
        }
        else
        {
            return true;
        }
    },

    /**
   * TODO: This is another good unit test function
   *
     * returns false if the hour exceeds min or max date
     *
     * @private
     * @method hourOverMaxMin
     * @param hour {number} hour to check if exceeding min/max dates
     * @return {boolean} returns true if the hour exceeds min or max date
     */
    hourOverMaxMin: function(hour)
    {
        let timeAm = moment(this.get('timestamp'));
        let setAm = timeAm.hour(parseInt(hour));

        let timePm = moment(this.get('timestamp'));
        let setPm = timePm.hour(parseInt(hour) + 12);

        let maxDate = this.get('maxDate');
        let minDate = this.get('minDate');

        if (!Ember.isNone(minDate) || !Ember.isNone(maxDate))
        {
            if (TimePicker.timeIsAm(this.get('timestamp')))
            {
                if (Ember.isNone(minDate) && !Ember.isNone(maxDate))
                {
                    return !setAm.isAfter(maxDate);
                }

                if (!Ember.isNone(minDate) && Ember.isNone(maxDate))
                {
                    return !setAm.isBefore(minDate);
                }

                if (!Ember.isNone(minDate) && !Ember.isNone(maxDate))
                {
                    return setAm.isBetween(minDate, maxDate);
                }
            }
            else
            {
                if (Ember.isNone(minDate) && !Ember.isNone(maxDate))
                {
                    return !setPm.isAfter(maxDate);
                }

                if (!Ember.isNone(minDate) && Ember.isNone(maxDate))
                {
                    return !setPm.isBefore(minDate);
                }

                if (!Ember.isNone(minDate) && !Ember.isNone(maxDate))
                {
                    return setPm.isBetween(minDate, maxDate);
                }
            }
        }
        else
        {
            return true;
        }
    },

    /**
   * TODO: This is another good unit test function
   *
     * sets the timestamp to be the passed minute
     *
     * @private
     * @method setMinuteToTimestamp
     * @param minute {number} minute to be set to timestamp
     */
    setMinuteToTimestamp: function(minute)
    {
      Ember.assert("setMinuteToTimestamp param must be an integer", typeof minute === 'number');

      let time = this.get('timestamp');
      let momentObj = moment(time);
      let newTime = momentObj.minutes(minute);
      let reverseConversion = newTime.unix() * 1000;

      this.set('timestamp', reverseConversion);
    },

    /**
   * TODO: This is doing a lot see if you can take some of this functionality
   * out and move it to some kind of utils methods.
   * Also this needs to be unit tested.
   *
   *
     * handles all the function events for dragging on the hours clock
     * newDrag must contain start, move and stop functions within it
     *
     * @private
     * @method newDrag
     * @param hour {string} hour thats being dragged
     * @event newDrag
     */
    newDrag: function(hour)
    {
        let _this = this;
        let clock = new Snap('#clocks-hour-svg');
        let strings = TimePicker.hourStrings(hour);

        let curHour = clock.select('#' + strings.text);
        let currentAngle = null;
        let newHour = null;

        let center_x = 104.75;
        let center_y = 105;

        /**
         * allows for the hours group to start being dragged
         */
        let start = function() {
            this.data('origTransform', this.transform().local );
            curHour.remove();
            curHour.appendTo(clock);
            curHour.removeClass('interiorWhite');
        };

        /**
         * moves the dial on the hour clock while transforming group
         */
        let move = function(dx,dy,x,y) {

            let center_point = Ember.$('#centerPointHour');
            let coordinates = center_point[0].getBoundingClientRect();

            let endX = x - (coordinates.left + 3);
            let endY = -(y - (coordinates.top - 3));
            let startX = endX - dx;
            let startY = endY + dy;

            let angle = TimePicker.angle(endX, endY, startX, startY);

            let slope = (startY/startX);
            let isForward = endY < (slope*endX);

            let last2 = parseInt(TimePicker.formatHourStrings(strings.text));

            if (last2 <= 6 || last2 === 12)
            {
                angle = isForward ? angle : -angle;
            }
            else
            {
                angle = isForward ? -angle : angle;
            }

            this.attr({
                transform: ('r' + angle + ', ' + center_x + ',' + center_y)
            });

            let lastHour = _this.get('lastHourCircle');
            let actualHour = parseInt(lastHour.slice(-2));
            currentAngle = actualHour * 30;

            let anglePositive = angle > 0;
            let over180 = 180 + Math.abs((180 - Math.abs(angle)));

            newHour = anglePositive ? angle : over180;

        };

        /**
         * checks to see where the dragging stops and makes the closest hour active
         */
        let stop = function() {
            _this.getHourByDegree(currentAngle, newHour);
        };

        _this.postDragHours(strings.text);

        if (!Ember.isNone(this.get('lastGroup')))
        {
            let undragPrevious = this.get('lastGroup');
            undragPrevious.undrag();
        }

        let curHours = clock.select('#' + strings.text);
        let curLine = clock.select('#' + strings.line);
        let curCircle = clock.select('#' + strings.circle);
        let curGroup = clock.g(curLine, curCircle, curHours);

        curGroup.drag(move, start, stop);
        this.set('lastGroup', curGroup);
    },

    /**
     * sets the dragged hour to the global timestamp
     *
     * @private
     * @method postDragHours
     * @param hour {string} hour to be set to timestamp
     * @event postDragHours
     */
    postDragHours(hour)
    {
      if (parseInt(TimePicker.currentHour(this.get('timestamp'))) !== TimePicker.stringToSlicedInteger(hour))
      {
        let timestamp = moment(this.get('timestamp'));
        let setHour = null;

        if (TimePicker.timeIsAm(this.get('timestamp')))
        {
          setHour = timestamp.hour(TimePicker.stringToSlicedInteger(hour));
          this.convertToTimestamp(setHour);
        }
        else
        {
          setHour = timestamp.hour(TimePicker.stringToSlicedInteger(hour) + 12);
          this.convertToTimestamp(setHour);
        }
      }
    },

    /**
     * handles all the function events for dragging on the minutes clock
     * minutesDrag must contain start, move and stop functions within it
     *
     * @private
     * @method minutesDrag
     * @param minute {string} minute thats being dragged
     * @event minutesDrag
     */
    minutesDrag: function(minute)
    {
        let _this = this;
        let strings = TimePicker.minuteStrings(minute);

        let clock = new Snap('#clock-minutes-svg');
        let curMinute = clock.select('#' + strings.text);

        let currentAngle = null;
        let newMinute = null;

        let center_x = 104.75;
        let center_y = 105;

        /**
         * allows for the minutes group to start being dragged
         */
        let start = function() {
            this.data('origTransform', this.transform().local );
            if(TimePicker.minuteModFive(TimePicker.stringToSlicedInteger(minute)))
            {
                curMinute.remove();
                curMinute.appendTo(clock);
                curMinute.removeClass('interiorWhite');
            }
        };

        /**
         * moves the dial on the minute clock while transforming group
         */
        let move = function(dx,dy,x,y) {

            let center_point = Ember.$('#centerPointMinutes');
            let coordinates = center_point[0].getBoundingClientRect();

            let endX = x - (coordinates.left + 3);
            let endY = -(y - (coordinates.top - 3));

            let startX = endX - dx;
            let startY = endY + dy;

            let slope = (startY/startX);
            let isForward = endY < (slope*endX);

            let angle = TimePicker.angle(endX, endY, startX, startY);

            let last2 = parseInt(minute.slice(-2));

            if (last2 <= 30 || last2 === 0)
            {
                angle = isForward ? angle : -angle;
            }
            else {
                angle = isForward ? -angle : angle;
            }
            this.attr({
                transform: ('r' + angle + ', ' + center_x + ',' + center_y)
            });

            let lastMinute = _this.get('lastMinuteCircle');
            let actualMinute = parseInt(lastMinute.slice(-2));
            currentAngle = actualMinute * 6;

            let anglePositive = angle > 0;
            let over180 = 180 + Math.abs((180 - Math.abs(angle)));
            newMinute = anglePositive ? angle : over180;

        };

        /**
         * checks to see where the dragging stops and makes the closest minute active
         */
        let stop = function() {
            _this.getMinuteByDegree(currentAngle, newMinute);
        };

        if (!Ember.isNone(this.get('lastMinute')))
        {
            let undragPrevious = this.get('lastMinute');
            undragPrevious.undrag();
        }

        if (TimePicker.minuteModFive(minute))
        {
            let curMin = clock.select('#' + strings.text);
            let curLine = clock.select('#' + strings.line);
            let curCircle = clock.select('#' + strings.circle);
            let currentSelect = clock.g(curLine, curCircle, curMin);

            currentSelect.drag(move, start, stop);
            this.set('lastMinute', currentSelect);
        }
        else
        {
            let curLine2 = clock.select('#' + strings.line);
            let curCircle2 = clock.select('#' + strings.circle);
            let currentSelect2 = clock.g(curLine2, curCircle2);

            currentSelect2.drag(move, start, stop);
            this.set('lastMinute', currentSelect2);
        }
    },

    actions: {

        /**
         * sets the clicked hour to active and makes the active hour draggable
         *
         * @param hour {string} hour clicked on clock
         * @event clickHour
         */
        clickHour: function(hour)
        {
            let timestamp = moment(this.get('timestamp'));

            if (TimePicker.timeIsAm(this.get('timestamp')))
            {
                let setHour = timestamp.hour(TimePicker.stringToSlicedInteger(hour));
                this.convertToTimestamp(setHour);
            }
            else
            {
                let setHour2 = timestamp.hour(TimePicker.stringToSlicedInteger(hour) + 12);
                this.convertToTimestamp(setHour2);
            }

            this.removeLastActiveHour(hour);
        },

        /**
         * handles clicking on minutes
         *
         * @param minute {string} minute clicked on clock
         * @event minuteClicked
         */
        minuteClicked: function(minute)
        {
            this.setMinuteToTimestamp(TimePicker.stringToSlicedInteger(minute));
            this.removeLastActiveMinute(TimePicker.formatMinuteStrings(minute));
        },

        /**
         * handles clicking AM, wont allow if it goes under min date
         *
         * @event amClicked
         */
        amClicked: function()
        {
            let time = moment(this.get('timestamp'));
            let newTime = time.subtract(12, 'hours');

            if (!TimePicker.timeIsAm(this.get('timestamp')))
            {
                if (!Ember.isNone(this.get('minDate')))
                {
                    if (!time.isBefore(this.get('minDate')))
                    {
                        this.convertToTimestamp(newTime);
                    }
                }
                else
                {
                    this.convertToTimestamp(newTime);
                }
            }
        },

        /**
         * handles clicking PM, wont allow if it goes over max date
         *
         * @event pmClicked
         */
        pmClicked: function()
        {
            let time = moment(this.get('timestamp'));
            let newTime = time.add(12, 'hours');

            if (TimePicker.timeIsAm(this.get('timestamp')))
            {
                if (!Ember.isNone(this.get('maxDate')))
                {
                    if (!time.isAfter(this.get('maxDate')))
                    {
                        this.convertToTimestamp(newTime);
                    }
                }
                else
                {
                    this.convertToTimestamp(newTime);
                }
            }
        },

        /**
         * handles clicking the hour in the header
         *
         * @event hourHeaderClicked
         */
        hourHeaderClicked: function()
        {
            Ember.$('#clocks-hour-svg').removeClass('inactive');
            Ember.$('#clocks-hour-svg').addClass('active');

            Ember.$('#clock-minutes-svg').removeClass('active');
            Ember.$('#clock-minutes-svg').addClass('inactive');

            Ember.$('.outside-hours-container-bottom').attr('style', 'pointer-events: none');
            Ember.$('.outside-hours-container').attr('style', 'pointer-events: all');

            Ember.$('.hours-header').removeClass('inactive');
            Ember.$('.hours-header').addClass('active');

            Ember.$('.minutes-header').removeClass('active');
            Ember.$('.minutes-header').addClass('inactive');

            this.removeInitialHours();
            this.removeLastActiveHour(TimePicker.currentHour(this.get('timestamp')));
        },

        /**
         * handles clicking the minute in the header
         *
         * @event minuteHeaderClicked
         */
        minuteHeaderClicked: function()
        {
            Ember.$('#clocks-hour-svg').removeClass('active');
            Ember.$('#clocks-hour-svg').addClass('inactive');

            Ember.$('#clock-minutes-svg').removeClass('inactive');
            Ember.$('#clock-minutes-svg').addClass('active');

            Ember.$('.outside-hours-container').attr('style', 'pointer-events: none');
            Ember.$('.outside-hours-container-bottom').attr('style', 'pointer-events: all');

            Ember.$('.hours-header').addClass('inactive');
            Ember.$('.hours-header').removeClass('active');

            Ember.$('.minutes-header').addClass('active');
            Ember.$('.minutes-header').removeClass('inactive');

            this.removeInitialMinutes();
            this.removeLastActiveMinute(TimePicker.currentMinute(this.get('timestamp')));
        }
    }
});
