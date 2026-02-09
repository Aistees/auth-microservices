import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Default to localhost if env vars are not set
  const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
  const CINEMA_SERVICE_URL = process.env.CINEMA_SERVICE_URL || 'http://localhost:3002';
  const FILM_SERVICE_URL = process.env.FILM_SERVICE_URL || 'http://localhost:3003';
  const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || 'http://localhost:3004';

  // Proxy configuration
  const services = [
    { route: '/auth', target: AUTH_SERVICE_URL },
    { route: '/cinemas', target: CINEMA_SERVICE_URL },
    { route: '/films', target: FILM_SERVICE_URL },
    { route: '/bookings', target: BOOKING_SERVICE_URL },
  ];

  services.forEach(({ route, target }) => {
    app.use(
      route,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
          [`^${route}`]: '',
        },
      }),
    );
  });

  await app.listen(3000);
  console.log('API Gateway running on port 3000');
  console.log(`Proxying /auth -> ${AUTH_SERVICE_URL}`);
  console.log(`Proxying /cinemas -> ${CINEMA_SERVICE_URL}`);
  console.log(`Proxying /films -> ${FILM_SERVICE_URL}`);
  console.log(`Proxying /bookings -> ${BOOKING_SERVICE_URL}`);
}
bootstrap();
