import React from 'react';

import { Grid, Header, List, Segment } from 'semantic-ui-react'


class AboutPage extends React.Component {
	render() {
		return (
			<Grid stackable>
				<Grid.Row centered colums={4}>
					<Header as='h1' color='teal'>
						About Pollster
					</Header>
				</Grid.Row>

				<Grid.Row centered columns={2}>
					<Grid.Column>
						<Segment>
							<Header as='h4' color='teal'>
								Pollster is one of Free Code Camp's Projects (Voting App)
							</Header>

							Features of the application are:
							<List bulleted>
								<List.Item>You can view Polls and vote on them</List.Item>
								<List.Item>Results of the Polls are aggregated and shown in a doughnut chart</List.Item>
								<List.Item>Authenticating opens up a few other features, ie. creating Polls and adding options to Polls</List.Item>
							</List>
						</Segment>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export { AboutPage };
