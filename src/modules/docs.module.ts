import {INestApplication, Module} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

@Module({})
export class DocsModule {
    static async forRoot(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle(process.env.APP_TITLE)
            .setDescription(process.env.APP_DESCRIPTION)
            .build();

        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup('docs', app, document);
    }
}