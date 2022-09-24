require('dotenv').config();

import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';

// --------------------------------------------------------

async function main() {
	const dataSource = new DataSource({
		type: 'postgres',
		database: 'reddit',
		username: process.env.DB_USERNAME_DEV,
		password: process.env.DB_PASSWORD_DEV,
		logging: true,
		synchronize: true,
	});

	await dataSource.initialize();

	const app = express();

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
}

main().catch((error) => console.log(error));
