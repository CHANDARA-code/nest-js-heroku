import { Logger, QueryRunner } from 'typeorm';

export class AppDBLogger implements Logger {
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log('START🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logQuery🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐START');
    console.log('🐙🐙🐙query🐙🐙🐙\n', query);
    console.log('🐙🐙🐙parameters🐙🐙🐙\n', parameters);
    console.log('🐙🐙🐙queryRunner🐙🐙🐙\n', queryRunner);
    console.log('END🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logQuery🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐END');
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log('START🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logQueryError🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐START');
    console.log('🐙🐙🐙error🐙🐙🐙\n', error);
    console.log('🐙🐙🐙query🐙🐙🐙\n', query);
    console.log('🐙🐙🐙parameters🐙🐙🐙\n', parameters);
    console.log('🐙🐙🐙queryRunner🐙🐙🐙\n', queryRunner);
    console.log('END🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logQueryError🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐END');
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    console.log('START🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logQuerySlow🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐START');
    console.log(`Slow Query: ${time}ms`);
    console.log('🐙🐙🐙query🐙🐙🐙\n', query);
    console.log('🐙🐙🐙parameters🐙🐙🐙\n', parameters);
    console.log('🐙🐙🐙queryRunner🐙🐙🐙\n', queryRunner);
    console.log('END🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logQuerySlow🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐END');
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    console.log('START🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logSchemaBuild🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐START');
    console.log('🐙🐙🐙message🐙🐙🐙\n', message);
    console.log('🐙🐙🐙queryRunner🐙🐙🐙\n', queryRunner);
    console.log('END🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logSchemaBuild🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐END');
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    console.log('START🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logMigration🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐START');
    console.log('🐙🐙🐙message🐙🐙🐙\n', message);
    console.log('🐙🐙🐙queryRunner🐙🐙🐙\n', queryRunner);
    console.log('END🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐logMigration🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐END');
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    if (level == 'info') {
      console.log('START🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐LOG🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐START');
      console.log('🐙🐙🐙message🐙🐙🐙\n', message);
      console.log('🐙🐙🐙queryRunner🐙🐙🐙\n', queryRunner);
      console.log('END🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐LOG🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐END');
    } else if (level == 'warn') {
      console.log('START🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐LOG🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐START');
      console.log('🐙🐙🐙message🐙🐙🐙\n', message);
      console.log('🐙🐙🐙queryRunner🐙🐙🐙\n', queryRunner);
      console.log('END🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐LOG🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐END');
    } else {
      console.log('START🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐LOG🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐START');
      console.log('🐙🐙🐙message🐙🐙🐙\n', message);
      console.log('🐙🐙🐙queryRunner🐙🐙🐙\n', queryRunner);
      console.log('END🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐LOG🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐🦐END');
    }
  }
}
