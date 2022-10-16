import {NestFactory} from '@nestjs/core';
import {AppModule} from './modules/app.module';
import {DocsModule} from "./modules/docs.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await DocsModule.forRoot(app);

    await app.listen(process.env.APP_PORT);

}

bootstrap();
