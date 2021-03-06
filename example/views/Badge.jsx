
"use strict";

var React = require('react');
var MDL = require('../../components/');
var Props = require('../document/Props.jsx');
var DocTitle = require('../document/DocTitle.jsx');
var DocSubtitle = require('../document/DocSubtitle.jsx');

module.exports = React.createClass({

	render : function() {

		var style = {
			width : '100%',
			maxWidth : '1200px',
		};

		var demoStyle = {
			borderRadius: '0 0 2px 0',
			padding: '24px',
			margin: '0px',
		};

		var badgeStyle = {
			margin: '10px 30px 10px 30px',
			verticalAlign: 'middle',
		};

		var cardStyle = {
			width : '100%',
			margin : '0px',
		};

		var buttonStyle = {
			width : '100px',
			margin : '0px 10px',
		};

		var buttonAreaStyle = {
			width : '240px',
			margin : '24px auto',
			marginTop : '0px',
		};

		var prismCode = {
			fontSize : '14px',
			marginBottom : '0px',
		};

		var propsDetail = [
			{
				key : 'badge',
				type : 'node',
				state : 'required',
				content : 'The legal char for badge element',
			},
			{
				key : 'materialDesignIcon',
				type : 'boolen',
				state : 'default: false',
				content : 'If it is true, the badge will not show material design icon',
			},
			{
				key : 'noBackground',
				type : 'bool',
				state : 'default: false',
				content : 'If it is true, the badge will not interact background',
			},
			{
				key : 'style',
				type : 'object',
				state : 'optional',
				content : 'Override the inline-styles of the badge\'s root element',
			},
		];

		return (
			<div style={style}>
				<DocTitle title="Badge" />
				<MDL.Card style={cardStyle} shadow={3}>
					<div style={demoStyle}>
						<DocSubtitle title="example" />
						<MDL.Badge
							style={badgeStyle}
						>
							<div>yourText</div>
						</MDL.Badge>
						<MDL.Badge
							badge = {10}
							noBackground = {true}
							style={badgeStyle}
						>
							<div>
								mail
							</div>
						</MDL.Badge>
						<MDL.Badge
							badge = {10}
							noBackground = {true}
							materialDesignIcon = {true}
							style={badgeStyle}
						>
							<div>
								mail
							</div>
						</MDL.Badge>
						<MDL.Badge
							badge = '♥'
							materialDesignIcon = {true}
							style={badgeStyle}
						>
							<div>
								face
							</div>
						</MDL.Badge>
					</div>
					<MDL.PrismCode
						src='http://fandora.github.io/mdl-react/example/codes/BadgeInfo.js'
						style={prismCode}
					/>
				</MDL.Card>
				<Props detail={propsDetail} title="Props" />
			</div>
		);
	},

});
