require('dotenv').config();

import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import entities from './entities';
import resolvers from './resolvers';

// --------------------------------------------------------

async function main() {
	const dataSource = new DataSource({
		type: 'postgres',
		database: 'reddit',
		username: process.env.DB_USERNAME_DEV,
		password: process.env.DB_PASSWORD_DEV,
		logging: true,
		synchronize: true,
		entities: entities,
	});

	await dataSource.initialize();

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: resolvers,
			validate: false,
		}),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

main().catch((error) => console.log(error));
