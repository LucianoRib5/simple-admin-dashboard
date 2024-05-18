import app from "./controllers/app";

import { employeeRouter } from "../src/controllers/routes/employeeRoutes"

app.use('/api', employeeRouter);