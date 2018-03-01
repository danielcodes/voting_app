
import React from 'react';

import { Label, List } from 'semantic-ui-react';


class DoughnutLegend extends React.Component {
	render() {
		const { segments } = this.props.chart;

		return (
			<List>
				{segments.map((segment, index) =>
					<List.Item key={index}>
						<Label
							style={{backgroundColor:segment.fillColor}}
							horizontal>{segment.value}
						</Label>
						{segment.label}
					</List.Item>
				)}
			</List>
		);
	}
}

export { DoughnutLegend };
