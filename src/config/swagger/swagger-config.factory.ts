import { DocumentBuilder } from "@nestjs/swagger";

export const createSwaggerConfig = () => {
    return new DocumentBuilder()
    .setTitle('Twitter API')
    .setDescription('API for my twitter app')
    .setVersion('1.0')
    .addTag('twitter')
    .build();
}