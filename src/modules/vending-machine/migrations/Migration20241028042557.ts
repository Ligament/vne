import { Migration } from '@mikro-orm/migrations';

export class Migration20241028042557 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "vending_machine" ("id" text not null, "name" text not null, "location" text not null, "status" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vending_machine_pkey" primary key ("id"));');

    this.addSql('create table if not exists "vending_machine_order" ("id" text not null, "status" text check ("status" in (\'pending\', \'fulfilled\', \'cancelled\', \'done\')) not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vending_machine_order_pkey" primary key ("id"));');

    this.addSql('create table if not exists "vending_machine_slot" ("id" text not null, "slotNumber" integer not null, "state" text check ("state" in (\'empty\', \'occupied\', \'reserved\')) not null, "vending_machine_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "vending_machine_slot_pkey" primary key ("id"));');
    this.addSql('CREATE INDEX IF NOT EXISTS "IDX_vending_machine_slot_vending_machine_id" ON "vending_machine_slot" (vending_machine_id) WHERE deleted_at IS NULL;');

    this.addSql('create table if not exists "vendingmachine_vendingmachineorders" ("vending_machine_id" text not null, "vending_machine_order_id" text not null, constraint "vendingmachine_vendingmachineorders_pkey" primary key ("vending_machine_id", "vending_machine_order_id"));');

    this.addSql('alter table if exists "vending_machine_slot" add constraint "vending_machine_slot_vending_machine_id_foreign" foreign key ("vending_machine_id") references "vending_machine" ("id") on update cascade on delete cascade;');

    this.addSql('alter table if exists "vendingmachine_vendingmachineorders" add constraint "vendingmachine_vendingmachineorders_vending_machine_id_foreign" foreign key ("vending_machine_id") references "vending_machine" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "vendingmachine_vendingmachineorders" add constraint "vendingmachine_vendingmachineorders_vending_machi_26f1b_foreign" foreign key ("vending_machine_order_id") references "vending_machine_order" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "vending_machine_slot" drop constraint if exists "vending_machine_slot_vending_machine_id_foreign";');

    this.addSql('alter table if exists "vendingmachine_vendingmachineorders" drop constraint if exists "vendingmachine_vendingmachineorders_vending_machine_id_foreign";');

    this.addSql('alter table if exists "vendingmachine_vendingmachineorders" drop constraint if exists "vendingmachine_vendingmachineorders_vending_machi_26f1b_foreign";');

    this.addSql('drop table if exists "vending_machine" cascade;');

    this.addSql('drop table if exists "vending_machine_order" cascade;');

    this.addSql('drop table if exists "vending_machine_slot" cascade;');

    this.addSql('drop table if exists "vendingmachine_vendingmachineorders" cascade;');
  }

}
