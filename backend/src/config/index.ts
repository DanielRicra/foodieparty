import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('FoodieParty')
  .setDescription(
    'Whip up a social network for foodies! Users can share their favorite recipes, cooking tips, and food photos. You could even throw in a meal planner and shopping list generator. ',
  )
  .setVersion('1.0')
  .addTag('foodies')
  .build();
export const swaggerOptions: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};
