'use strict'

const util = require('util')
const chalk = require('chalk')

function normalize (_, ...subs) {
	return subs.filter(s => s).join(' ')
}

const defaultLevels = {
	debug: {level: 0, style: chalk.cyan},
	info: {level: 1, style: chalk.blue},
	success: {level: 2, style: chalk.green},
	warn: {level: 3, text: 'warning', style: chalk.yellow},
	error: {level: 4, style: chalk.red}
}

/**
 * The main logger class.
 */
class Logger {
	/**
	 * Create a new logger with given options.
	 * @param {string} [label] - A label to print with each log line.
	 * @param {object} [options = {}] - An object of options for the logger.
	 * @param {boolean} [options.timestamp = false] - Whether or not log output
	 * should contain a timestamp.
	 * @param {number} [options.minLevel = 1] - The minimum log level to be
	 * displayed.
	 * @param {number} [options.maxLevel = Infinity] - The maximum log level to be
	 * displayed.
	 * @param {object} [options.levels = {}] - An object of levels to use in
	 * addition to the default ones.
	 * @param {string} [options.label] - Same as the `label` argument. If both are
	 * defined, this one takes precedence.
	 */
	constructor (_label, config = {}) {
		// new Logger('yes', {}) = new Logger({label: 'yes'})
		if (typeof _label !== 'string') {
			config = _label || {}
			_label = undefined
		}
		const {
			timestamp = false,
			minLevel = 1,
			maxLevel = Infinity,
			levels = {},
			label = _label,
			labelStyle = chalk.gray.bold
		} = config

		/**
		 * @prop {object} timestamp Whether or not log output should comtain a timestamp.
		 */
		this.timestamp = timestamp

		/**
		 * @prop {integer} minLevel The minimum log level to be displayed.
		 */
		this.minLevel = minLevel

		/**
		 * @prop {integer} maxLevel The maximum log level to be displayed.
		 */
		this.maxLevel = maxLevel

		/**
		 * @prop {object} levels All levels in use in this logger.
		 */
		this.levels = Object.assign(levels, defaultLevels)

		/**
		 * @prop {string} label A label to print with each log line.
		 */
		// In order to avoid generating formattedLabel twice, we set the private
		// version (_label) here. The generation happens when labelStyle is set.
		this._label = label

		/**
		 * @prop {function} labelStyle A style function to add to the label.
		 */
		this.labelStyle = labelStyle

		// Dynamically create functions for each of the levels.
		Object.keys(this.levels).forEach(name => {
			if (this[name]) throw new TypeError('Invalid level name', name)
			this[name] = function (...contents) {
				this._log(name, ...contents)
			}
		})
	}

	// formattedLabel is auto-generated whenever one of these properties updates
	set label (label) {
		this._label = label
		this._formattedLabel = this.labelStyle(this.label || '')
	}
	get label () {
		return this._label
	}
	set labelStyle (labelStyle) {
		this._labelStyle = labelStyle
		this._formattedLabel = this.labelStyle(this.label || '')
	}
	get labelStyle () {
		return this._labelStyle
	}

	/**
	 * @prop {string} formattedLabel The result of applying this.labelStyle to this.label. Cached for efficiency.
	 */
	get formattedLabel () {
		return this._formattedLabel
	}

	_getTimestamp () {
		return chalk.gray(new Date().toISOString().replace(/.*T|\..*/g, ''))
	}

	/**
	 * Execute a log with a given name.
	 * @param {name} name - The name of the logger to execute.
	 * @param {...*} contents - The contents of the log.
	 */
	_log (name, ...contents) {
		let {text, style, level} = this.levels[name]
		if (level < this.minLevel || level > this.maxLevel) return
		name = text || name
		style = style || (s => s)
		const timestamp = this.timestamp ? this._getTimestamp() : ''
		name = style(name)
		console.log(normalize`${timestamp} ${this.formattedLabel} ${name} ${util.format(...contents)}`)
	}
}

module.exports = Logger
module.exports.defaultLevels = defaultLevels
