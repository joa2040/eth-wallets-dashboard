import { Body, Controller, Get, Request } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/hello")
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get("/bye")
  getBye(@Body() body, @Request() req): Promise<string> {
    console.log('test', body, req.res.req.apiGateway.event.requestContext?.authorizer?.authInfo);
    return this.appService.getBye();
  }
}
