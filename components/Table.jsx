var React = require('react');
var cx = require('classnames');
var _ = require('lodash');

/**
	Table
		http://www.getmdl.io/components/index.html#tables-section
	Props
		selectable 		設成true才會顯示選取框
		headers, array isRequired, 標題列
		headers[].title, string, 標題
		headers[].key, string isRequired, 資料key名(無 title 時取代 title 顯示)
		headers[].style, object, 樣式
		items, array isRequired, 表格內容
		items[]		存在多個 key 和 value, headers 也有的 key 才會顯示
		itemStyles, array, 列樣式
		shadow 		陰影的大小(只能填 2, 3, 4, 6, 8, 16)
	Methods
		getSelected 	取得勾選的資料值
*/

module.exports = React.createClass({

	getDefaultProps: function() {
		return {
			shadow : 2,
		};
	},

	propTypes: {
		headers : React.PropTypes.array.isRequired,
		items : React.PropTypes.array.isRequired,
		itemStyles : React.PropTypes.array,
		selectable : React.PropTypes.bool,
		shadow : React.PropTypes.number,
	},

	componentDidMount: function() {
		componentHandler.upgradeDom();
	},

	componentDidUpdate: function(prevProps, prevState) {
		componentHandler.upgradeDom();
	},

	componentWillUpdate: function(nextProps, nextState) {
		this.refs.table.getDOMNode().removeAttribute('data-upgraded');
	},

	_checkProps : function() {

		var self = this;

		// 檢查 headers
		this.props.headers.forEach(function(header) {
			if(!header.key) {
				console.warn(
					'MDL.Table: every object in `headers` must have key'
				);
			}
		});

		// 檢查 headers 和 itemStyles 的長度是否一致
		if(
			this.props.itemStyles instanceof Array &&
			this.props.headers.length != this.props.itemStyles.length
		) {
			console.warn(
				'MDL.Table: the length of `itemStyles` should be equal to the length of `headers`'
			);
		}

		// 檢查 shadow 值是否不超過 8
		if(this.props.shadow != 2 &&
			this.props.shadow != 3 &&
			this.props.shadow != 4 &&
			this.props.shadow != 6 &&
			this.props.shadow != 8 &&
			this.props.shadow != 16) {
			console.warn(
				'MDL.Table: invalid `shadow` value'
			);
		}

	},

	getSelected: function() {

		var result = [];
		var self = this;

		if(this.props.selectable) {
			_.forEach(this.refs.tbody.getDOMNode().childNodes, function(element, index) {
				if(element.className == 'is-selected') {
					result.push(self.props.items[index]);
				}
			});
		}

		return result;

	},

	render: function() {

		var classes = {
			table : {
				'mdl-data-table' : true,
				'mdl-js-data-table' : true,
			},
		};
		var self = this;

		this._checkProps();

		classes.table['mdl-shadow--' + this.props.shadow + 'dp'] = true;

		if(this.props.selectable) {
			classes.table['mdl-data-table--selectable'] = true;
		}

		var headers = this.props.headers.map(function(element, index) {
			if(typeof element.title == 'string') {
				return (
					<th key={index} style={element.style} data-key={element.key}>{element.title}</th>
				);
			} else {
				return (
					<th key={index} style={element.style} data-key={element.key}>{element.key}</th>
				);
			}
		});

		var date = Date.now();
		var items = this.props.items.map(function(element, index) {

			var row = self.props.headers.map(function(headerElement, index) {
				if(self.props.itemStyles instanceof Array) {
					return (
						<td style={self.props.itemStyles[index]} key={index}>
							{element[headerElement.key]}
						</td>
					);
				}
				else {
					return (
						<td key={index}>{element[headerElement.key]}</td>
					);
				}
			});
			var theKey = date + '-' + index;
			return (
				<tr key={theKey}>{row}</tr>
			);

		});

		return (
			<table ref="table" className={cx(classes.table)}>
				<thead>
					<tr key={date}>
						{headers}
					</tr>
				</thead>
				<tbody ref="tbody">
					{items}
				</tbody>
			</table>
		);

	}

});
