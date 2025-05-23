const PROJECT_NAME = `StudioFlow`

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))



// Import Express
import express from 'express'
import 'dotenv/config'
import colors from 'colors'

// Setup Express
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))



// Connect to database
import connectDB from './config/db.js'
const PORT = process.env.PORT || 5026
connectDB()



// Automated Backup
import {automatedRollback, backupCollections} from './helpers/automatedBackup.js'



// Routes
import userRoutes from './routes/userRoutes.js'
app.use('/api/users', userRoutes)
import projectRoutes from './routes/projectRoutes.js'
app.use('/api/projects', projectRoutes)




// Serve frontend
if (process.env.NODE_ENV === 'production') {

	app.use(express.static(path.join(__dirname, '../frontend/build')))

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))

} else {
	app.get('/', (req, res) => res.send('Welcome to the StudioFlow API. Please set to production.'))
}



// Error Handling
import { errorHandler } from './middleware/errorMiddleware.js'
app.use(errorHandler)



app.listen(PORT, () => {
	console.log(`${PROJECT_NAME} server started on port ${PORT}`.magenta)

	// run automated rollback every 24 hours
	automatedRollback()

	// create backup of collection
	// backupCollections()
})