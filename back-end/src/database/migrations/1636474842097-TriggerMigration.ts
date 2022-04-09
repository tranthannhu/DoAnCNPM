import {MigrationInterface, QueryRunner} from "typeorm";
import * as fs from 'fs';
import * as path from 'path'

export class TriggerMigration1636474842097 implements MigrationInterface {
    name = 'TriggerMigration1636474842097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        let dirCont = fs.readdirSync(path.join(__dirname, "../data"));
        let files = dirCont.filter( function( elm ) {return elm.match(/.*\.(sql)/ig);});
        
        for(let file of files) {
             var queries = fs.readFileSync( path.join(__dirname, `../data/${file}`)).toString()
            queryRunner.query(queries);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //Drop trigger here
    }
}
