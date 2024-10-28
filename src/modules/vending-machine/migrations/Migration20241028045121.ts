import { Migration } from '@mikro-orm/migrations';

export class Migration20241028045121 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "vending_machine" alter column "status" type text using ("status"::text);');
    this.addSql('alter table if exists "vending_machine" add constraint "vending_machine_status_check" check ("status" in (\'active\', \'inactive\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "vending_machine" drop constraint if exists "vending_machine_status_check";');

    this.addSql('alter table if exists "vending_machine" alter column "status" type text using ("status"::text);');
  }

}
