import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Toujours utile pour le Frontend

  // --- CONFIGURATION DES URLS CIBLES ---
  const AUTH_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';
  const CINEMA_URL = process.env.CINEMA_SERVICE_URL || 'http://localhost:3002';
  const FILM_URL = process.env.FILM_SERVICE_URL || 'http://localhost:3003';
  const BOOKING_URL = process.env.BOOKING_SERVICE_URL || 'http://localhost:3004';

  // --- CONFIGURATION DU ROUTAGE (PROXY) ---
  const services = [
    { route: '/auth', target: AUTH_URL },
    { route: '/cinemas', target: CINEMA_URL },
    { route: '/films', target: FILM_URL },
    { route: '/bookings', target: BOOKING_URL },
  ];

  services.forEach(({ route, target }) => {
    app.use(
      route,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
          [`^${route}`]: '', // On enlève le préfixe (/auth -> /)
        },
      }),
    );
  });

  // On écoute sur le port 3000
  await app.listen(3000);
  console.log(`🚀 API Gateway active sur: http://localhost:3000`);
  console.log(`🔀 Les routes sont redirigées vers 3001, 3002, 3003, 3004`);
}
bootstrap();