import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class Country {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  code?: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ nullable: true })
  emoji?: string;
}

@InputType()
export class CountryInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  code?: string;

  @Field({ nullable: true })
  emoji?: string;
}

export default Country;
