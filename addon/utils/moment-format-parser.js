/**
 * @module utils
 *
 */
import Ember from 'ember';

/***/
const kFormat = {
	M: 'month', MM: 'month',																			// standard month format
	Mo: 'month',																									// month format (1st, 2nd, 3rd)
	MMM: 'month', MMMM: 'month',																	// month format word
	D: 'day', DD: 'day',																					// standard day format
	Do: 'day',																										// day format (1st, 2nd, 3rd)
	Y: 'year', YY: 'year', YYYY: 'year',													// standard year format
	A: 'meridian', a: 'meridian',																	// am pm format
 	h: 'hour', hh: 'hour',																				// standard 12 hour format
	m: 'minute', mm: 'minute',																		// standard minutes
	LT: 'hour',																										// time will default to open hours first.
	L: 'day',	l: 'day', LL: 'day', ll: 'day',											// month, day, year will default to day
	LLL: 'day', lll: 'day', LLLL: 'day', llll: 'day',							// month day year time will default to day
	LTS: null,																										// time with seconds not supported
	Q: null, Qo: null,																						// quarter not supported
	H: null, HH: null,																						// 24 hour format not supported
	k: null, kk: null,																						// 24 hour format not supported
	DDD: null, DDDo: null, DDDD: null,														// day of year not supported
	d: null, do: null, dd: null, ddd: null, dddd: null,						// day of week not supported
	e: null, E: null,																							// day of week (iso) not supported
	w: null, wo: null, ww: null,																	// week of year not supported
	W: null, Wo: null, WW: null,																	// week of year (iso) not supported
	gg: null, gggg: null, GG: null, GGGG: null,										// week year not supported
	s: null, ss: null,																						// seconds not supported
	S: null, SS: null, SSS: null, SSSS: null,											// fractional seconds not supported
	z: null, zz: null, Z: null, ZZ: null,													// time zone identifier not supported
	X: null, x: null																							// unix time not supported
};

const momentFormatParser = Ember.Object.extend();

/**
 *
 */
momentFormatParser.reopenClass({
	getFormatType(key) {
		return kFormat[key];
	}
});

export default momentFormatParser;
