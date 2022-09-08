# Stripe Payment using Node.js

instead of directly communicating frontend app(react or js app) to Stripe(which is insecure), we take a middle step connecting to backend(node-express app), which further communicates with stripe.

> Thus from a frontend, we can send the request, which first goes to backend, and then backend sends it to stripe, and upon recieving the response from stripe, backend sends it back to the frontend app.