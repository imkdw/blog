import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export default class HealthController {
  constructor(
    private readonly http: HttpHealthIndicator,
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const serverPingCheck = () => this.http.pingCheck('BLOG SERVER', 'http://localhost:3000');
    const memoryCheck = () => this.memory.checkHeap('memory_heap', 1024 * 1024 * 1024);
    return this.health.check([serverPingCheck, memoryCheck]);
  }
}
