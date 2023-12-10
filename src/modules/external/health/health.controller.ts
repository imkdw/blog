import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export default class HealthController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  /**
   * 헬스체크를 위한 기본 컨트롤러
   * [GET] /health
   */
  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([]);
  }
}
