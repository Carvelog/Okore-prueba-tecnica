import express, { Application } from 'express'
import { getPolicies, getPolicyById } from './controllers/policies.js'

const app: Application = express()
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())

app.get('/api/policies', getPolicies)
app.get('/api/policy/:id', getPolicyById)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
