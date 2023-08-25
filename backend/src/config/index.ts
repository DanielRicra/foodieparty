import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export const setUpSwagger = (app: INestApplication): void => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('FoodieParty')
    .setDescription(
      'Whip up a social network for foodies! Users can share their favorite recipes, cooking tips, and food photos. You could even throw in a meal planner and shopping list generator. ',
    )
    .setVersion('1.0')
    .addTag('foodies')
    .addBearerAuth()
    .build();
  const swaggerOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerOptions,
  );
  SwaggerModule.setup('api', app, document);
};
